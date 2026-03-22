import { type CSSProperties, type FormEvent, type ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Seo } from '../components/Seo'
import {
  GUEST_COUNT_OPTIONS,
  HOW_FOUND_OPTIONS,
  PRIVACY_TEXT,
  TABLE_COUNT_OPTIONS,
} from '../data/forms'
import { postJson } from '../lib/api'
import { img } from '../lib/assets'

const HERO = img('/site/2qZExp/DDjYYd/get-a-quote-pink-whiteroses-bouquet-roses-white-ravello-palazzo-avino-3b24ac43-1500.jpg')

const BUDGET_OPTIONS = [
  'Up to €15.000',
  '€15.000 – €25.000',
  '€25.000 – €40.000',
  '€40.000 – €60.000',
  '€60.000 – €100.000',
  '€100.000+',
] as const

export function GetQuote() {
  const nav = useNavigate()
  const [status, setStatus] = useState<'idle' | 'loading' | 'err'>('idle')
  const [err, setErr] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const surname = String(fd.get('surname') || '')
    if (surname) {
      nav('/portfolio/', { state: { quoteSuccess: true } })
      return
    }
    setStatus('loading')
    setErr('')
    try {
      await postJson('/api/quote', {
        full_name: fd.get('full_name'),
        partner_name: fd.get('partner_name'),
        email: fd.get('email'),
        country: fd.get('country'),
        instagram: fd.get('instagram'),
        how_found_us: fd.get('how_found_us'),
        event_date: fd.get('event_date'),
        guest_count: fd.get('guest_count'),
        moodboard: fd.get('moodboard'),
        ceremony_type: fd.get('ceremony_type'),
        ceremony_location: fd.get('ceremony_location'),
        ceremony_setup: fd.get('ceremony_setup'),
        reception_venue: fd.get('reception_venue'),
        reception_tables: fd.get('reception_tables'),
        num_tables: fd.get('num_tables'),
        table_setup_desc: fd.get('table_setup_desc'),
        pinterest: fd.get('pinterest'),
        wedding_planner: fd.get('wedding_planner'),
        photographer: fd.get('photographer'),
        budget: fd.get('budget'),
        privacy_accepted: fd.get('privacy') === 'on',
        surname,
      })
      nav('/portfolio/', { state: { quoteSuccess: true } })
    } catch (er) {
      setStatus('err')
      setErr(er instanceof Error ? er.message : 'Error')
    }
  }

  return (
    <>
      <Seo
        title="Get a Quote – Motif Floral - Motif Floral"
        description="Request a bespoke floral quote for your wedding or event in Italy."
      />
      <section className="relative min-h-[45vh] text-white">
        <img
          src={HERO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/4" />
        <div className="relative z-10 mx-auto max-w-4xl px-[4vw] pb-16 pt-36 text-center md:pt-44">
          <h1 className="font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase leading-tight">
            GET&nbsp;&nbsp;a&nbsp;&nbsp;quote
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-[0.875rem] leading-relaxed text-white/95">
            Share your vision — we&apos;ll craft a tailored proposal for your celebration.
          </p>
        </div>
      </section>

      <section
        className="py-16"
        style={
          {
            '--quote-bg': '#F6F4F2',
            '--quote-accent': '#E6E1DA',
          } as CSSProperties
        }
      >
        <div
          className="mx-auto max-w-3xl px-[4vw] py-12"
          style={{ backgroundColor: 'var(--quote-bg)' }}
        >
          <form onSubmit={onSubmit} className="space-y-6">
            <input
              type="text"
              name="surname"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden
            />
            <QField label="Full name" required>
              <input name="full_name" required className="qf" />
            </QField>
            <QField label="Partner's full name" required>
              <input name="partner_name" required className="qf" />
            </QField>
            <QField label="Your email" required>
              <input name="email" type="email" required className="qf" />
            </QField>
            <QField label="Country" required>
              <input name="country" required className="qf" />
            </QField>
            <QField label="Your Instagram account">
              <input name="instagram" className="qf" />
            </QField>
            <QField label="How did you find us?" required>
              <select name="how_found_us" required className="qf">
                <option value="">Select…</option>
                {HOW_FOUND_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </QField>
            <QField label="Event date" required>
              <input name="event_date" required className="qf" />
            </QField>
            <QField label="Guest count" required>
              <select name="guest_count" required className="qf">
                <option value="">Select…</option>
                {GUEST_COUNT_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </QField>
            <QField label="Moodboard and color palette" required>
              <textarea
                name="moodboard"
                required
                rows={4}
                placeholder="Describe your palette and vision. Note any allergies in CAPITAL LETTERS."
                className="qf"
              />
            </QField>
            <fieldset className="space-y-2">
              <legend className="font-display text-[1.1rem] text-mf-black">Ceremony *</legend>
              <label className="flex items-center gap-2 font-sans text-sm">
                <input type="radio" name="ceremony_type" value="Civil" required /> Civil
              </label>
              <label className="flex items-center gap-2 font-sans text-sm">
                <input type="radio" name="ceremony_type" value="Religious" /> Religious
              </label>
            </fieldset>
            <QField label="Ceremony location" required>
              <input name="ceremony_location" required className="qf" />
            </QField>
            <QField label="What type of setup are you envisioning for the ceremony?" required>
              <textarea name="ceremony_setup" required rows={3} className="qf" />
            </QField>
            <QField label="Reception venue" required>
              <input name="reception_venue" required className="qf" />
            </QField>
            <fieldset className="space-y-2">
              <legend className="font-display text-[1.1rem] text-mf-black">
                Reception tables *
              </legend>
              <label className="flex items-center gap-2 font-sans text-sm">
                <input type="radio" name="reception_tables" value="Imperial" required /> Imperial
              </label>
              <label className="flex items-center gap-2 font-sans text-sm">
                <input type="radio" name="reception_tables" value="Round" /> Round
              </label>
              <label className="flex items-center gap-2 font-sans text-sm">
                <input type="radio" name="reception_tables" value="Other" /> Other
              </label>
            </fieldset>
            <QField label="Number of tables" required>
              <select name="num_tables" required className="qf">
                <option value="">Select…</option>
                {TABLE_COUNT_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </QField>
            <QField label="Describe your preferred table setup" required>
              <textarea name="table_setup_desc" required rows={3} className="qf" />
            </QField>
            <QField label="Pinterest board link" required>
              <input name="pinterest" type="url" required className="qf" />
            </QField>
            <QField label="Wedding planner?" required>
              <input name="wedding_planner" required className="qf" />
            </QField>
            <QField label="Photographer?" required>
              <input name="photographer" required className="qf" />
            </QField>
            <fieldset
              className="space-y-2 rounded border p-4"
              style={{ borderColor: 'var(--quote-accent)' }}
            >
              <legend className="font-display px-1 text-[1.1rem] text-mf-black">
                Indicative budget *
              </legend>
              <p className="font-sans text-xs text-mf-muted">
                Floral design typically starts from €10.000 depending on scope and season.
              </p>
              {BUDGET_OPTIONS.map((b) => (
                <label key={b} className="flex items-center gap-2 font-sans text-sm">
                  <input type="radio" name="budget" value={b} required /> {b}
                </label>
              ))}
            </fieldset>
            <label className="flex gap-3 font-sans text-xs leading-relaxed text-mf-black">
              <input type="checkbox" name="privacy" required className="mt-1" />
              <span>{PRIVACY_TEXT}</span>
            </label>
            {status === 'err' ? <p className="text-sm text-red-700">{err}</p> : null}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-mf-btn py-3 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-white hover:bg-mf-btn-hover disabled:opacity-50 md:w-auto md:px-12"
            >
              {status === 'loading' ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>
      </section>
      <style>{`
        .qf { width: 100%; border: 1px solid rgba(101,101,101,0.25); background: #fff; padding: 0.5rem 0.75rem; font-size: 0.875rem; }
      `}</style>
    </>
  )
}

function QField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="font-display text-[1.1rem] text-mf-black">
        {label}
        {required ? ' *' : ''}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  )
}
