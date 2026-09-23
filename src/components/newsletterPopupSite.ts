import type { NewsletterPopupCopy, NewsletterPopupTheme } from '../shared/NewsletterPopup';

/**
 * laplandfood.com: uutiskirjepopupin oma väri ja teksti.
 *
 * Vesa 23.9.2026: "tekstit ja värimaailma sivustokohtaisiksi" → "kyllä, vie
 * kaikille". Kuva, lomake, nappi ja #LAPLAND-merkki pysyvät verkoston yhteisinä.
 * Väri = tämän sivuston oma pääväri, mitattu elävältä etusivulta 23.9.2026
 * (Suomen sininen #002F6C on sivun isoin pinta). Kontrasti tarkistettu: napin teksti ≥ 4,5:1,
 * kuvan rengas ≥ 3:1 korttia vasten.
 * Teksti = sivun oma aihe lukijan näkökulmasta, 12 kielellä natiivina.
 * 🔴 Ei hälytyksiä, ei lähetystahtia, ei "ensimmäisenä" (9.8.2026 lupauspurku):
 * uutiskirje lähtee vain kun on kerrottavaa. Otsikko tulee jaetusta komponentista.
 */
export const POPUP_THEME: NewsletterPopupTheme = {
  surface: '#002F6C',
  accent: '#F9A8D4',
  cta: '#DB2777',
  onCta: '#FFFFFF',
};

export const POPUP_COPY: NewsletterPopupCopy = {
  en: {
    description: 'Founder of LaplandVibes. Squeaky cheese, cloudberries, rieska flatbread and sautéed reindeer. I tell you what to taste in the north, where to find the ingredients and how the dishes turn out at home.',
  },
  fi: {
    description: 'LaplandVibesin perustaja. Leipäjuusto, lakat, rieska ja poronkäristys. Kerron, mitä pohjoisessa kannattaa maistaa, mistä raaka-aineet saa ja miten ruoat onnistuvat kotona.',
  },
  de: {
    description: 'Gründer von LaplandVibes. Brotkäse, Moltebeeren, Fladenbrot und Rentiergeschnetzeltes. Ich erzähle Ihnen, was Sie im Norden probieren sollten, wo Sie die Zutaten bekommen und wie die Gerichte zu Hause gelingen.',
  },
  ja: {
    description: 'LaplandVibes創業者。きゅっと鳴るパンチーズ、クラウドベリー、平焼きパン、トナカイのソテー。北の地で味わっておきたいもの、材料がどこで手に入るか、家庭でうまく作るコツをお届けします。',
  },
  es: {
    description: 'Fundador de LaplandVibes. Leipäjuusto, moras árticas, pan plano y reno salteado. Le cuento qué vale la pena probar en el norte, dónde conseguir los ingredientes y cómo hacer que los platos le salgan bien en casa.',
  },
  'pt-BR': {
    description: 'Fundador do LaplandVibes. Queijo que range, amora-ártica, pão achatado e rena salteada. Conto o que provar no norte, onde encontrar os ingredientes e como fazer os pratos darem certo em casa.',
  },
  'zh-CN': {
    description: 'LaplandVibes创始人。芬兰面包奶酪、云莓、薄饼和炒驯鹿肉。我来告诉你在芬兰北部该尝些什么、食材去哪里找，以及怎样在家把这些菜做好。',
  },
  ko: {
    description: 'LaplandVibes 창립자. 레이파유스토 치즈, 클라우드베리, 플랫브레드, 순록고기 볶음. 북부에서 무엇을 맛보면 좋은지, 재료는 어디서 구하는지, 집에서 제대로 만드는 법까지 알려드립니다.',
  },
  fr: {
    description: 'Fondateur de LaplandVibes. Leipäjuusto (fromage pain), plaquebières, pain plat rieska et émincé de renne. Je vous dis quoi goûter dans le Nord, où trouver les ingrédients et comment réussir ces plats chez vous.',
  },
  it: {
    description: 'Fondatore di LaplandVibes. Leipäjuusto, more artiche, pane piatto e renna saltata. Le spiego cosa vale la pena assaggiare al Nord, dove trovare gli ingredienti e come far riuscire i piatti a casa.',
  },
  nl: {
    description: 'Oprichter van LaplandVibes. Leipäjuusto (broodkaas), kruipbramen, platbrood en gebakken rendier. Ik vertel u wat u in het noorden moet proeven, waar u de ingrediënten vindt en hoe de gerechten thuis lukken.',
  },
  sv: {
    description: 'Grundare av LaplandVibes. Brödost, hjortron, rieska och renskav. Jag tipsar om vad du ska smaka uppe i norr, var du får tag på råvarorna och hur du lyckas med rätterna hemma.',
  },
};
