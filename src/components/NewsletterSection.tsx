import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocale } from '../i18n/useLocale'
import { trackNewsletterSignup } from '../lib/analytics'
import { localePrefix } from '../i18n/config'
import FounderByline from '../shared/FounderByline';

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
      'Aceito receber a newsletter da LaplandVibes no e-mail informado, com dicas de viagem, informações de temporada e ofertas. Tenho 18 anos ou mais.',
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
        <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto mb-8">
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
          <form
            onSubmit={onSubmit}
            onInvalidCapture={(e) => {
              if (blockedTracked.current) return;
              blockedTracked.current = true;
              window.setTimeout(() => { blockedTracked.current = false; }, 400);
              const t = e.target as HTMLInputElement;
              track('nl_blocked', { ...funnelData, reason: t.type === 'checkbox' ? 'consent' : 'email' });
            }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              aria-label={t('newsletter.emailPlaceholder')}
              placeholder={t('newsletter.emailPlaceholder')}
              value={email}
              onFocus={trackStart}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full bg-white/95 px-5 py-3.5 text-base text-[#002F6C] placeholder-[#002F6C]/40 focus:outline-none focus:ring-2 focus:ring-white"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-[#002F6C] hover:bg-[#001F4A] text-white font-semibold px-7 py-3.5 transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? t('newsletter.sending') : t('newsletter.submit')}
            </button>
            <label className="basis-full flex items-start gap-2.5 text-left text-white/85 text-xs leading-relaxed cursor-pointer">
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
                  href={privacyHref}
                  target="_blank"
                  rel="noopener"
                  className="underline underline-offset-2 hover:text-white"
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
        <p className="text-white/70 text-xs mt-5">
          {t('newsletter.trust')}
        </p>
      </div>
    </section>
  )
}
