import DishPage from './DishPage';
import { PORONKARISTYS } from '../data/dishes';

/** /poronkaristys — poronkäristys eli ohueksi vuoltu, haudutettu poronliha. */
export default function Poronkaristys() {
  return <DishPage cfg={PORONKARISTYS} />;
}
