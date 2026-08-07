import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { BUSINESS } from '../lib/site'
import { breadcrumb, graph, webPage } from '../lib/structuredData'

/**
 * Required of any Italian business collecting personal data through a form.
 * Written to match what the site actually does: three forms, an email sent to
 * the studio, and no advertising or profiling.
 *
 * Reviewed by a lawyer it is not. The facts in it are ours and correct; if the
 * studio adds analytics, newsletters or ad pixels, this page has to change too.
 */
const UPDATED = '4 August 2026'

function Section({
  title,
  id,
  children,
}: {
  title: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-mf-muted/15 pt-8">
      <h2 className="font-sans text-[0.75rem] uppercase tracking-[0.22em] text-mf-black">{title}</h2>
      <div className="mt-4 space-y-4 font-sans text-[0.9rem] font-light leading-[1.9] text-mf-muted">
        {children}
      </div>
    </section>
  )
}

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Motif Floral"
        description="How Motif Floral collects, uses and stores the personal data you send through the contact and quote forms."
        jsonLd={graph(
          webPage('Privacy Policy', '/privacy/', 'How Motif Floral handles personal data.'),
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy/' }]),
        )}
      />
      <section className="bg-mf-white px-[4vw] py-20 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-[min(2.75rem,1.2rem+2.4vw)] font-normal uppercase leading-tight tracking-wide text-mf-black">
            Privacy Policy
          </h1>
          <p className="mt-4 font-sans text-[0.75rem] uppercase tracking-[0.2em] text-mf-muted">
            Last updated {UPDATED}
          </p>

          <p className="mb-12 mt-8 font-sans text-[0.9rem] font-light leading-[1.9] text-mf-muted">
            This page explains what happens to the information you send us. In short: we use it to
            answer you and to prepare your quote, we do not sell it, and you can ask us to delete it
            at any time.
          </p>

          <div className="space-y-10">
            <Section title="Who is responsible">
              <p>
                {BUSINESS.name}, a floral design studio based in {BUSINESS.city}, Italy, is the data
                controller. You can reach us at{' '}
                <a href={`mailto:${BUSINESS.email}`} className="underline underline-offset-2 hover:text-mf-black">
                  {BUSINESS.email}
                </a>{' '}
                or on WhatsApp at {BUSINESS.phone}.
              </p>
            </Section>

            <Section title="What we collect">
              <p>
                Only what you type into the contact or quote forms: your name and your partner's
                name, email, phone, where you are from, the date and location of your celebration,
                guest numbers, the flowers and services you are interested in, your budget range,
                any Pinterest board or references you share, and anything you write in the message
                field. The forms also ask how you found us.
              </p>
              <p>
                We do not ask for and do not want payment details, identity documents, or any
                information about health, beliefs or other special categories.
              </p>
            </Section>

            <Section title="Why we use it, and on what basis">
              <p>
                To reply to you, to prepare a quote, and to design and deliver the flowers if you go
                ahead. The legal basis is your request: answering an enquiry and taking steps at your
                request before a contract, and performing that contract if we sign one.
              </p>
              <p>
                We do not use your details for advertising, we do not profile you, and we do not make
                automated decisions about you.
              </p>
            </Section>

            <Section title="Where it goes">
              <p>
                The form sends your message to our own inbox by email. Two providers are involved in
                that journey: Resend, which delivers the message, and Vercel, which hosts the site
                and runs the form. Our email is with Google. All three act on our instructions, and
                the transfer of data outside the EU that this can involve is covered by the European
                Commission's standard contractual clauses.
              </p>
              <p>We do not sell your data and we do not share it with anyone else.</p>
            </Section>

            <Section title="Cookie Policy" id="cookie-policy">
              <p>
                A cookie is a small file a site leaves in your browser. Below is every kind this
                site can set, and what has to happen first.
              </p>
              <p className="pt-2 font-normal text-mf-black">Strictly necessary cookies</p>
              <p>
                Essential for the site to work: they remember the choice you made in the cookie
                banner and keep a form submission from being sent twice. No consent is required for
                these, because without them the site does not function.
              </p>
              <p className="pt-2 font-normal text-mf-black">Analytics cookies</p>
              <p>
                Google Analytics, used to understand how visitors move through the site: which pages
                are read, which are skipped, how people arrive. Your IP address is anonymised, the
                measurement is aggregated, and it runs whichever button you press in the banner:
                it tells us nothing about you as a person and is never used to advertise to you or
                sold to anyone. If you would rather not be counted at all, write to us and we will
                exclude you.
              </p>
              <p className="pt-2 font-normal text-mf-black">Advertising cookies (Meta Pixel)</p>
              <p>
                Used only to measure how our Instagram and Facebook campaigns perform. These load
                exclusively after you press <em>Accept All</em>, and never otherwise.
              </p>
              <p className="pt-2">
                You can change your mind whenever you like: clear the cookies for this site in your
                browser and the banner will ask again on your next visit, or write to{' '}
                <a
                  href="mailto:motifloral@gmail.com"
                  className="underline underline-offset-2 hover:text-mf-black"
                >
                  motifloral@gmail.com
                </a>{' '}
                and we will take care of it.
              </p>
            </Section>

            <Section title="How long we keep it">
              <p>
                Enquiries that do not turn into work are kept for up to two years, in case you come
                back to us. If we work together, we keep the project correspondence for ten years,
                which is what Italian bookkeeping and tax rules require.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                You can ask us for a copy of what we hold, ask us to correct it, ask us to delete it,
                ask us to restrict how we use it, or object to our using it. Write to{' '}
                <a href={`mailto:${BUSINESS.email}`} className="underline underline-offset-2 hover:text-mf-black">
                  {BUSINESS.email}
                </a>{' '}
                and we will answer within a month.
              </p>
              <p>
                If you think we have handled your data badly you can complain to the Italian data
                protection authority, the Garante per la protezione dei dati personali, at{' '}
                <a
                  href="https://www.garanteprivacy.it"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-mf-black"
                >
                  garanteprivacy.it
                </a>
                .
              </p>
            </Section>
          </div>

          <div className="mt-14 border-t border-mf-muted/15 pt-8">
            <Link to="/contact/" className="mf-cta mf-cta-dark">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
