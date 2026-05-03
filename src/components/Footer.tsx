import SharedFooter from '../../../shared/Footer'
import AffiliateDisclosure from './AffiliateDisclosure'
import { trackHubClick } from '../lib/analytics'

/**
 * laplandfood.com wrapper for the canonical 5-band Finnish-flag Footer (shared).
 * Adds a thin affiliate-disclosure band below the Footer copyright strip so
 * the FTC/DSA notice is visible on every page.
 */
const foodPillarLinks = [
  { name: 'Fine Dining', href: 'https://laplanddining.com' },
  { name: 'Bars & Pubs', href: 'https://laplandbars.com' },
  { name: 'Nightlife', href: 'https://laplandnightlife.com' },
  { name: 'Things to Do', href: 'https://laplandactivities.online' },
  { name: 'Where to Stay', href: 'https://laplandstays.com' },
  { name: 'Travel Guide', href: 'https://laplandvisit.com' },
]

export default function Footer() {
  return (
    <>
      <SharedFooter
        pillarLinks={foodPillarLinks}
        onPillarClick={(name) => trackHubClick(name)}
      />
      <div className="bg-[#001F4A] py-3 px-5 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <AffiliateDisclosure variant="light" />
        </div>
      </div>
    </>
  )
}
