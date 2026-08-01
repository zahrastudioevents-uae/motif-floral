import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormSection, QField } from '../components/FormLayout'
import { RestyleHero } from '../components/RestyleHero'
import { Seo } from '../components/Seo'
import {
  CONTACT_SERVICE_OPTIONS,
  HOW_FOUND_NEEDING_DETAIL,
  HOW_FOUND_OPTIONS,
  howFoundDetailPlaceholder,
  PRIVACY_TEXT,
} from '../data/forms'
import { postJson } from '../lib/api'

const CONTACT_HERO = '/images/contact-hero.webp'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [err, setErr] = useState('')
  const [howFound, setHowFound] = useState('')
  const [howFoundDetail, setHowFoundDetail] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const surname = String(fd.get('surname') || '')
    if (surname) {
      setStatus('ok')
      return
    }
    setStatus('loading')
    setErr('')
    try {
      await postJson<{ ok: boolean }>('/api/contact', {
        full_name: fd.get('full_name'),
        email: fd.get('email'),
        country: fd.get('country'),
        how_found_us: fd.get('how_found_us'),
        how_found_us_detail: howFoundDetail,
        event_date: fd.get('event_date'),
        guest_count: fd.get('guest_count'),
        service_needed: fd.get('service_needed'),
        message: fd.get('message'),
        privacy_accepted: fd.get('privacy') === 'on',
        surname,
      })
      setStatus('ok')
    } catch (er) {
      setStatus('err')
      setErr(er instanceof Error ? er.message : 'Error')
    }
  }

  return (
    <>
      <Seo
        title="Contact – Motif Floral - Motif Floral"
        description="Contact Motif Floral for wedding and event florals in Italy."
      />
      <RestyleHero title="Let us begin with your atmosphere." image={CONTACT_HERO} />
      <section className="bg-[#f6eee1] px-[4vw] py-20 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="pl-[0.5em] text-center font-sans text-[0.95rem] font-extralight uppercase tracking-[0.5em] text-mf-black">
            Contact us
          </h2>
          <p className="mb-14 mt-6 text-center font-sans text-[1rem] leading-[1.9] text-mf-black/75 md:mb-16">
            <span className="block">
              Reach us at{' '}
              <a
                href="mailto:motifloral@gmail.com"
                className="text-mf-black underline decoration-mf-black/40 underline-offset-2 hover:decoration-mf-black"
              >
                motifloral@gmail.com
              </a>{' '}
              or on WhatsApp{' '}
              <a
                href="https://wa.me/393345699447"
                className="text-mf-black underline decoration-mf-black/40 underline-offset-2 hover:decoration-mf-black"
              >
                +39 3345699447
              </a>
              .
            </span>
          </p>
          {status === 'ok' ? (
            <p className="text-center font-sans text-[1.05rem] text-mf-black/80">
              Thank you for contacting us.
            </p>
          ) : (
            <form onSubmit={onSubmit}>
              <input type="text" name="surname" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />

              <FormSection large>
                <div className="grid gap-x-10 md:grid-cols-2">
                  <QField label="Full name" required large>
                    <input name="full_name" required />
                  </QField>
                  <QField label="Email" required large>
                    <input name="email" type="email" required />
                  </QField>
                </div>
                <div className="grid gap-x-10 md:grid-cols-2">
                  <QField label="Country" required large>
                    <input name="country" required />
                  </QField>
                  <QField label="How did you find us?" required large>
                    <select
                      name="how_found_us"
                      required
                      value={howFound}
                      onChange={(e) => {
                        setHowFound(e.target.value)
                        setHowFoundDetail('')
                      }}
                    >
                      <option value="">Select&hellip;</option>
                      {HOW_FOUND_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {HOW_FOUND_NEEDING_DETAIL.includes(howFound) ? (
                      <input
                        type="text"
                        name="how_found_us_detail"
                        value={howFoundDetail}
                        onChange={(e) => setHowFoundDetail(e.target.value)}
                        placeholder={howFoundDetailPlaceholder(howFound)}
                        className="mt-3"
                      />
                    ) : null}
                  </QField>
                </div>
              </FormSection>

              <FormSection title="Event details" large>
                <div className="grid gap-x-10 md:grid-cols-2">
                  <QField label="Event date" required large>
                    <input name="event_date" required placeholder="DD / MM / YYYY" />
                  </QField>
                  <QField label="Guest count" required large>
                    <input name="guest_count" required />
                  </QField>
                </div>
                <QField label="Service needed" required large>
                  <select name="service_needed" required>
                    <option value="">Select&hellip;</option>
                    {CONTACT_SERVICE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </QField>
                <QField label="Tell us more" required large>
                  <textarea name="message" rows={5} required />
                </QField>
              </FormSection>

              <div className="border-t border-mf-muted/20 pt-9">
                <label className="flex gap-3 font-sans text-[0.85rem] leading-relaxed text-mf-black/70">
                  <input type="checkbox" name="privacy" required className="mt-0.5 accent-mf-black" />
                  <span>{PRIVACY_TEXT}</span>
                </label>
                {status === 'err' ? <p className="mt-4 text-sm text-red-700">{err}</p> : null}
                <div className="mt-9 flex justify-center">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mf-cta mf-cta-dark disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending\u2026' : 'Submit inquiry'}
                  </button>
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
