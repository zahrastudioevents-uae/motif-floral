import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormSection, QField } from '../components/FormLayout'
import { RestyleHero } from '../components/RestyleHero'
import { Seo } from '../components/Seo'
import {
  CONTACT_SERVICE_OPTIONS,
  HOW_FOUND_OPTIONS,
  PRIVACY_TEXT,
} from '../data/forms'
import { postJson } from '../lib/api'
import { img } from '../lib/assets'

const CONTACT_HERO = img('/site/2qZExp/QD5PD3/IMG_2894_mod-bff09d8d-1500.JPG')

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [err, setErr] = useState('')

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
      <RestyleHero eyebrow="Contact us" title="Let us begin with your atmosphere." image={CONTACT_HERO}
        text={
          <>
            <span className="block">Tell us where, when and how you want the celebration to feel.</span>
            <span className="mt-5 block md:mt-6">
              Reach us at{' '}
              <a
                href="mailto:motifloral@gmail.com"
                className="text-white underline decoration-white/50 underline-offset-2 hover:text-white"
              >
                motifloral@gmail.com
              </a>{' '}
              or on WhatsApp{' '}
              <a
                href="https://wa.me/393345699447"
                className="text-white underline decoration-white/50 underline-offset-2 hover:text-white"
              >
                +39 3345699447
              </a>
              .
            </span>
          </>
        }
      />
      <section className="bg-mf-white px-[4vw] py-20">
        <div className="mx-auto max-w-2xl">
          {status === 'ok' ? (
            <p className="text-center font-sans text-[0.9rem] text-mf-muted">
              Thank you for contacting us.
            </p>
          ) : (
            <form onSubmit={onSubmit}>
              <input type="text" name="surname" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />

              <FormSection title="About you">
                <div className="grid gap-x-8 md:grid-cols-2">
                  <QField label="Full name" required>
                    <input name="full_name" required />
                  </QField>
                  <QField label="Email" required>
                    <input name="email" type="email" required />
                  </QField>
                </div>
                <div className="grid gap-x-8 md:grid-cols-2">
                  <QField label="Country" required>
                    <input name="country" required />
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
                    <input name="guest_count" required />
                  </QField>
                </div>
                <QField label="Service needed" required>
                  <select name="service_needed" required>
                    <option value="">Select&hellip;</option>
                    {CONTACT_SERVICE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </QField>
                <QField label="Tell us more" required>
                  <textarea name="message" rows={5} required />
                </QField>
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
