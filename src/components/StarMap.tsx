/**
 * StarMap — Suomen siluetti, jossa vuoden 2026 tähtiravintolakaupungit (etelä) ja
 * Lapin kolme salia (pohjoinen) ovat samalla kartalla. Piirtää näkyviin sivun
 * ydinväitteen: tähdet ovat etelässä, meidän salimme 800 km pohjoisempana.
 *
 * Miksi kartta eikä kuva (Vesa 17.9.2026: "eikö nämä ole aika tylsän näköiset?"):
 * korteissa ei ole kuvia tarkoituksella — tekoälykuva oikean ravintolan salista on
 * väärä väite, eikä omia tai lisensoituja kuvia näistä yhdestätoista salista ole.
 * "Emotion" tulee aidosta aineesta (feedback 11.9.): tämä kartta on oikeaa tietoa,
 * ei koristepaneeli.
 *
 * 🔴 Sama karttaperhe kuin hubin FinlandLocatorMap: kehys, INSET ja GEO_BOUNDS ovat
 * identtiset, ja FINLAND_PATH on ESIPROJISOITU merkkijono, jonka kirjoittaa
 * `node scripts/gen_finland_silhouette.mjs` (juuresta) — tämä tiedosto on sen
 * kohdelistalla. Älä muokkaa polkua tai VB_W:tä käsin: VB_W on kalibrointi
 * (phi0 = 65 °N), ei makuasia. Koordinaatit tarkistaa `scripts/audit_map_geography.mjs`.
 */

const VB_W = 376;
const VB_H = 760;

const GEO_BOUNDS = { north: 70.15, south: 59.6, west: 20.4, east: 31.7 };
const INSET = { top: 20, bottom: 24, left: 26, right: 26 };

/** Julkaistut desimaaliasteet, portti audit_map_geography.mjs (gazetteer, 5 km). */
export const DEST_COORDS: Record<string, { lat: number; lng: number }> = {
  helsinki: { lat: 60.1699, lng: 24.9384 },
  turku: { lat: 60.4518, lng: 22.2666 },
  porvoo: { lat: 60.3932, lng: 25.6651 },
  rovaniemi: { lat: 66.5039, lng: 25.7294 },
  inari: { lat: 68.9058, lng: 27.0286 },
};

function project(lat: number, lng: number): { x: number; y: number } {
  const left = INSET.left;
  const right = VB_W - INSET.right;
  const top = INSET.top;
  const bottom = VB_H - INSET.bottom;
  const ty = (GEO_BOUNDS.north - lat) / (GEO_BOUNDS.north - GEO_BOUNDS.south);
  const tx = (lng - GEO_BOUNDS.west) / (GEO_BOUNDS.east - GEO_BOUNDS.west);
  return { x: left + tx * (right - left), y: top + ty * (bottom - top) };
}

// Kirjoitetaan generaattorilla — ks. tiedoston alku.
const FINLAND_PATH =
  'M242.7 23.9L216.1 36.3L199.9 34.3L183.8 52.6L185.8 56.9L181.8 60.6L182.0 71.0L177.7 84.1L180.0 97.3L175.8 105.3L162.5 111.5L161.2 122.3L155.1 128.3L125.5 109.0L119.9 118.1L105.5 123.3L82.6 117.3L76.9 101.1L61.2 79.2L51.1 76.9L43.8 82.1L46.4 90.8L45.0 95.5L35.1 89.9L30.2 94.0L73.0 133.3L96.1 140.0L104.8 149.4L105.1 156.8L109.1 155.5L119.0 168.7L114.1 177.5L116.5 191.5L112.3 200.1L122.4 204.6L121.6 214.4L116.9 216.0L116.2 221.8L129.0 245.9L125.6 249.9L126.1 261.7L119.2 270.3L120.4 286.0L126.8 290.6L132.6 306.8L134.9 329.3L139.9 320.8L165.0 337.5L163.5 358.6L159.4 360.9L167.2 366.2L162.5 369.6L167.7 377.2L160.4 374.2L144.4 380.8L144.9 387.6L138.9 390.1L138.3 400.5L116.0 424.1L117.4 432.3L111.6 430.7L111.3 440.7L101.7 440.3L103.3 442.3L100.5 445.8L92.0 441.9L85.9 462.5L73.7 475.0L76.4 478.1L67.5 484.1L65.3 481.6L67.1 474.4L63.9 472.7L56.7 489.2L55.6 480.5L43.3 480.1L46.6 492.6L53.2 496.4L45.4 505.3L47.7 523.2L44.6 530.4L47.2 532.9L44.1 536.4L47.0 538.2L48.5 551.1L52.8 553.4L50.9 574.3L55.4 581.4L51.4 583.2L58.7 590.6L58.3 595.4L54.0 592.3L53.1 598.2L60.3 606.2L55.8 606.3L59.8 610.9L53.8 617.6L56.7 623.7L53.2 622.6L53.7 629.9L51.4 631.1L55.2 633.7L47.8 641.2L51.5 645.5L43.2 651.0L51.5 662.7L46.9 661.6L50.2 664.1L47.4 674.9L51.6 676.7L47.2 678.0L48.5 694.1L44.0 700.0L53.8 697.9L52.0 704.2L56.5 701.9L55.9 707.2L59.1 709.7L63.4 702.9L65.3 707.6L67.8 701.7L79.3 700.8L78.0 706.1L81.7 709.1L81.1 723.5L95.3 712.7L98.5 718.1L93.5 721.2L100.0 725.8L117.5 722.5L137.0 708.0L140.0 715.4L151.2 703.0L182.6 697.7L211.8 682.0L222.8 680.8L221.3 686.9L215.5 687.7L215.3 693.0L231.2 689.3L240.3 668.1L279.6 622.5L319.9 558.9L334.7 542.9L346.6 511.5L337.2 490.4L315.1 473.8L300.7 453.9L309.1 449.7L317.3 428.8L315.1 419.7L302.7 409.7L301.1 398.0L305.1 394.2L302.5 387.2L304.0 385.1L293.8 384.0L289.8 370.3L290.5 365.3L298.0 362.3L296.2 359.3L298.0 355.5L290.0 351.3L297.0 331.6L293.1 326.3L305.2 324.0L299.2 293.1L273.6 237.4L299.4 198.3L301.8 188.2L291.5 179.2L282.1 161.0L262.4 152.7L256.6 129.2L266.9 107.2L256.0 103.6L270.7 94.6L267.0 90.5L267.7 82.8L282.2 65.6L276.4 50.9L255.5 42.5Z';

export interface StarMapPin {
  /** Avain DEST_COORDS-tauluun. */
  slug: keyof typeof DEST_COORDS | string;
  /** Kaupungin nimi sivun kielellä (tulee lokaalidatasta, ei tästä tiedostosta). */
  label: string;
  /** Tähtiravintoloiden tai salien määrä tässä kaupungissa. */
  count: number;
}

export interface StarMapProps {
  stars: StarMapPin[];
  rooms: StarMapPin[];
  legendStars: string;
  legendRooms: string;
  caption: string;
  ariaLabel: string;
  /** Helsinki→Rovaniemi-viivan teksti, esim. "800 km". */
  distance: string;
  className?: string;
}

/** Nimilapun paikka neulan suhteen: Helsinki ja Porvoo ovat 50 km päässä toisistaan,
 *  joten "aina oikealle" painaisi ne päällekkäin. */
const LABEL_SIDE: Record<string, { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }> = {
  // Helsinki alle (merelle), Turku ylle (vasemmalla ei ole tilaa: neula on 80 yksikköä
  // kehyksen reunasta), Porvoo oikealle. Mitattu viewBox-yksiköissä, ei silmällä.
  helsinki: { dx: 0, dy: 30, anchor: 'middle' },
  porvoo: { dx: 13, dy: 7, anchor: 'start' },
  turku: { dx: 0, dy: -16, anchor: 'middle' },
  rovaniemi: { dx: 13, dy: 7, anchor: 'start' },
  inari: { dx: 13, dy: 7, anchor: 'start' },
};

// SVG skaalautuu 376 yksiköstä ~230 px:iin, joten 13 yksikön fontti olisi 8 px.
const LABEL_PX = 22;
const PIN_R = 8;

const PINK = '#EC4899';
const BLUE = '#002F6C';

export default function StarMap({ stars, rooms, legendStars, legendRooms, caption, ariaLabel, distance, className = '' }: StarMapProps) {
  const hel = DEST_COORDS.helsinki;
  const rov = DEST_COORDS.rovaniemi;
  const hp = project(hel.lat, hel.lng);
  const rp = project(rov.lat, rov.lng);
  const mid = { x: (hp.x + rp.x) / 2, y: (hp.y + rp.y) / 2 };

  const renderPin = (pin: StarMapPin, color: string) => {
    const c = DEST_COORDS[pin.slug];
    if (!c) return null;
    const { x, y } = project(c.lat, c.lng);
    const side = LABEL_SIDE[pin.slug] ?? { dx: 11, dy: 4, anchor: 'start' as const };
    return (
      <g key={pin.slug}>
        <circle cx={x} cy={y} r={PIN_R * 2.2} fill={color} opacity={0.14} />
        <circle cx={x} cy={y} r={PIN_R} fill={color} stroke="#FFFFFF" strokeWidth={2.5} />
        <text
          x={x + side.dx}
          y={y + side.dy}
          textAnchor={side.anchor}
          fill={BLUE}
          fontSize={LABEL_PX}
          fontWeight={600}
          fontFamily="'DM Sans', system-ui, sans-serif"
        >
          {pin.label}
          <tspan fill={color} fontWeight={700}> · {pin.count}</tspan>
        </text>
      </g>
    );
  };

  return (
    <figure className={`m-0 ${className}`}>
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-auto h-80 sm:h-96 lg:h-[460px] max-w-full"
          role="img"
          aria-label={ariaLabel}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={FINLAND_PATH}
            fill="rgba(0,47,108,0.06)"
            stroke="rgba(0,47,108,0.5)"
            strokeWidth={1.4}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Helsinki → Rovaniemi: sivun ydinväite yhtenä viivana. */}
          <line x1={hp.x} y1={hp.y} x2={rp.x} y2={rp.y} stroke={BLUE} strokeWidth={2} strokeDasharray="4 8" strokeLinecap="round" opacity={0.6} />
          <text
            x={mid.x + 12}
            y={mid.y + 7}
            fill={BLUE}
            fontSize={LABEL_PX}
            fontWeight={700}
            fontFamily="'DM Sans', system-ui, sans-serif"
          >
            {distance}
          </text>
          {rooms.map((p) => renderPin(p, BLUE))}
          {stars.map((p) => renderPin(p, PINK))}
        </svg>
      </div>
      <figcaption className="mt-4">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs font-semibold text-[#002F6C]/80 list-none p-0 m-0">
          <li className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-vibe-pink" aria-hidden="true" /> {legendStars}
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#002F6C]" aria-hidden="true" /> {legendRooms}
          </li>
        </ul>
        <p className="mt-2 text-center text-sm text-[#002F6C]/75 leading-relaxed">{caption}</p>
      </figcaption>
    </figure>
  );
}
