import { Link } from 'react-router-dom';
import * as IMG from './../../assets';

export default function Logo({size}: {size?: string}) {
  const sizeClass = size === 'small' ? 'w-6 h-6' : 'w-12 h-12';
  return (
    <Link to="/" className="flex items-center flex-col">
      <img src={IMG.ChainCart} alt="Logo" className={`${sizeClass}`} />
    </Link>
  );
}
