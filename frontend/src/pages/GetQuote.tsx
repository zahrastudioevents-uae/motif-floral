import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormSection, QField } from '../components/FormLayout'
import { RestyleHero } from '../components/RestyleHero'
import { Seo } from '../components/Seo'
import {
  GUEST_COUNT_OPTIONS,
  HOW_FOUND_OPTIONS,
  PRIVACY_TEXT,
  TABLE_COUNT_OPTIONS,
} from '../data/forms'
import { postJson } from '../lib/api'
import { img } from '../lib/assets'

const QUOTE_HERO = img(
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
      await postJson<{ ok?: boolean }>('/api/quote', {
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
      <RestyleHero
        eyebrow="Bespoke proposal"
        title="Share the vision. We will shape the floral world."
        text="A refined inquiry form for celebrations that need a complete floral direction."
        image={QUOTE_HERO}
      />
      <section className="bg-mf-white px-[4vw] py-20">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="surname"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden
            />

            <FormSection title="About you">
              <div className="grid gap-x-8 md:grid-cols-2">
                <QField label="Full name" required>
                  <input name="full_name" required />
                </QField>
                <QField label="Partner's full name" required>
                  <input name="partner_name" required />
                </QField>
                <QField label="Email" required>
                  <input name="email" type="email" required />
                </QField>
                <QField label="Country" required>
                  <input name="country" required />
                </QField>
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
              <div className="grid gap-x-8 md:grid-cols-2">
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
                <textarea name="moodboard" rows={4} required />
              </QField>
            </FormSection>

            <FormSection title="Ceremony & reception">
              <div className="grid gap-x-8 md:grid-cols-2">
                <QField label="Ceremony location" required>
                  <input name="ceremony_location" required />
                </QField>
                <QField label="Reception venue" required>
                  <input name="reception_venue" required />
                </QField>
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
              <QField label="Ceremony setup" required>
                <textarea name="ceremony_setup" rows={3} required />
              </QField>
              <QField label="Describe your preferred table setup" required>
                <textarea name="table_setup_desc" rows={3} required />
              </QField>
              <input type="hidden" name="ceremony_type" value="To define" />
              <input type="hidden" name="reception_tables" value="To define" />
            </FormSection>

            <FormSection title="Your team & budget">
              <div className="grid gap-x-8 md:grid-cols-2">
                <QField label="Wedding planner" required>
                  <input name="wedding_planner" required />
                </QField>
                <QField label="Photographer" required>
                  <input name="photographer" required />
                </QField>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {BUDGET_OPTIONS.map((b) => (
                  <label
                    key={b}
                    className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-mf-muted/20 px-4 py-3 font-sans text-[0.8125rem] text-mf-muted transition-colors has-[:checked]:border-mf-black has-[:checked]:text-mf-black"
                  >
                    <input type="radio" name="budget" value={b} required className="accent-mf-black" />
                    {b}
                  </label>
                ))}
              </div>
            </FormSection>

            <div className="border-t border-mf-muted/15 pt-8">
              <label className="flex gap-3 font-sans text-[0.75rem] leading-relaxed text-mf-muted">
                <input type="checkbox" name="privacy" required className="mt-0.5 accent-mf-black" />
                <span>{PRIVACY_TEXT}</span>
              </label>
              {status === 'err' ? <p className="mt-4 text-sm text-red-700">{err}</p> : null}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mf-cta mf-cta-dark disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending\u2026' : 'Send your request'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
