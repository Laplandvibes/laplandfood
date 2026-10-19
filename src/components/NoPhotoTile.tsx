import type { LucideIcon } from 'lucide-react';

/**
 * Kortin kuva-alue silloin, kun aitoa kuvaa ei ole (19.10.2026).
 *
 * Tekoälykuvat poistettiin korteista (Vesa 11.9.: "katso nyt noi ai generoidut jutut pois
 * sivuilta! laatu!"). Kolmeen korttiin ei löytynyt omaa kuvaa eikä avoimen lisenssin kuvaa,
 * joka näyttäisi kortin asian: lakkalikööri lasissa, poro mustikan kanssa ja maakuoppa.
 * Haettu: Commons, Flickr CC, Openverse, Finna, Pexels, Pixabay ja lokakuun reissun kuvat.
 * Verkoston linja on kuvake eikä tekoälykuva (CLAUDE.md "Mainos rakennetaan…", 14.9.).
 *
 * Kuvake on koriste: kortin otsikko kertoo saman asian, joten se piilotetaan ruudunlukijalta.
 */
export default function NoPhotoTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-white/60" strokeWidth={1.25} />
    </div>
  );
}
