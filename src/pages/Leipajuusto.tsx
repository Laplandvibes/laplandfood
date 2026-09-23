import DishPage from './DishPage';
import { LEIPAJUUSTO } from '../data/dishes';

/** /leipajuusto — leipäjuusto eli juustoleipä, pilkulliseksi paistettu tuorejuusto. */
export default function Leipajuusto() {
  return <DishPage cfg={LEIPAJUUSTO} />;
}
