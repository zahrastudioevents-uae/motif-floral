/**
 * Shared bits for the three form endpoints.
 *
 * These run as Vercel functions on the same domain as the site, so the browser
 * posts to /api/... with no cross-origin request and no second host to keep
 * alive. They replace the FastAPI app in ../backend, which was never deployed:
 * every submission was hitting the static site and coming back 405.
 */

const FIELD_LABELS = {
  full_name: 'Name',
  fiance_name: 'Partner',
  email: 'Email',
  phone: 'Phone',
  country: 'Country',
  where_from: 'Where they are from',
  instagram: 'Instagram',
  how_found_us: 'How they found us',
  how_found_us_detail: 'How they found us, detail',
  how_did_you_hear: 'How they found us',
  how_did_you_hear_detail: 'How they found us, detail',
  event_date: 'Date',
  guest_count: 'Guests',
  elopement_guest_type: 'Guests',
  elopement_guest_count: 'Guests, number',
  service_needed: 'Service',
  services_interested: 'Services',
  floral_pieces: 'Floral pieces',
  multi_day_detail: 'Multi-day detail',
  event_location: 'Location',
  event_location_detail: 'Location detail',
  location_name: 'Venue',
  region: 'Region',
  region_detail: 'Region detail',
  ceremony_location: 'Ceremony and reception',
  preferred_moment: 'Preferred moment',
  pinterest_link: 'Pinterest',
  style_elements: 'Style elements',
  dream_photographer: 'Photographer',
  budget: 'Budget',
  investment: 'Budget',
  vision: 'Vision',
  message: 'Message',
  has_planner: 'Has a planner',
  planner_name: 'Planner',
  wants_planning: 'Wants planning help',
}

/** Order the email by what you read first when a lead arrives. */
const ORDER = [
  'full_name', 'fiance_name', 'email', 'phone', 'country', 'where_from', 'instagram',
  'event_date', 'guest_count', 'elopement_guest_type', 'elopement_guest_count',
  'region', 'region_detail', 'event_location', 'event_location_detail', 'location_name',
  'ceremony_location', 'preferred_moment',
  'floral_pieces', 'services_interested', 'multi_day_detail', 'service_needed',
  'budget', 'investment',
  'has_planner', 'planner_name', 'wants_planning',
  'pinterest_link', 'style_elements', 'dream_photographer', 'vision', 'message',
  'how_found_us', 'how_found_us_detail', 'how_did_you_hear', 'how_did_you_hear_detail',
]

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function rows(data) {
  const keys = [...ORDER.filter((k) => k in data), ...Object.keys(data).filter((k) => !ORDER.includes(k))]
  const cells = []
  for (const k of keys) {
    if (k === 'surname' || k === 'privacy_accepted' || k === 'form_type') continue
    let v = data[k]
    if (v === null || v === undefined || v === '' || (Array.isArray(v) && !v.length)) continue
    if (Array.isArray(v)) v = v.join(', ')
    if (typeof v === 'boolean') v = v ? 'yes' : 'no'
    cells.push(
      `<tr><td style="padding:6px 14px 6px 0;vertical-align:top;color:#666;white-space:nowrap">${escape(
        FIELD_LABELS[k] || k,
      )}</td><td style="padding:6px 0;vertical-align:top;color:#111">${escape(v)}</td></tr>`,
    )
  }
  return `<table style="border-collapse:collapse;font:14px/1.6 -apple-system,Segoe UI,sans-serif">${cells.join('')}</table>`
}

export function buildEmail(heading, data) {
  return `<div style="font:14px/1.6 -apple-system,Segoe UI,sans-serif">
    <p style="margin:0 0 4px;letter-spacing:.12em;text-transform:uppercase;font-size:11px;color:#999">Motif Floral</p>
    <h2 style="margin:0 0 12px;font-weight:normal;letter-spacing:.04em;text-transform:uppercase;font-size:15px;color:#111">${escape(heading)}</h2>
    ${rows(data)}
    <p style="margin:20px 0 0;font-size:12px;color:#999">Sent from the form on <a href="https://motifloral.com" style="color:#999">motifloral.com</a></p>
  </div>`
}

export async function sendEmail({ subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.FROM_EMAIL
  const to = process.env.RECIPIENT_EMAIL
  if (!key || !from || !to) {
    const missing = [!key && 'RESEND_API_KEY', !from && 'FROM_EMAIL', !to && 'RECIPIENT_EMAIL']
      .filter(Boolean)
      .join(', ')
    throw Object.assign(new Error(`Email not configured: ${missing}`), { status: 503 })
  }
  // RECIPIENT_EMAIL takes a comma-separated list, so an enquiry can land in more
  // than one inbox. Note that the shared onboarding@resend.dev sender refuses the
  // whole request if any recipient is not the Resend account's own address: with
  // that sender the list has to stay a single address.
  const recipients = to.split(',').map((s) => s.trim()).filter(Boolean)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: recipients,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })
  if (!res.ok) {
    throw Object.assign(new Error(`Resend refused the message: ${await res.text()}`), { status: 502 })
  }
}

/**
 * Wraps a handler with the checks every form shares: POST only, a parsed body,
 * the honeypot, the privacy box, and turning thrown errors into a status.
 */
export function formHandler(heading, subjectFor) {
  return async (req, res) => {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ ok: false, error: 'Method not allowed' })
    }
    let body = req.body
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        return res.status(400).json({ ok: false, error: 'Malformed body' })
      }
    }
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ ok: false, error: 'Missing body' })
    }
    // Bots fill the hidden field; answer as if it worked so they stop trying.
    if (body.surname) return res.status(200).json({ ok: true })
    if (!body.privacy_accepted) {
      return res.status(400).json({ ok: false, error: 'Privacy consent is required' })
    }
    if (!body.email || !body.full_name) {
      return res.status(400).json({ ok: false, error: 'Name and email are required' })
    }
    try {
      await sendEmail({
        subject: subjectFor(body),
        html: buildEmail(typeof heading === 'function' ? heading(body) : heading, body),
        replyTo: body.email,
      })
    } catch (err) {
      console.error('form submission failed', err)
      return res.status(err.status || 500).json({ ok: false, error: 'Could not send the message' })
    }
    return res.status(200).json({ ok: true, message: 'Thank you for contacting us.' })
  }
}
