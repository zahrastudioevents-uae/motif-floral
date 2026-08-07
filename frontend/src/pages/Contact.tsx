import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { DateField } from '../components/DateField'
import {
  FieldError,
  FormError,
  FormSection,
  MissingFields,
  PrivacyConsent,
  QField,
} from '../components/FormLayout'
import { PhoneField } from '../components/PhoneField'
import { RestyleHero } from '../components/RestyleHero'
import { Seo } from '../components/Seo'
import { trackEvent } from '../lib/analytics'
import { absolute } from '../lib/site'
import { breadcrumb, graph, webPage } from '../lib/structuredData'
import {
  CONTACT_SERVICE_OPTIONS,
  HOW_FOUND_NEEDING_DETAIL,
  HOW_FOUND_OPTIONS,
  howFoundDetailPlaceholder,
} from '../data/forms'
import { postJson } from '../lib/api'
import {
  getInputBorderClass,
  type MissingField,
  scrollToField,
  validateDate,
  validateEmail,
  validateGuestCount,
  validateName,
  validatePhone,
  validateRequired,
} from '../lib/validation'

const CONTACT_HERO = '/images/contact-hero.webp'

const empty = {
  fullName: '',
  email: '',
  dial: '+971',
  phone: '',
  country: '',
  howFound: '',
  howFoundDetail: '',
  eventDate: '',
  guestCount: '',
  serviceNeeded: '',
  message: '',
  privacy: false,
}

type Fields = typeof empty
type FieldName = keyof Fields

/** One rule per field, so validation and the missing-fields list cannot drift. */
const RULES: { name: FieldName; label: string; check: (f: Fields) => string }[] = [
  { name: 'fullName', label: 'Full name', check: (f) => validateName(f.fullName) },
  { name: 'email', label: 'Email', check: (f) => validateEmail(f.email) },
  { name: 'phone', label: 'Phone number', check: (f) => validatePhone(f.phone) },
  { name: 'country', label: 'Country', check: (f) => validateRequired(f.country) },
  { name: 'howFound', label: 'How did you find us?', check: (f) => validateRequired(f.howFound) },
  { name: 'eventDate', label: 'Event date', check: (f) => validateDate(f.eventDate) },
  { name: 'guestCount', label: 'Guest count', check: (f) => validateGuestCount(f.guestCount) },
  { name: 'serviceNeeded', label: 'Service needed', check: (f) => validateRequired(f.serviceNeeded) },
  { name: 'message', label: 'Tell us more', check: (f) => validateRequired(f.message) },
]

/** What went wrong, said in a way the visitor can act on. */
export const describeSendError = (raw: string): string => {
  const m = raw.toLowerCase()
  if (m.includes('fetch') || m.includes('failed') || m.includes('network')) {
    return 'Unable to connect to the server. Please check your internet connection and try again.'
  }
  if (m.includes('500')) {
    return 'A server error occurred. Our team has been notified. Please try again later.'
  }
  if (m.includes('400') || m.includes('validation')) {
    return 'Some of the data entered is not valid. Please check the fields and try again.'
  }
  return raw || 'Something went wrong.'
}

export function Contact() {
  const [f, setF] = useState<Fields>(empty)
  const [touched, setTouched] = useState<Set<FieldName>>(new Set())
  const [missing, setMissing] = useState<MissingField[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [err, setErr] = useState('')

  const set = (patch: Partial<Fields>) => setF((p) => ({ ...p, ...patch }))
  const touch = (name: FieldName) => setTouched((p) => new Set(p).add(name))
  const isTouched = (name: FieldName) => touched.has(name)
  const errorOf = (name: FieldName) => RULES.find((r) => r.name === name)?.check(f) ?? ''
  const frame = (name: FieldName) => getInputBorderClass(isTouched(name), errorOf(name))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const failed = RULES.filter((r) => r.check(f))
    const needsPrivacy = !f.privacy
    if (failed.length || needsPrivacy) {
      setTouched(new Set(RULES.map((r) => r.name)))
      const list: MissingField[] = failed.map((r) => ({ label: r.label, scrollText: r.label }))
      if (needsPrivacy) list.push({ label: 'Privacy Policy consent', scrollText: 'I authorise' })
      setMissing(list)
      scrollToField(list[0].scrollText)
      return
    }

    setMissing([])
    setStatus('loading')
    setErr('')
    try {
      await postJson<{ ok: boolean }>('/api/contact', {
        full_name: f.fullName,
        email: f.email,
        phone: `${f.dial} ${f.phone}`,
        country: f.country,
        how_found_us: f.howFound,
        how_found_us_detail: f.howFoundDetail,
        event_date: f.eventDate,
        guest_count: f.guestCount,
        service_needed: f.serviceNeeded,
        message: f.message,
        privacy_accepted: f.privacy,
      })
      trackEvent('generate_lead', { form: 'contact', service: f.serviceNeeded })
      setStatus('ok')
      setF(empty)
      setTouched(new Set())
    } catch (er) {
      setStatus('err')
      setErr(describeSendError(er instanceof Error ? er.message : ''))
    }
  }

  return (
    <>
      <Seo
        title="Contact | Motif Floral, Rome"
        description="Talk to Motif Floral about wedding and event florals in Italy and the UAE. Email motifloral@gmail.com or WhatsApp +39 334 569 9447."
        jsonLd={graph(
          webPage('Contact Motif Floral', '/contact/', 'Get in touch about your celebration.'),
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }]),
          { '@type': 'ContactPage', '@id': `${absolute('/contact/')}#contactpage` },
        )}
      />
      <RestyleHero title="Let us begin with your atmosphere." image={CONTACT_HERO} />
      <section className="bg-mf-sand px-[4vw] py-20 md:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="pl-[0.5em] text-center font-sans text-[0.95rem] font-extralight uppercase tracking-[0.5em] text-mf-black">
            Contact us
          </p>
          <p className="mb-14 mt-6 text-center font-sans text-[1rem] leading-[1.9] text-mf-black/75 md:mb-16">
            <span className="block">
              Reach us at{' '}
              <a
                href="mailto:motifloral@gmail.com"
                className="text-mf-black underline decoration-mf-black/40 underline-offset-2 hover:decoration-mf-black"
                onClick={() => trackEvent('email_click', { source: 'contact_page' })}
              >
                motifloral@gmail.com
              </a>{' '}
              or on WhatsApp{' '}
              <a
                href="https://wa.me/393345699447"
                className="text-mf-black underline decoration-mf-black/40 underline-offset-2 hover:decoration-mf-black"
                onClick={() => trackEvent('whatsapp_click', { source: 'contact_page' })}
              >
                +39 3345699447
              </a>
              .
            </span>
          </p>
          {status === 'ok' ? (
            <p className="text-center font-sans text-[1.05rem] text-mf-black/80">
              Thank you for contacting us. We will come back to you shortly.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <input type="text" name="surname" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />

              <FormSection large>
                <div className="grid gap-x-10 md:grid-cols-2">
                  <QField label="Full name" required large>
                    <input
                      placeholder="Min. 2 characters, max. 100"
                      value={f.fullName}
                      onChange={(e) => set({ fullName: e.target.value })}
                      onBlur={() => touch('fullName')}
                      className={frame('fullName')}
                    />
                    <FieldError touched={isTouched('fullName')} error={errorOf('fullName')} />
                  </QField>
                  <QField label="Email" required large>
                    <input
                      type="email"
                      placeholder="We'll use this to get back to you"
                      value={f.email}
                      onChange={(e) => set({ email: e.target.value })}
                      onBlur={() => touch('email')}
                      className={frame('email')}
                    />
                    <FieldError touched={isTouched('email')} error={errorOf('email')} />
                  </QField>
                </div>
                <div className="grid gap-x-10 md:grid-cols-2">
                  <QField label="Phone number" required large>
                    <PhoneField
                      dial={f.dial}
                      number={f.phone}
                      onDial={(v) => set({ dial: v })}
                      onNumber={(v) => set({ phone: v })}
                      onBlur={() => touch('phone')}
                      invalid={!!frame('phone')}
                    />
                    <FieldError touched={isTouched('phone')} error={errorOf('phone')} />
                  </QField>
                  <QField label="Country" required large>
                    <input
                      placeholder="City, venue or region"
                      value={f.country}
                      onChange={(e) => set({ country: e.target.value })}
                      onBlur={() => touch('country')}
                      className={frame('country')}
                    />
                    <FieldError touched={isTouched('country')} error={errorOf('country')} />
                  </QField>
                </div>
                <QField label="How did you find us?" required large>
                  <select
                    value={f.howFound}
                    onChange={(e) => set({ howFound: e.target.value, howFoundDetail: '' })}
                    onBlur={() => touch('howFound')}
                    className={frame('howFound')}
                  >
                    <option value="">Select an option</option>
                    {HOW_FOUND_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {HOW_FOUND_NEEDING_DETAIL.includes(f.howFound) ? (
                    <input
                      type="text"
                      value={f.howFoundDetail}
                      onChange={(e) => set({ howFoundDetail: e.target.value })}
                      placeholder={howFoundDetailPlaceholder(f.howFound)}
                      className="mt-3"
                    />
                  ) : null}
                  <FieldError touched={isTouched('howFound')} error={errorOf('howFound')} />
                </QField>
              </FormSection>

              <FormSection title="Event details" large>
                <div className="grid gap-x-10 md:grid-cols-2">
                  <QField label="Event date" required large>
                    <DateField
                      value={f.eventDate}
                      onChange={(v) => set({ eventDate: v })}
                      onBlur={() => touch('eventDate')}
                      invalid={!!frame('eventDate')}
                    />
                    <FieldError touched={isTouched('eventDate')} error={errorOf('eventDate')} />
                  </QField>
                  <QField label="Guest count" required large>
                    <input
                      inputMode="numeric"
                      placeholder="Enter a number"
                      value={f.guestCount}
                      onChange={(e) => set({ guestCount: e.target.value })}
                      onBlur={() => touch('guestCount')}
                      className={frame('guestCount')}
                    />
                    <FieldError touched={isTouched('guestCount')} error={errorOf('guestCount')} />
                  </QField>
                </div>
                <QField label="Service needed" required large>
                  <select
                    value={f.serviceNeeded}
                    onChange={(e) => set({ serviceNeeded: e.target.value })}
                    onBlur={() => touch('serviceNeeded')}
                    className={frame('serviceNeeded')}
                  >
                    <option value="">Select an option</option>
                    {CONTACT_SERVICE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <FieldError touched={isTouched('serviceNeeded')} error={errorOf('serviceNeeded')} />
                </QField>
                <QField label="Tell us more" required large>
                  <textarea
                    rows={5}
                    placeholder="Where you are getting married, the atmosphere you have in mind, anything that helps us picture it"
                    value={f.message}
                    onChange={(e) => set({ message: e.target.value })}
                    onBlur={() => touch('message')}
                    className={frame('message')}
                  />
                  <FieldError touched={isTouched('message')} error={errorOf('message')} />
                </QField>
              </FormSection>

              <div className="border-t border-mf-muted/20 pt-9">
                <PrivacyConsent checked={f.privacy} onChange={(v) => set({ privacy: v })} />
                {status === 'err' ? <FormError message={err} /> : null}
                <div className="mt-9">
                  <MissingFields fields={missing} />
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="mf-cta mf-cta-dark disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Sending…' : 'Submit inquiry'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <div className="py-8 text-center">
        <Link to="/getquote/" className="text-sm uppercase tracking-wide text-mf-muted underline">
          Get a quote
        </Link>
      </div>
    </>
  )
}
