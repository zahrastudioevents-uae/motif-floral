import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckboxRow, FormSection, Hint, QField, RadioRow } from '../components/FormLayout'
import { emptyPlanner, PlannerQuestion } from '../components/PlannerQuestion'
import { RestyleHero } from '../components/RestyleHero'
import { Seo } from '../components/Seo'
import {
  BUDGET_ELOPEMENT,
  BUDGET_EVENT,
  BUDGET_WEDDING,
  ELOPEMENT_GUEST_OPTIONS,
  FLORAL_PIECES_ELOPEMENT,
  FLORAL_PIECES_WEDDING,
  LOCATION_OPTIONS,
  type LocationValue,
  PREFERRED_MOMENT_OPTIONS,
  REFERRAL_SOURCES,
  REFERRAL_SOURCES_NEEDING_DETAIL,
  SERVICE_TABS,
  type ServiceType,
  WEDDING_SERVICE_OPTIONS,
} from '../data/getQuote'
import { howFoundDetailPlaceholder, PRIVACY_TEXT } from '../data/forms'
import { postJson } from '../lib/api'
import { img } from '../lib/assets'

const QUOTE_HERO = img(
  '/site/2qZExp/DDjYYd/get-a-quote-pink-whiteroses-bouquet-roses-white-ravello-palazzo-avino-3b24ac43-1500.jpg',
)

const currencyFor = (region: LocationValue) => (region === 'uae' ? 'AED' : 'EUR')

const emptyEventFields = {
  fullName: '',
  email: '',
  phone: '',
  eventDate: '',
  eventLocation: '' as LocationValue,
  eventLocationDetail: '',
  locationName: '',
  guestCount: '',
  vision: '',
  howDidYouHear: '',
  howDidYouHearDetail: '',
  investment: '',
  planner: emptyPlanner,
  privacyAccepted: false,
}

const emptyWeddingFields = {
  fullName: '',
  fianceName: '',
  email: '',
  phone: '',
  whereFrom: '',
  instagram: '',
  howDidYouMeet: '',
  howDidYouHear: '',
  howDidYouHearDetail: '',
  guestCount: '',
  elopementGuestType: '' as '' | 'just-us' | 'close-family' | 'more-than-10',
  elopementGuestCount: '',
  servicesInterested: [] as string[],
  floralPieces: [] as string[],
  multiDayDetail: '',
  eventDate: '',
  region: '' as LocationValue,
  regionDetail: '',
  ceremonyLocation: '',
  preferredMoment: '',
  pinterestLink: '',
  style: '',
  styleElements: '',
  dreamPhotographer: '',
  budget: '',
  planner: emptyPlanner,
  privacyAccepted: false,
}

export function GetQuote() {
  const nav = useNavigate()
  const [selectedService, setSelectedService] = useState<ServiceType>('wedding')
  const [status, setStatus] = useState<'idle' | 'loading' | 'err'>('idle')
  const [err, setErr] = useState('')

  const [eventFields, setEventFields] = useState(emptyEventFields)
  const [weddingFields, setWeddingFields] = useState(emptyWeddingFields)

  const isWeddingLike = selectedService === 'wedding' || selectedService === 'elopement'

  async function onSubmitEvent(e: FormEvent<HTMLFormElement>) {
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
      await postJson('/api/quote-event', {
        form_type: 'events',
        full_name: eventFields.fullName,
        email: eventFields.email,
        phone: eventFields.phone,
        event_date: eventFields.eventDate,
        event_location: eventFields.eventLocation,
        event_location_detail: eventFields.eventLocationDetail,
        location_name: eventFields.locationName,
        guest_count: eventFields.guestCount,
        vision: eventFields.vision,
        how_did_you_hear: eventFields.howDidYouHear,
        how_did_you_hear_detail: eventFields.howDidYouHearDetail,
        investment: eventFields.investment,
        has_planner: eventFields.planner.hasPlanner,
        planner_name: eventFields.planner.plannerName,
        wants_planning: eventFields.planner.wantsPlanning,
        privacy_accepted: eventFields.privacyAccepted,
      })
      nav('/portfolio/', { state: { quoteSuccess: true } })
    } catch (er) {
      setStatus('err')
      setErr(er instanceof Error ? er.message : 'Error')
    }
  }

  async function onSubmitWedding(e: FormEvent<HTMLFormElement>) {
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
      await postJson('/api/quote-wedding', {
        form_type: selectedService,
        full_name: weddingFields.fullName,
        fiance_name: weddingFields.fianceName,
        email: weddingFields.email,
        phone: weddingFields.phone,
        where_from: weddingFields.whereFrom,
        instagram: weddingFields.instagram,
        how_did_you_meet: weddingFields.howDidYouMeet,
        how_did_you_hear: weddingFields.howDidYouHear,
        how_did_you_hear_detail: weddingFields.howDidYouHearDetail,
        guest_count: weddingFields.guestCount,
        elopement_guest_type: weddingFields.elopementGuestType,
        elopement_guest_count: weddingFields.elopementGuestCount,
        services_interested: weddingFields.servicesInterested,
        floral_pieces: weddingFields.floralPieces,
        multi_day_detail: weddingFields.multiDayDetail,
        event_date: weddingFields.eventDate,
        region: weddingFields.region,
        region_detail: weddingFields.regionDetail,
        ceremony_location: weddingFields.ceremonyLocation,
        preferred_moment: weddingFields.preferredMoment,
        pinterest_link: weddingFields.pinterestLink,
        style: weddingFields.style,
        style_elements: weddingFields.styleElements,
        dream_photographer: weddingFields.dreamPhotographer,
        budget: weddingFields.budget,
        has_planner: weddingFields.planner.hasPlanner,
        planner_name: weddingFields.planner.plannerName,
        wants_planning: weddingFields.planner.wantsPlanning,
        privacy_accepted: weddingFields.privacyAccepted,
      })
      nav('/portfolio/', { state: { quoteSuccess: true } })
    } catch (er) {
      setStatus('err')
      setErr(er instanceof Error ? er.message : 'Error')
    }
  }

  const regionDetailPlaceholder = (region: LocationValue) =>
    region === 'italy'
      ? 'Amalfi Coast, Tuscany, Lake Como...'
      : region === 'europe'
        ? 'French Riviera, Santorini, Barcelona...'
        : region === 'uae'
          ? 'Dubai, Abu Dhabi, Ras Al Khaimah...'
          : 'Maldives, Bali, Caribbean...'

  const howDidYouHearField = (
    value: string,
    detail: string,
    onChange: (v: string) => void,
    onChangeDetail: (v: string) => void,
  ) => (
    <QField large label="How did you find us?" required>
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        <option value="">Select an option</option>
        {REFERRAL_SOURCES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {REFERRAL_SOURCES_NEEDING_DETAIL.includes(value) ? (
        <input
          type="text"
          value={detail}
          onChange={(e) => onChangeDetail(e.target.value)}
          placeholder={howFoundDetailPlaceholder(value)}
          className="mt-3"
        />
      ) : null}
    </QField>
  )

  const privacyBlock = (checked: boolean, onChange: (v: boolean) => void) => (
    <div className="border-t border-mf-muted/15 pt-8">
      <label className="flex gap-3 font-sans text-[0.75rem] leading-relaxed text-mf-muted">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className="mt-0.5 accent-mf-black"
        />
        <span>{PRIVACY_TEXT}</span>
      </label>
    </div>
  )

  const submitButton = (
    <div className="mt-8 flex justify-center">
      <button type="submit" disabled={status === 'loading'} className="mf-cta mf-cta-dark disabled:opacity-50">
        {status === 'loading' ? 'Sending…' : 'Send your request'}
      </button>
    </div>
  )

  return (
    <>
      <Seo
        title="Get a Quote – Motif Floral - Motif Floral"
        description="Request a bespoke floral quote for your event, wedding or elopement in Italy."
      />
      <RestyleHero title="Share the vision. We will shape the floral world." image={QUOTE_HERO} />

      <section className="bg-[#f6eee1] px-[4vw] py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="pl-[0.5em] text-center font-sans text-[0.95rem] font-extralight uppercase tracking-[0.5em] text-mf-black">
            Get a quote
          </h2>
          <p className="mt-6 text-center font-sans text-[1rem] leading-[1.9] text-mf-black/75">
            Please select the option below that best fits your celebration.
          </p>

          <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3">
            {SERVICE_TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setSelectedService(t.key)}
                className={`border px-3 py-4 font-sans text-[0.75rem] font-light uppercase tracking-[0.18em] transition-colors ${
                  selectedService === t.key
                    ? 'border-mf-black bg-mf-black text-white'
                    : 'border-mf-muted/25 text-mf-black hover:border-mf-black'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ===================== EVENTS ===================== */}
          {selectedService === 'events' ? (
            <form onSubmit={onSubmitEvent} className="mt-12">
              <input type="text" name="surname" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />

              <FormSection large title="Contact information">
                <QField large label="Full Name or Company Name" required>
                  <input
                    placeholder="Min. 2 characters, max. 100"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={eventFields.fullName}
                    onChange={(e) => setEventFields((p) => ({ ...p, fullName: e.target.value }))}
                  />
                </QField>
                <div className="grid gap-x-8 md:grid-cols-2">
                  <QField large label="Email" required>
                    <input
                      placeholder="We'll use this to get back to you"
                      type="email"
                      required
                      value={eventFields.email}
                      onChange={(e) => setEventFields((p) => ({ ...p, email: e.target.value }))}
                    />
                  </QField>
                  <QField large label="Phone Number" required>
                    <input
                      placeholder="Numbers only, 6 to 15 digits"
                      type="tel"
                      required
                      value={eventFields.phone}
                      onChange={(e) => setEventFields((p) => ({ ...p, phone: e.target.value }))}
                    />
                  </QField>
                </div>
              </FormSection>

              <FormSection large title="Event information">
                <div className="grid gap-x-8 md:grid-cols-2">
                  <QField large label="Event Date" required>
                    <input
                      type="text"
                      required
                      placeholder="DD / MM / YYYY"
                      value={eventFields.eventDate}
                      onChange={(e) => setEventFields((p) => ({ ...p, eventDate: e.target.value }))}
                    />
                  </QField>
                  <QField large label="Estimated Guest Count" required>
                    <input
                      type="text"
                      required
                      placeholder="50, 100, 200..."
                      value={eventFields.guestCount}
                      onChange={(e) => setEventFields((p) => ({ ...p, guestCount: e.target.value }))}
                    />
                  </QField>
                </div>

                <div className="mb-6">
                  <span className="font-sans text-[0.75rem] font-light text-mf-muted">
                    Where is your event taking place? *
                  </span>
                  <div className="mt-3">
                    <RadioRow large
                      name="eventLocation"
                      options={LOCATION_OPTIONS as unknown as { value: string; label: string }[]}
                      value={eventFields.eventLocation}
                      onChange={(v) =>
                        setEventFields((p) => ({
                          ...p,
                          eventLocation: v as LocationValue,
                          eventLocationDetail: '',
                          investment: '',
                        }))
                      }
                    />
                  </div>
                  {eventFields.eventLocation === 'other' ? (
                    <input
                      type="text"
                      placeholder="Maldives, Bali..."
                      value={eventFields.eventLocationDetail}
                      onChange={(e) => setEventFields((p) => ({ ...p, eventLocationDetail: e.target.value }))}
                      className="mt-3 w-full max-w-md mf-inline-field"
                    />
                  ) : null}
                </div>

                <QField large label="Location or Desired Location">
                  <input
                    type="text"
                    placeholder="Villa Erba, Lake Como"
                    value={eventFields.locationName}
                    onChange={(e) => setEventFields((p) => ({ ...p, locationName: e.target.value }))}
                  />
                </QField>

                <QField large
                  label="Tell us about your vision"
                  required
                 
                >
                  <textarea
                    required
                    rows={5}
                    placeholder="We're planning a corporate gala for 150 guests with a black-tie dress code..."
                    value={eventFields.vision}
                    onChange={(e) => setEventFields((p) => ({ ...p, vision: e.target.value }))}
                  />
                </QField>

                <div className="grid gap-x-8 md:grid-cols-2">
                  {howDidYouHearField(
                    eventFields.howDidYouHear,
                    eventFields.howDidYouHearDetail,
                    (v) => setEventFields((p) => ({ ...p, howDidYouHear: v, howDidYouHearDetail: '' })),
                    (v) => setEventFields((p) => ({ ...p, howDidYouHearDetail: v })),
                  )}
                  <QField large
                    label={`Desired Investment (${currencyFor(eventFields.eventLocation)})`}
                    required
                   
                  >
                    <select
                        required
                      value={eventFields.investment}
                      onChange={(e) => setEventFields((p) => ({ ...p, investment: e.target.value }))}
                    >
                      <option value="">Select your approximate budget range</option>
                      {(currencyFor(eventFields.eventLocation) === 'AED' ? BUDGET_EVENT.AED : BUDGET_EVENT.EUR).map(
                        (b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ),
                      )}
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </QField>
                </div>

                <PlannerQuestion
                  label="Are you working with an event planner?"
                  value={eventFields.planner}
                  onChange={(next) => setEventFields((p) => ({ ...p, planner: next }))}
                />
              </FormSection>

              {privacyBlock(eventFields.privacyAccepted, (v) => setEventFields((p) => ({ ...p, privacyAccepted: v })))}
              {status === 'err' ? <p className="mt-4 text-center text-sm text-red-700">{err}</p> : null}
              {submitButton}
            </form>
          ) : null}

          {/* ===================== WEDDING / ELOPEMENT ===================== */}
          {isWeddingLike ? (
            <form onSubmit={onSubmitWedding} className="mt-12">
              <input type="text" name="surname" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />

              <FormSection large title="Contact information">
                <div className="grid gap-x-8 md:grid-cols-2">
                  <QField large label="Full Name" required>
                    <input
                      placeholder="Min. 2 characters"
                      type="text"
                      required
                      minLength={2}
                      value={weddingFields.fullName}
                      onChange={(e) => setWeddingFields((p) => ({ ...p, fullName: e.target.value }))}
                    />
                  </QField>
                  <QField large label="Fiancé Full Name" required>
                    <input
                      placeholder="Min. 2 characters"
                      type="text"
                      required
                      minLength={2}
                      value={weddingFields.fianceName}
                      onChange={(e) => setWeddingFields((p) => ({ ...p, fianceName: e.target.value }))}
                    />
                  </QField>
                </div>
                <div className="grid gap-x-8 md:grid-cols-2">
                  <QField large label="Email" required>
                    <input
                      placeholder="We'll use this to get back to you"
                      type="email"
                      required
                      value={weddingFields.email}
                      onChange={(e) => setWeddingFields((p) => ({ ...p, email: e.target.value }))}
                    />
                  </QField>
                  <QField large label="Phone Number" required>
                    <input
                      placeholder="Numbers only, 6 to 15 digits"
                      type="tel"
                      required
                      value={weddingFields.phone}
                      onChange={(e) => setWeddingFields((p) => ({ ...p, phone: e.target.value }))}
                    />
                  </QField>
                </div>
                <div className="grid gap-x-8 md:grid-cols-2">
                  <QField large label="Where are you from?" required>
                    <input
                      placeholder="Your city and country, min. 2 characters"
                      type="text"
                      required
                      minLength={2}
                      value={weddingFields.whereFrom}
                      onChange={(e) => setWeddingFields((p) => ({ ...p, whereFrom: e.target.value }))}
                    />
                  </QField>
                  <QField large label="Your Instagram Profile">
                    <input
                      placeholder="@yourusername, helps us learn more about you"
                      type="text"
                      value={weddingFields.instagram}
                      onChange={(e) => setWeddingFields((p) => ({ ...p, instagram: e.target.value }))}
                    />
                  </QField>
                </div>
                {howDidYouHearField(
                  weddingFields.howDidYouHear,
                  weddingFields.howDidYouHearDetail,
                  (v) => setWeddingFields((p) => ({ ...p, howDidYouHear: v, howDidYouHearDetail: '' })),
                  (v) => setWeddingFields((p) => ({ ...p, howDidYouHearDetail: v })),
                )}
              </FormSection>

              <FormSection large title={selectedService === 'wedding' ? 'Wedding information' : 'Elopement information'}>
                <QField large label="Event Date" required>
                  <input
                    type="text"
                    required
                    placeholder="DD / MM / YYYY"
                    value={weddingFields.eventDate}
                    onChange={(e) => setWeddingFields((p) => ({ ...p, eventDate: e.target.value }))}
                  />
                </QField>

                <div className="mb-6">
                  <span className="font-sans text-[0.9rem] font-normal text-mf-black/80">
                    Where is your {selectedService === 'wedding' ? 'wedding' : 'elopement'} taking place? *
                  </span>
                  <div className="mt-3">
                    <RadioRow large
                      name="weddingRegion"
                      options={LOCATION_OPTIONS as unknown as { value: string; label: string }[]}
                      value={weddingFields.region}
                      onChange={(v) =>
                        setWeddingFields((p) => ({
                          ...p,
                          region: v as LocationValue,
                          regionDetail: '',
                          // the budget bands change currency with the region
                          budget: '',
                        }))
                      }
                    />
                  </div>
                  {weddingFields.region ? (
                    <input
                      type="text"
                      placeholder={regionDetailPlaceholder(weddingFields.region)}
                      value={weddingFields.regionDetail}
                      onChange={(e) => setWeddingFields((p) => ({ ...p, regionDetail: e.target.value }))}
                      className="mt-3 w-full max-w-md mf-inline-field"
                    />
                  ) : null}
                </div>

                <div className="grid gap-x-8 md:grid-cols-2">
                  <div className="mb-6">
                    <span className="font-sans text-[0.9rem] font-normal text-mf-black/80">
                      Preferred moment of the day *
                    </span>
                    <div className="mt-3">
                      <RadioRow large
                        name="preferredMoment"
                        options={PREFERRED_MOMENT_OPTIONS.map((m) => ({ value: m, label: m }))}
                        value={weddingFields.preferredMoment}
                        onChange={(v) => setWeddingFields((p) => ({ ...p, preferredMoment: v }))}
                      />
                    </div>
                  </div>
                  <QField large label="Pinterest Gallery Link">
                    <input
                      type="url"
                      placeholder="https://pinterest.com/yourboard"
                      value={weddingFields.pinterestLink}
                      onChange={(e) => setWeddingFields((p) => ({ ...p, pinterestLink: e.target.value }))}
                    />
                  </QField>
                </div>


                <QField large
                  label="Have you already selected the ceremony and reception location? If not, where would you like it to be?"
                  required
                >
                  <textarea
                    required
                    rows={3}
                    value={weddingFields.ceremonyLocation}
                    onChange={(e) => setWeddingFields((p) => ({ ...p, ceremonyLocation: e.target.value }))}
                  />
                </QField>

                {selectedService === 'wedding' ? (
                  <QField large label="Estimated Guest Count" required>
                    <input
                      placeholder="Enter a number"
                      type="number"
                      min={1}
                      required
                      value={weddingFields.guestCount}
                      onChange={(e) => setWeddingFields((p) => ({ ...p, guestCount: e.target.value }))}
                    />
                  </QField>
                ) : (
                  <div className="mb-6">
                    <span className="font-sans text-[0.75rem] font-light text-mf-muted">
                      Estimated Guest Count *
                    </span>
                    <div className="mt-3">
                      <RadioRow large
                        name="elopementGuestType"
                        options={ELOPEMENT_GUEST_OPTIONS as unknown as { value: string; label: string }[]}
                        value={weddingFields.elopementGuestType}
                        onChange={(v) =>
                          setWeddingFields((p) => ({
                            ...p,
                            elopementGuestType: v as typeof p.elopementGuestType,
                            elopementGuestCount: '',
                          }))
                        }
                      />
                    </div>
                    {weddingFields.elopementGuestType === 'close-family' ||
                    weddingFields.elopementGuestType === 'more-than-10' ? (
                      <input
                        type="number"
                        min={1}
                        placeholder="How many?"
                        value={weddingFields.elopementGuestCount}
                        onChange={(e) => setWeddingFields((p) => ({ ...p, elopementGuestCount: e.target.value }))}
                        className="mt-3 w-full max-w-[200px] mf-inline-field"
                      />
                    ) : null}
                  </div>
                )}

                <div className="grid gap-x-10 md:grid-cols-2">
                {selectedService === 'wedding' ? (
                  <div className="mb-6">
                    <span className="font-sans text-[0.9rem] font-normal text-mf-black/80">
                      What services are you interested in? *
                    </span>
                    <div className="mt-3">
                      <CheckboxRow large
                        options={WEDDING_SERVICE_OPTIONS as unknown as { value: string; label: string }[]}
                        value={weddingFields.servicesInterested}
                        onToggle={(v) =>
                          setWeddingFields((p) => ({
                            ...p,
                            servicesInterested: p.servicesInterested.includes(v)
                              ? p.servicesInterested.filter((s) => s !== v)
                              : [...p.servicesInterested, v],
                          }))
                        }
                      />
                    </div>
                    {weddingFields.servicesInterested.includes('Multi-Day Celebrations') ? (
                      <input
                        type="text"
                        placeholder="What other events would you like to organize?"
                        value={weddingFields.multiDayDetail}
                        onChange={(e) => setWeddingFields((p) => ({ ...p, multiDayDetail: e.target.value }))}
                        className="mt-3 w-full mf-inline-field"
                      />
                    ) : null}
                    <Hint text="Select at least one service" />
                  </div>
                ) : null}
                <div className="mb-6">
                  <span className="font-sans text-[0.9rem] font-normal text-mf-black/80">
                    {selectedService === 'wedding'
                      ? 'Which floral pieces do you need? *'
                      : 'Which floral decoration do you need? *'}
                  </span>
                  <div className="mt-3">
                    <CheckboxRow large
                      columns={selectedService === 'wedding' ? 1 : 2}
                      options={
                        (selectedService === 'wedding'
                          ? FLORAL_PIECES_WEDDING
                          : FLORAL_PIECES_ELOPEMENT) as unknown as { value: string; label: string }[]
                      }
                      value={weddingFields.floralPieces}
                      onToggle={(v) =>
                        setWeddingFields((p) => ({
                          ...p,
                          floralPieces: p.floralPieces.includes(v)
                            ? p.floralPieces.filter((s) => s !== v)
                            : [...p.floralPieces, v],
                        }))
                      }
                    />
                  </div>
                  <Hint large text="Select all that apply, you can change your mind later" />
                </div>
                </div>

                <PlannerQuestion
                  label={
                    selectedService === 'wedding'
                      ? 'Are you working with a wedding planner?'
                      : 'Are you working with a planner?'
                  }
                  value={weddingFields.planner}
                  onChange={(next) => setWeddingFields((p) => ({ ...p, planner: next }))}
                />
              </FormSection>

              <FormSection large>

                <QField large
                  label="Have you already found your dream photographer? Who is it?"
                 
                >
                  <input
                    type="text"
                    placeholder="Photographer name"
                    value={weddingFields.dreamPhotographer}
                    onChange={(e) => setWeddingFields((p) => ({ ...p, dreamPhotographer: e.target.value }))}
                  />
                </QField>
                <QField large
                  label={`Desired Investment (${currencyFor(weddingFields.region)})`}
                  required
                 
                >
                  <select
                    required
                    value={weddingFields.budget}
                    onChange={(e) => setWeddingFields((p) => ({ ...p, budget: e.target.value }))}
                  >
                    <option value="">Select your approximate budget range</option>
                    {(selectedService === 'wedding'
                      ? currencyFor(weddingFields.region) === 'AED'
                        ? BUDGET_WEDDING.AED
                        : BUDGET_WEDDING.EUR
                      : currencyFor(weddingFields.region) === 'AED'
                        ? BUDGET_ELOPEMENT.AED
                        : BUDGET_ELOPEMENT.EUR
                    ).map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </QField>
              </FormSection>

              {privacyBlock(weddingFields.privacyAccepted, (v) =>
                setWeddingFields((p) => ({ ...p, privacyAccepted: v })),
              )}
              {status === 'err' ? <p className="mt-4 text-center text-sm text-red-700">{err}</p> : null}
              {submitButton}
            </form>
          ) : null}
        </div>
      </section>
    </>
  )
}
