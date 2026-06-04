'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NAV_ITEMS } from './constants';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="py-2 px-7 border-b border-stroke flex justify-between bg-primary" id="header">
      <div className='w-fit'>
        <Image src="/images/logo.png" alt="logo" width={50} height={50}/>
      </div>
      <nav className="flex items-center justify-center gap-6">
        {NAV_ITEMS.map(
          ({ label, href }) =>
            !!href && (
              <Link key={label} href={href}>
                <span
                  className={`capitalize text-h3 p-1 ${pathname === href ? 'text-primary' : 'text-secondary'}`}
                >
                  {label}
                </span>
              </Link>
            ),
        )}
      </nav>
    </header>
  );
};

export default Header;
