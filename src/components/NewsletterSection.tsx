import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail } from 'lucide-react'
import { useLocale } from '../i18n/useLocale'
import { trackNewsletterSignup } from '../lib/analytics'
import { localePrefix } from '../i18n/config'
import FounderByline from '../shared/FounderByline';
import { Erotinrivi, erotinOsat } from '../shared/Erotin';

// Uutiskirjeen kieliohje sivun kielestä (ei <html lang>:sta, joka on esirenderöinnissä aina 'en').
// Kirjeitä lähtee vain suomeksi ja englanniksi, joten fi/en-sivulla ohje toistaisi itsestäänselvää
// eikä näy. Vesa 1.11.2026: "kuinka monta kertaa lukee sähköpostiosoite" (sama kuin skiresorts 92e9878).
const NL_LANG_NOTICE: Record<string, string> = {
  de: 'Die Newsletter werden auf Englisch versendet.', ja: 'ニュースレターは英語でお届けします。',
  es: 'Los boletines se envían en inglés.', pt: 'As newsletters são enviadas em inglês.', zh: '订阅邮件以英语发送。',
  ko: '뉴스레터는 영어로 발송됩니다.', fr: 'Les newsletters sont envoyées en anglais.', it: 'Le newsletter sono inviate in inglese.',
  nl: 'De nieuwsbrieven zijn in het Engels.', sv: 'Nyhetsbreven skickas på engelska.',
};
const NL_EMAIL_LABEL: Record<string, string> = {
  en: 'Email address', fi: 'Sähköpostiosoite', de: 'E-Mail-Adresse', ja: 'メールアドレス',
  es: 'Correo electrónico', pt: 'E-mail', zh: '电子邮箱', ko: '이메일 주소',
  fr: 'Adresse e-mail', it: 'Indirizzo e-mail', nl: 'E-mailadres', sv: 'E-postadress',
};
// Esimerkkiosoite kentän taustalle (4.11.2026): näyttää muodon, ei toista otsikkoa.
const NL_EMAIL_EXAMPLE: Record<string, string> = {
  en: 'name@example.com', fi: 'nimi@esimerkki.fi', de: 'name@beispiel.de', ja: 'name@example.com',
  es: 'nombre@ejemplo.es', pt: 'nome@exemplo.com.br', zh: 'name@example.com', ko: 'name@example.com',
  fr: 'nom@exemple.fr', it: 'nome@esempio.it', nl: 'naam@voorbeeld.nl', sv: 'namn@exempel.se',
};
const nlLang = (l?: string): string => {
  const x = (l || 'en').toLowerCase();
  return x === 'br' ? 'pt' : x === 'cn' ? 'zh' : x === 'kr' ? 'ko' : x === 'jp' ? 'ja' : x.split('-')[0];
};

/** `/privacy` → `/privacy/`: Cloudflare vastaa kauttaviivattomaan osoitteeseen 308:lla,
 *  ja Google kirjaa jokaisen sellaisen linkin uudelleenohjaukseksi (18.9.2026). */
const withSlash = (href: string) => href.replace(/^([^?#]*[^/?#])(?=[?#]|$)/, '$1/');

/**
 * [LV-FUNNEL 2026-08-21] Lomakesuppilon eventit Umamiin — paikallinen apuri,
 * ei jaettua importtia (vendoroitu sync on refresh-only). Ei saa koskaan
 * rikkoa lomaketta. Standardi: memory _procedural/lv_form_funnel_events.md.
 */
function track(event: string, data?: Record<string, unknown>) {
  try {
    (window as unknown as { umami?: { track: (e: string, d?: unknown) => void } }).umami?.track(event, data);
  } catch { /* ignore */ }
}

/**
 * Marketing-consent + age copy per locale. Kept in this file (not in the
 * `pages` namespace JSONs) so the exact wording the user ticks is the exact
 * string posted to the backend as `consentText` — the consent record and the
 * rendered label can never drift apart.
 */
const CONSENT_COPY: Record<string, { consent: string; privacy: string }> = {
  en: {
    consent:
      'Yes, send the LaplandVibes newsletter (travel tips, seasonal updates and offers) to this email address. I confirm I am 18 or over.',
    privacy: 'Privacy Policy',
  },
  fi: {
    consent:
      'LaplandVibes saa lähettää minulle uutiskirjettä (matkailuvinkkejä, sesonkitietoa ja tarjouksia) antamaani sähköpostiosoitteeseen. Olen täyttänyt 18 vuotta.',
    privacy: 'Tietosuojaseloste',
  },
  de: {
    consent:
      'Ja, LaplandVibes darf mir den Newsletter mit Reisetipps, Saisoninfos und Angeboten an diese E-Mail-Adresse senden. Ich bin mindestens 18 Jahre alt.',
    privacy: 'Datenschutzerklärung',
  },
  ja: {
    consent:
      '入力したメールアドレス宛に、LaplandVibesがニュースレター（旅のヒント、シーズン情報、キャンペーン情報）を送ることに同意します。私は18歳以上です。',
    privacy: 'プライバシーポリシー',
  },
  es: {
    consent:
      'Acepto recibir en mi correo el boletín de LaplandVibes (consejos de viaje, información de temporada y ofertas) y confirmo que tengo al menos 18 años.',
    privacy: 'Política de privacidad',
  },
  'pt-BR': {
    consent:
      'Aceito receber a newsletter do LaplandVibes no e-mail informado, com dicas de viagem, informações de temporada e ofertas. Tenho 18 anos ou mais.',
    privacy: 'Política de Privacidade',
  },
  'zh-CN': {
    consent:
      '我同意 LaplandVibes 向我填写的邮箱发送订阅邮件，内容包括拉普兰旅行建议、季节资讯和优惠信息，并确认本人已年满18周岁。',
    privacy: '隐私政策',
  },
  ko: {
    consent:
      '입력한 이메일 주소로 LaplandVibes가 보내는 여행 팁·시즌 정보·프로모션 소식 뉴스레터 수신에 동의하며, 만 18세 이상임을 확인합니다.',
    privacy: '개인정보처리방침',
  },
  fr: {
    consent:
      "J'accepte de recevoir la newsletter LaplandVibes (conseils voyage, infos saisonnières, offres) à cette adresse e-mail et je confirme avoir 18 ans ou plus.",
    privacy: 'Politique de confidentialité',
  },
  it: {
    consent:
      "Sì, desidero ricevere la newsletter di LaplandVibes (consigli di viaggio, novità stagionali e offerte) all'indirizzo indicato. Ho almeno 18 anni.",
    privacy: 'Informativa sulla privacy',
  },
  nl: {
    consent:
      'Ja, LaplandVibes mag de nieuwsbrief met reistips, seizoensinfo en aanbiedingen naar dit e-mailadres sturen. Ik ben 18 jaar of ouder.',
    privacy: 'Privacyverklaring',
  },
  sv: {
    consent:
      'Ja, jag vill ha nyhetsbrevet från LaplandVibes med restips, säsongsinfo och erbjudanden till min e-postadress. Jag är minst 18 år.',
    privacy: 'Integritetspolicy',
  },
}

const SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co'
const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54'

/**
 * Inline pink Newsletter band — the only non-light section per LV brand canon.
 * Calls Supabase send-welcome-email Edge Function directly.
 * Source tag: laplandfood-inline.
 */
export default function NewsletterSection() {
  const { t } = useTranslation('pages')
  const [email, setEmail] = useState('')
  const [consented, setConsented] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  // Locale from the URL prefix (useLocale) — NOT i18n.resolvedLanguage: on a
  // direct non-EN load the locale bundle is registered without a
  // changeLanguage() call, so resolvedLanguage stays 'en' for the session and
  // BOTH the consent text and the privacy href fell to EN on localized pages
  // (same bug as the hub, fixed network-wide 2026-08-15).
  const { locale: lang } = useLocale()
  const consentCopy = CONSENT_COPY[lang] ?? CONSENT_COPY[lang.split('-')[0]] ?? CONSENT_COPY.en
  const privacyHref = `${localePrefix(lang)}/privacy`
  // [LV-FUNNEL] view = osio vieritetty näkyviin (kerran), start = 1. fokus,
  // blocked kerran per submit-yritys (natiivi invalid laukeaa per kenttä).
  const funnelData = { surface: 'inline', lang };
  const sectionRef = useRef<HTMLElement | null>(null);
  const startTracked = useRef(false);
  const blockedTracked = useRef(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) {
        track('nl_view', funnelData);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const trackStart = () => {
    if (startTracked.current) return;
    startTracked.current = true;
    track('nl_start', funnelData);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@') || !consented) {
      track('nl_blocked', { ...funnelData, reason: !email || !email.includes('@') ? 'email' : 'consent' });
      return
    }
    setStatus('loading')
    setError('')
    track('nl_submit', funnelData);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          email,
          source: 'laplandfood-inline',
          consent: true,
          ageConfirmed: true,
          consentText: consentCopy.consent,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      trackNewsletterSignup('laplandfood-inline')
      track('nl_success', funnelData);
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
      track('nl_error', funnelData);
    }
  }

  return (
    <section className="py-20 sm:py-24" ref={sectionRef}
      style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #7E22CE 35%, #BE185D 70%, #DB2777 100%)' }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <p className="text-white/80 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
          {t('newsletter.kicker')}
        </p>
        <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-white mb-4">
          {t('newsletter.headline')}
        </h2>
        <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto max-lg:w-fit max-lg:text-left mb-8">
          {t('newsletter.subhead')}
        </p>

        {status === 'success' ? (
          <div className="bg-white/15 backdrop-blur border border-white/30 rounded-2xl px-6 py-5 max-w-md mx-auto">
            <p className="text-white font-semibold">{t('newsletter.successHeadline')}</p>
            <p className="text-white/80 text-sm mt-2">
              {t('newsletter.successBody')}
            </p>
          </div>
        ) : (
          <><FounderByline tone="pink" />
          {/* 4.11.2026 (Vesa: kenttä "leijuu" eikä "anna esimerkkiä taustalle"): Codexin 28.10. tumma laatikko pois, otsikko kentän yllä, kenttä ja nappi samalla rivillä, esimerkkiosoite kentässä. */}
          {/* Tilaa-nappi pysyy sivuston omana Suomen sinisenä (#002F6C, tumma kuten mallin deep-night). */}
          <form onSubmit={onSubmit}
            onInvalidCapture={(e) => {
              if (blockedTracked.current) return;
              blockedTracked.current = true;
              window.setTimeout(() => { blockedTracked.current = false; }, 400);
              const t = e.target as HTMLInputElement;
              track('nl_blocked', { ...funnelData, reason: t.type === 'checkbox' ? 'consent' : 'email' });
            }}
            className="max-w-lg mx-auto text-left"
          >
            <label htmlFor="nl-inline-email" className="block text-white font-semibold text-sm mb-2">
              {NL_EMAIL_LABEL[nlLang(lang)] ?? NL_EMAIL_LABEL.en}
            </label>
            {NL_LANG_NOTICE[nlLang(lang)] && (
              <p id="nl-inline-email-lang" className="text-white text-[13px] leading-relaxed -mt-1 mb-2">
                {NL_LANG_NOTICE[nlLang(lang)]}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Mail aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="nl-inline-email"
                  aria-describedby={NL_LANG_NOTICE[nlLang(lang)] ? 'nl-inline-email-lang' : undefined} autoComplete="email"
                  type="email"
                  required
                  value={email}
                  placeholder={NL_EMAIL_EXAMPLE[nlLang(lang)] ?? NL_EMAIL_EXAMPLE.en}
                  onFocus={trackStart}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 bg-white text-slate-900 border border-white rounded-full pl-11 pr-4 text-base placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-white/40 transition-shadow disabled:opacity-60"
                  disabled={status === 'loading'}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="h-14 shrink-0 bg-[#002F6C] hover:bg-[#001F4A] text-white font-bold px-7 rounded-full shadow-lg transition-colors text-base whitespace-nowrap inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === 'loading' ? t('newsletter.sending') : t('newsletter.submit')}
              </button>
            </div>
            <label className="mt-4 flex items-start gap-2.5 text-left text-white text-xs leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                checked={consented}
                onFocus={trackStart}
                onChange={(e) => setConsented(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#002F6C] focus:outline-none focus:ring-2 focus:ring-white"
              />
              <span>
                {consentCopy.consent}{' '}
                <a
                  href={withSlash(privacyHref)}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-white underline underline-offset-2"
                >
                  {consentCopy.privacy}
                </a>
              </span>
            </label>
          </form></>
        )}
        {status === 'error' && (
          <p className="text-white/90 text-sm mt-4">
            {t('newsletter.errorPrefix')} ({error}). {t('newsletter.errorRetry')}
          </p>
        )}
        <Erotinrivi className="text-white/70 text-xs mt-5 mx-auto w-fit max-w-full text-left" osat={erotinOsat(t('newsletter.trust'))} />
      </div>
    </section>
  )
}
