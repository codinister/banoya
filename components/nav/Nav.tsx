'use client';

import useGetQuery from '@/data/query/useGetQuery';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cart from './Cart';
import { MdOutlineShoppingBag } from 'react-icons/md';
import Searchbox from '../Searchbox';

const Nav = () => {
  const [toggle, setToggle] = useState('hide');
  useEffect(() => {
    window.addEventListener('scroll', staticnav);
    return () => window.removeEventListener('scroll', staticnav);
  }, []);

  const staticnav = () => {
    const scroll = window.scrollY;
    const scrl = Math.floor(scroll);

    if (scrl > 150) {
      document.querySelector('nav')?.classList.add('stickynav');
    } else {
      document.querySelector('nav')?.classList.remove('stickynav');
    }
  };

  const cont = useGetQuery('/contact', 'contact') || [];
  const path = usePathname();

  return (
    <section className="navbar">
      <section className="topbar">
        <div className="container">
          <div>
            <a target="_blank" href={cont[0]?.facebook}>
              <FaFacebook />
            </a>
            <a target="_blank" href={cont[0]?.twitter}>
              <FaXTwitter />
            </a>
            <a target="_blank" href={cont[0]?.instagram}>
              <FaInstagram />
            </a>
          </div>
          <div>
            <span>
              <FaPhoneAlt /> {cont[0]?.phone1}
            </span>
            <span>
              <MdOutlineEmail /> {cont[0]?.email}
            </span>
          </div>
        </div>
      </section>

      <nav className="navbar">
        <div className="mob-nav">
          <div>
            <Image
              alt="Hamburger"
              src="/hamburger.jpg"
              width="30"
              height="30"
              className="hamburger"
              onClick={() => setToggle('show')}
            />
          </div>
          <div>
            <Searchbox />
          </div>

          <div className="cart-bxu">
            <span>
              <Cart />
            </span>{' '}
          </div>
        </div>

        <div className={`container nav-box1 ${toggle}`}>
          <div>
            {cont[0] ? (
              <Link href="/">
                <Image
                  src={cont[0]?.comp_logo}
                  alt="logo"
                  width="250"
                  height="70"
                  onClick={() => setToggle('hide')}
                />
              </Link>
            ) : (
              ''
            )}
          </div>

          <div>
            <Searchbox />
          </div>

          <div>
            <div>
              <Link
                href="/shop?p=1"
                onClick={() => setToggle('hide')}
                className={path === '/shop' ? 'active' : ''}
              >
                <MdOutlineShoppingBag />
                Shop
              </Link>
            </div>
            <div className="cart-bxu">
              <span>
                <Cart />
              </span>{' '}
              <span>Cart</span>
            </div>

            <div className="mobile-contact-box">
              <div>
                <span>
                  <FaPhoneAlt /> {cont[0]?.phone1}
                </span>
                <span>
                  <MdOutlineEmail /> {cont[0]?.email}
                </span>
              </div>

              <div>
                <a href={cont[0]?.facebook}>
                  <FaFacebook />
                </a>
                <a href={cont[0]?.twitter}>
                  <FaXTwitter />
                </a>
                <a href={cont[0]?.instagram}>
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`container nav-box2 ${toggle}`}
          onClick={() => setToggle('hide')}
        ></div>
      </nav>
    </section>
  );
};

export default Nav;
