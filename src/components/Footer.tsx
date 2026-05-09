import SharedFooter from '../../../shared/Footer'
import type { FooterDict } from '../../../shared/Footer'
import AffiliateDisclosure from './AffiliateDisclosure'
import { useTranslation } from 'react-i18next'
import { trackHubClick } from '../lib/analytics'

/**
 * laplandfood.com wrapper for the canonical 5-band Finnish-flag Footer (shared).
 * Adds a thin affiliate-disclosure band below the Footer copyright strip so
 * the FTC/DSA notice is visible on every page.
 */
export default function Footer() {
  const { t, i18n } = useTranslation('common')
  const tx = (key: string): string | undefined =>
    i18n.exists(`common:${key}`) ? (t(key) as string) : undefined

  const foodPillarLinks = [
    { name: tx('footer.foodPillars.fineDining')  ?? 'Fine Dining',  href: 'https://laplanddining.com' },
    { name: tx('footer.foodPillars.barsPubs')    ?? 'Bars & Pubs',  href: 'https://laplandbars.com' },
    { name: tx('footer.foodPillars.nightlife')   ?? 'Nightlife',    href: 'https://laplandnightlife.com' },
    { name: tx('footer.foodPillars.thingsToDo')  ?? 'Things to Do', href: 'https://laplandactivities.online' },
    { name: tx('footer.foodPillars.stays')       ?? 'Where to Stay',href: 'https://laplandstays.com' },
    { name: tx('footer.foodPillars.travelGuide') ?? 'Travel Guide', href: 'https://laplandvisit.com' },
  ]

  const dict: FooterDict = {
    networkBadge: tx('footer.networkBadge'),
    tagline: tx('footer.tagline'),
    groups: {
      stay:       tx('footer.groups.stay'),
      eatDrink:   tx('footer.groups.eatDrink'),
      do:         tx('footer.groups.do'),
      explore:    tx('footer.groups.explore'),
      essentials: tx('footer.groups.essentials'),
    },
    travelGuideKicker: tx('footer.travelGuideKicker'),
    about: {
      eyebrow: tx('footer.about.eyebrow'),
      body:    tx('footer.about.body'),
      badge:   tx('footer.about.badge'),
    },
    spottedError: {
      title: tx('footer.spottedError.title'),
      body:  tx('footer.spottedError.body'),
      cta:   tx('footer.spottedError.cta'),
    },
    partner: {
      title: tx('footer.partner.title'),
      body:  tx('footer.partner.body'),
      cta:   tx('footer.partner.cta'),
    },
    press: {
      title: tx('footer.press.title'),
      body:  tx('footer.press.body'),
      cta:   tx('footer.press.cta'),
    },
    affiliate: tx('footer.affiliate'),
    copyright: tx('footer.copyright'),
    websiteBy: tx('footer.websiteBy'),
    legal: {
      privacy: tx('footer.legal.privacy'),
      cookie:  tx('footer.legal.cookie'),
      terms:   tx('footer.legal.terms'),
      contact: tx('footer.legal.contact'),
    },
  }

  return (
    <>
      <SharedFooter
        pillarLinks={foodPillarLinks}
        onPillarClick={(name) => trackHubClick(name)}
        dict={dict}
      />
      <div className="bg-[#001F4A] py-3 px-5 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <AffiliateDisclosure variant="light" />
        </div>
      </div>
    </>
  )
}
