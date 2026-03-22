import { type FormEvent, type ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import {
  CONTACT_SERVICE_OPTIONS,
  HOW_FOUND_OPTIONS,
  PRIVACY_TEXT,
} from '../data/forms'
import { postJson } from '../lib/api'
import { img } from '../lib/assets'

const HERO = img('/site/2qZExp/QD5PD3/IMG_2894_mod-bff09d8d-1500.JPG')

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
      <section className="relative min-h-[50vh] text-white">
        <img
          src={HERO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '53% 32%' }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 mx-auto max-w-3xl px-[4vw] pb-20 pt-36 text-center md:pt-44">
          <p className="font-sans text-[0.8125rem] uppercase tracking-[0.15em] text-white/95">
            Let&apos;s begin your story together
          </p>
          <h1 className="mt-4 font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase">
            Contact us
          </h1>
          <p className="mt-6 font-sans text-[0.875rem] leading-relaxed text-white/90">
            We would love to hear from you. Reach us at{' '}
            <a href="mailto:motifloral@gmail.com" className="underline">
              motifloral@gmail.com
            </a>{' '}
            or on WhatsApp{' '}
            <a href="https://wa.me/393345699447" className="underline">
              +39 3345699447
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-mf-accent py-16">
        <div className="mx-auto max-w-2xl px-[4vw]">
          {status === 'ok' ? (
            <p className="text-center font-sans text-lg text-mf-black">
              Thank you for contacting us!
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <input
                type="text"
                name="surname"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden
              />
              <Field label="Full name" required>
                <input
                  name="full_name"
                  required
                  className="w-full border border-mf-muted/30 bg-white px-3 py-2 font-sans text-sm"
                />
              </Field>
              <Field label="Email" required>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full border border-mf-muted/30 bg-white px-3 py-2 font-sans text-sm"
                />
              </Field>
              <Field label="Country" required>
                <input
                  name="country"
                  required
                  className="w-full border border-mf-muted/30 bg-white px-3 py-2 font-sans text-sm"
                />
              </Field>
              <Field label="How did you find us?" required>
                <select
                  name="how_found_us"
                  required
                  className="w-full border border-mf-muted/30 bg-white px-3 py-2 font-sans text-sm"
                >
                  <option value="">Select…</option>
                  {HOW_FOUND_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Event date (DD/MM/YYYY)" required>
                <input
                  name="event_date"
                  required
                  placeholder="DD/MM/YYYY"
                  className="w-full border border-mf-muted/30 bg-white px-3 py-2 font-sans text-sm"
                />
              </Field>
              <Field label="Guest count" required>
                <input
                  name="guest_count"
                  required
                  className="w-full border border-mf-muted/30 bg-white px-3 py-2 font-sans text-sm"
                />
              </Field>
              <Field label="Service needed" required>
                <select
                  name="service_needed"
                  required
                  className="w-full border border-mf-muted/30 bg-white px-3 py-2 font-sans text-sm"
                >
                  <option value="">Select…</option>
                  {CONTACT_SERVICE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Tell us more…" required>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full border border-mf-muted/30 bg-white px-3 py-2 font-sans text-sm"
                />
              </Field>
              <label className="flex gap-3 font-sans text-xs leading-relaxed text-mf-black">
                <input type="checkbox" name="privacy" required className="mt-1" />
                <span>{PRIVACY_TEXT}</span>
              </label>
              {status === 'err' ? (
                <p className="text-sm text-red-700">{err}</p>
              ) : null}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-mf-btn px-10 py-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-white hover:bg-mf-btn-hover disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending…' : 'Submit'}
              </button>
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

function Field({
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
