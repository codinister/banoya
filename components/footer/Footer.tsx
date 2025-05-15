'use client';

import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { MdOutlineContactMail } from 'react-icons/md';
import { IoMdBook } from 'react-icons/io';
import useGetQuery from '@/data/query/useGetQuery';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const cont = useGetQuery('/contact', 'contact') || [];

  const parentVariant = {
    start: {
      opacity: 0,
    },
    end: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childrenVariant = {
    start: {
      opacity: 0,
    },
    end: {
      opacity: 1,
    },
  };

  return (
    <footer>
      <div className="container">
        <div>
          <h3>Contact Info</h3>

          <motion.ul
            variants={parentVariant}
            initial="start"
            whileInView="end"
            viewport={{ amount: 'all' }}
          >
            <motion.li variants={childrenVariant}>
              <FaPhoneAlt /> {cont[0]?.phone1}
            </motion.li>
            <motion.li variants={childrenVariant}>
              <MdOutlineEmail /> {cont[0]?.email}
            </motion.li>
          </motion.ul>
        </div>
        <div>
          <h3>Useful Links</h3>
          <motion.ul
            variants={parentVariant}
            initial="start"
            whileInView="end"
            viewport={{ amount: 'all' }}
          >
            <motion.li variants={childrenVariant}>
              <Link href="/">
                <IoHomeOutline /> Home
              </Link>
            </motion.li>
            <motion.li variants={childrenVariant}>
              <Link href="/">
                <MdOutlineShoppingCart /> Shop
              </Link>
            </motion.li>
            <motion.li variants={childrenVariant}>
              <Link href="/">
                <MdOutlineContactMail /> Contact
              </Link>
            </motion.li>
            <motion.li variants={childrenVariant}>
              <Link href="/">
                <IoMdBook /> Terms & Condition{' '}
              </Link>
            </motion.li>
          </motion.ul>
        </div>
        <div>
          <h3>Follow Us</h3>

          <motion.div
            variants={parentVariant}
            initial="start"
            whileInView="end"
            viewport={{ amount: 'all' }}
          >
            <motion.a variants={childrenVariant} href={cont[0]?.facebook}>
              <FaFacebook />
            </motion.a>
            <motion.a variants={childrenVariant} href={cont[0]?.twitter}>
              <FaXTwitter />
            </motion.a>
            <motion.a variants={childrenVariant} href={cont[0]?.instagram}>
              <FaInstagram />
            </motion.a>
          </motion.div>

          {cont[0] ? (
            <Image src={cont[0]?.comp_logo} alt="logo" width="70" height="70" />
          ) : (
            ''
          )}
        </div>
      </div>
      <motion.div
        className="container"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
          transition: {
            delay: 1,
            duration: 1,
          },
        }}
        viewport={{ amount: 'all' }}
      >
        &copy; Copyright - BANOYA COUTURE Powered by Codenesta
      </motion.div>
    </footer>
  );
};

export default Footer;
