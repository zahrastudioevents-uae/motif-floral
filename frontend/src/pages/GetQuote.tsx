import { type FormEvent, type ReactNode, useState } from 'react'
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

const HERO = img(
  '/site/2qZExp/DDjYYd/get-a-quote-pink-whiteroses-bouquet-roses-white-ravello-palazzo-avino-3b24ac43-1500.jpg',
)

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

      <section className="relative flex min-h-[50vh] items-end justify-center text-white md:min-h-[55vh]">
        <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
        <div className="relative z-10 px-[4vw] pb-16 pt-36 text-center md:pt-44">
          <p className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.2em] text-white/80">
            Share your vision
          </p>
          <h1 className="mt-3 font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase leading-tight">
            Get a Quote
          </h1>
          <p className="mx-auto mt-5 max-w-lg font-sans text-[0.8125rem] font-light leading-relaxed text-white/90">
            Tell us about your celebration and we&apos;ll craft a tailored proposal just for
            you.
          </p>
        </div>
      </section>

      <section className="bg-mf-white py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-[4vw]">
          <form onSubmit={onSubmit} className="space-y-0">
            <input
              type="text"
              name="surname"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden
            />

            <FormSection title="About you">
              <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
                <QField label="Full name" required>
                  <input name="full_name" required />
                </QField>
                <QField label="Partner's full name" required>
                  <input name="partner_name" required />
                </QField>
              </div>
              <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
                <QField label="Email" required>
                  <input name="email" type="email" required />
                </QField>
                <QField label="Country" required>
                  <input name="country" required />
                </QField>
              </div>
              <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
                <QField label="Instagram">
                  <input name="instagram" placeholder="@" />
                </QField>
                <QField label="How did you find us?" required>
                  <select name="how_found_us" required>
                    <option value="">Select&hellip;</option>
                    {HOW_FOUND_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </QField>
              </div>
            </FormSection>

            <FormSection title="Event details">
              <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
                <QField label="Event date" required>
                  <input name="event_date" required placeholder="DD / MM / YYYY" />
                </QField>
                <QField label="Guest count" required>
                  <select name="guest_count" required>
                    <option value="">Select&hellip;</option>
                    {GUEST_COUNT_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </QField>
              </div>
              <QField label="Moodboard & color palette" required>
                <textarea
                  name="moodboard"
                  required
                  rows={4}
                  placeholder="Describe your palette and vision. Note any allergies in CAPITAL LETTERS."
                />
              </QField>
            </FormSection>

            <FormSection title="Ceremony">
              <fieldset className="mb-6">
                <legend className="mb-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-mf-black">
                  Type *
                </legend>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2.5 font-sans text-[0.8125rem] text-mf-muted">
                    <input
                      type="radio"
                      name="ceremony_type"
                      value="Civil"
                      required
                      className="accent-mf-black"
                    />{' '}
                    Civil
                  </label>
                  <label className="flex items-center gap-2.5 font-sans text-[0.8125rem] text-mf-muted">
                    <input
                      type="radio"
                      name="ceremony_type"
                      value="Religious"
                      className="accent-mf-black"
                    />{' '}
                    Religious
                  </label>
                </div>
              </fieldset>
              <QField label="Location" required>
                <input name="ceremony_location" required />
              </QField>
              <QField label="What setup are you envisioning?" required>
                <textarea name="ceremony_setup" required rows={3} />
              </QField>
            </FormSection>

            <FormSection title="Reception">
              <QField label="Venue" required>
                <input name="reception_venue" required />
              </QField>
              <fieldset className="mb-6">
                <legend className="mb-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-mf-black">
                  Table style *
                </legend>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2.5 font-sans text-[0.8125rem] text-mf-muted">
                    <input
                      type="radio"
                      name="reception_tables"
                      value="Imperial"
                      required
                      className="accent-mf-black"
                    />{' '}
                    Imperial
                  </label>
                  <label className="flex items-center gap-2.5 font-sans text-[0.8125rem] text-mf-muted">
                    <input
                      type="radio"
                      name="reception_tables"
                      value="Round"
                      className="accent-mf-black"
                    />{' '}
                    Round
                  </label>
                  <label className="flex items-center gap-2.5 font-sans text-[0.8125rem] text-mf-muted">
                    <input
                      type="radio"
                      name="reception_tables"
                      value="Other"
                      className="accent-mf-black"
                    />{' '}
                    Other
                  </label>
                </div>
              </fieldset>
              <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
                <QField label="Number of tables" required>
                  <select name="num_tables" required>
                    <option value="">Select&hellip;</option>
                    {TABLE_COUNT_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </QField>
                <QField label="Pinterest board" required>
                  <input name="pinterest" type="url" required placeholder="https://" />
                </QField>
              </div>
              <QField label="Describe your preferred table setup" required>
                <textarea name="table_setup_desc" required rows={3} />
              </QField>
            </FormSection>

            <FormSection title="Your team">
              <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
                <QField label="Wedding planner" required>
                  <input name="wedding_planner" required />
                </QField>
                <QField label="Photographer" required>
                  <input name="photographer" required />
                </QField>
              </div>
            </FormSection>

            <FormSection title="Budget">
              <p className="mb-4 font-sans text-[0.75rem] leading-relaxed text-mf-muted">
                Floral design typically starts from &euro;10.000 depending on scope and season.
              </p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {BUDGET_OPTIONS.map((b) => (
                  <label
                    key={b}
                    className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-mf-muted/20 px-4 py-3 font-sans text-[0.8125rem] text-mf-muted transition-colors has-[:checked]:border-mf-black has-[:checked]:text-mf-black"
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={b}
                      required
                      className="accent-mf-black"
                    />
                    {b}
                  </label>
                ))}
              </div>
            </FormSection>

            <div className="border-t border-mf-muted/15 pt-8">
              <label className="flex gap-3 font-sans text-[0.75rem] leading-relaxed text-mf-muted">
                <input
                  type="checkbox"
                  name="privacy"
                  required
                  className="mt-0.5 accent-mf-black"
                />
                <span>{PRIVACY_TEXT}</span>
              </label>

              {status === 'err' ? (
                <p className="mt-4 text-sm text-red-700">{err}</p>
              ) : null}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mf-cta mf-cta-dark mt-8 w-full disabled:opacity-50 md:w-auto"
              >
                {status === 'loading' ? 'Sending\u2026' : 'Send your request'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

function FormSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="border-t border-mf-muted/15 pt-8 pb-4">
      <h2 className="mb-6 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-mf-black">
        {title}
      </h2>
      {children}
    </div>
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
    <label className="mb-6 block">
      <span className="font-sans text-[0.75rem] font-light text-mf-muted">
        {label}
        {required ? ' *' : ''}
      </span>
      <div className="mt-1.5 [&>input]:w-full [&>input]:border-0 [&>input]:border-b [&>input]:border-mf-muted/25 [&>input]:bg-transparent [&>input]:py-2 [&>input]:font-sans [&>input]:text-[0.875rem] [&>input]:text-mf-black [&>input]:outline-none [&>input]:transition-colors [&>input]:focus:border-mf-black [&>select]:w-full [&>select]:border-0 [&>select]:border-b [&>select]:border-mf-muted/25 [&>select]:bg-transparent [&>select]:py-2 [&>select]:font-sans [&>select]:text-[0.875rem] [&>select]:text-mf-black [&>select]:outline-none [&>select]:transition-colors [&>select]:focus:border-mf-black [&>textarea]:w-full [&>textarea]:border [&>textarea]:border-mf-muted/20 [&>textarea]:bg-transparent [&>textarea]:px-3 [&>textarea]:py-2.5 [&>textarea]:font-sans [&>textarea]:text-[0.875rem] [&>textarea]:text-mf-black [&>textarea]:outline-none [&>textarea]:transition-colors [&>textarea]:focus:border-mf-black">
        {children}
      </div>
    </label>
  )
}
