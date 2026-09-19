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
  'M248.7 36.2L253.2 37.8L255.5 42.3L275.4 50.0L281.2 65.1L267.4 82.3L266.5 90.0L271.4 94.5L256.3 105.0L267.5 108.6L265.1 116.1L257.0 129.8L263.9 152.8L282.8 160.3L292.4 178.5L302.1 186.6L299.3 198.9L277.1 231.7L274.7 240.8L282.9 256.0L290.9 279.8L298.7 293.0L305.1 320.7L304.8 324.4L301.9 322.6L296.1 325.2L296.5 329.6L293.7 336.9L294.0 346.3L289.7 352.6L297.1 354.9L297.6 361.3L290.6 365.2L290.8 374.4L295.7 383.5L305.3 384.9L307.0 393.3L300.5 398.0L303.8 404.6L302.8 409.9L317.8 422.4L318.3 434.2L308.6 449.7L301.1 454.8L315.1 472.7L336.2 490.1L346.8 511.1L337.4 538.6L321.4 558.8L278.7 623.8L267.2 634.0L262.2 643.3L255.1 648.7L238.4 671.8L236.6 670.0L236.4 674.2L228.8 676.5L223.7 674.6L221.4 669.1L216.1 672.3L214.1 678.9L212.5 676.5L205.7 679.9L200.8 678.5L200.2 676.3L203.6 668.3L208.2 670.0L205.5 664.9L199.8 674.4L200.4 679.2L198.7 682.2L188.0 679.9L189.8 686.5L187.8 689.0L181.9 681.6L184.2 685.0L184.3 692.4L179.5 687.5L182.2 690.9L178.6 692.0L176.5 688.8L177.8 685.6L176.9 684.3L171.9 692.2L163.7 692.4L162.1 694.0L163.5 696.2L159.8 698.3L146.5 700.6L146.2 705.0L143.0 709.5L141.3 709.7L138.8 704.0L123.4 711.4L112.8 712.0L115.9 707.2L116.0 704.1L107.8 719.8L98.0 722.1L107.9 714.4L110.2 707.5L107.0 713.9L103.6 714.1L103.6 711.0L108.0 706.4L102.0 706.4L100.1 704.6L101.8 700.6L96.9 698.9L97.7 694.4L103.0 685.3L88.4 694.5L84.7 692.3L90.0 682.2L79.8 682.7L70.1 673.5L67.3 673.3L67.9 676.8L66.2 676.1L66.8 666.8L60.1 674.4L59.7 670.7L55.5 670.0L53.5 664.5L54.4 657.5L52.6 650.1L55.9 629.7L59.1 620.0L58.1 606.4L56.5 603.6L62.4 603.9L58.5 596.7L55.0 580.5L51.2 576.6L50.5 572.7L54.2 560.6L53.9 555.5L52.9 549.4L46.4 542.4L46.8 536.0L45.0 532.7L46.2 520.9L54.0 514.5L56.0 507.5L55.8 502.4L62.9 503.6L58.2 497.0L57.5 491.0L61.8 492.2L68.5 487.8L68.8 491.3L70.9 492.8L81.5 486.7L82.1 482.2L77.3 473.8L80.3 469.5L83.2 473.2L88.8 458.0L91.4 457.9L92.9 463.0L94.3 462.8L97.7 457.8L98.3 450.9L109.7 444.4L111.2 441.5L111.6 434.1L117.8 433.0L119.2 427.8L127.1 419.1L129.2 411.2L139.1 401.8L139.9 395.2L144.6 387.1L144.8 383.0L160.4 375.4L164.6 381.9L167.0 381.9L168.3 380.9L168.4 376.2L163.3 371.8L170.8 372.2L165.5 358.0L168.1 341.6L166.8 334.8L159.9 328.0L148.4 325.1L145.2 320.1L145.1 316.9L149.0 308.7L141.3 317.4L134.3 316.0L127.2 292.4L121.2 287.7L118.9 272.1L125.8 263.8L126.1 251.2L129.5 247.3L116.9 223.1L117.9 216.2L122.7 212.5L122.6 205.5L112.9 202.2L115.1 188.6L114.4 175.2L119.4 169.2L111.8 163.1L102.5 146.5L95.5 139.6L73.3 133.4L68.9 127.2L56.6 119.9L45.5 107.1L40.2 105.2L41.5 100.9L39.4 97.7L31.2 94.0L35.7 91.5L44.9 95.7L46.4 90.7L44.1 83.6L52.4 75.9L62.8 78.7L81.8 108.6L83.3 117.7L87.6 115.8L102.4 118.7L106.4 123.2L120.4 117.6L124.3 109.6L128.5 109.4L139.3 117.7L150.8 121.1L156.0 126.5L160.8 122.8L164.0 110.5L170.3 105.4L175.8 105.9L179.7 98.8L178.3 80.7L185.3 58.0L185.0 52.4L197.1 40.4L199.5 35.1L209.7 33.4L217.2 36.4L231.7 25.5L241.1 24.1ZM95.5 693.4L96.2 700.8L95.9 702.3L93.0 708.6L90.0 708.5L89.1 710.0L89.1 708.5L88.3 707.0L86.8 708.6L85.3 708.9L85.4 704.0L84.0 701.5L83.8 698.5L84.8 694.1L88.7 695.1ZM81.7 689.6L81.4 691.1L80.1 690.7L78.0 692.4L78.2 690.5L77.9 690.3L76.0 689.8L77.0 690.3L76.2 691.5L73.9 690.6L73.9 689.1L74.6 687.9L78.1 687.9ZM95.8 711.8L102.6 712.2L102.0 715.7L98.2 715.8L96.2 714.4L94.9 711.9L95.5 710.5ZM45.5 486.2L51.6 489.0L53.8 487.9L55.0 488.2L55.4 491.9L52.1 494.8L50.3 495.4L50.3 494.7L48.5 492.3L48.2 493.4L47.4 493.2L46.0 489.2ZM150.3 373.3L146.5 372.1L145.5 370.1L145.0 367.8L147.7 365.2L152.4 364.2L158.9 367.1L153.5 369.2L152.7 372.0ZM96.9 451.0L96.8 452.9L94.0 452.0L92.1 452.7L91.1 451.4L95.0 445.7L97.6 446.4L98.2 449.5ZM84.5 709.1L82.6 709.5L81.9 705.5L82.0 704.3L83.5 703.2L84.5 704.0L84.9 705.5ZM120.8 713.8L112.1 715.6L111.2 714.9L111.6 713.9L116.0 711.6L121.5 713.5ZM71.4 686.9L69.0 686.1L65.9 683.6L65.7 682.5L66.3 677.2L68.9 678.7L70.0 680.6L71.8 684.5L71.8 686.4ZM60.3 702.2L58.1 702.5L57.1 701.1L57.6 699.4L59.1 697.7L62.0 698.3L61.4 701.7ZM64.7 701.3L63.1 701.0L63.7 696.4L67.7 695.8L68.6 696.8L68.0 698.3ZM71.9 700.1L70.5 699.7L70.1 697.3L72.8 694.9L73.6 695.0L73.9 695.9L72.8 699.1ZM82.9 689.3L80.9 687.3L81.2 686.1L83.3 685.0L85.6 686.9ZM77.1 487.3L74.1 486.3L73.1 484.4L77.4 483.4L77.9 484.8ZM64.8 675.1L62.8 678.1L64.1 673.6L65.1 673.4ZM57.1 673.6L55.6 677.0L52.5 673.8L52.4 672.0L52.9 671.1L54.5 671.1ZM177.3 692.9L176.1 695.4L175.0 694.7L174.0 690.8L174.4 689.1L175.0 689.0L177.2 691.8ZM52.5 485.6L49.9 483.1L51.9 481.4L54.1 482.1ZM51.5 667.3L51.5 670.8L49.8 668.7L49.3 666.8L50.9 665.1ZM52.6 649.3L50.8 649.2L50.3 644.4L50.5 643.8L51.7 643.2L53.4 646.3ZM52.6 676.2L51.1 676.4L49.7 671.4L51.2 672.2Z';

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
