'use client';

import Slider from '../components/Slider';
import useGetQuery from '@/data/query/useGetQuery';
import { useEffect, useState } from 'react';
import Card from '@/components/card/Card';
import { ItemTypes } from '@/@types/types';
import { GiCargoShip } from 'react-icons/gi';
import { MdOutlineSecurity } from 'react-icons/md';
import { MdOutlinePayment } from 'react-icons/md';
import { FaRegClock } from 'react-icons/fa';

export default function Home() {
  const [getHeight, setHeight] = useState('100vh');

  useEffect(() => {
    const size = window.innerWidth;
    if (size < 769) {
      setHeight('25vh');
    }
  }, []);

  const data = useGetQuery('slider', '/slider') || [];

  const item: ItemTypes = useGetQuery('item', '/item') || [];

  const bestselling: ItemTypes =
    useGetQuery('bestselling', '/bestselling') || [];

  const titles = Object.values(bestselling).map((v) => v.title);
  const filta = Object.values(item)
    .filter((v) => !titles.includes(v.title))
    .slice(0, 20);

  return (
    <>
      <section className="slider">
        {data.length > 0 ? (
          <Slider data={data} width="100%" height={getHeight} />
        ) : (
          ''
        )}
      </section>
      <section className="home">
        <div className="container item-wrapper">
          <h2>Trending & Best Selling</h2>

          <div>
            {bestselling.map((v, k: number) => (
              <Card
                key={k}
                id={v.id}
                title={v.title}
                img={v.image}
                link={`/single/${v.id}`}
                price={v.price}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="collections">
        <div className="container">
          <h2>Popular Collections</h2>

          <div>
            {filta.map((v, k: number) => (
              <Card
                key={k}
                id={v.id}
                title={v.title}
                img={v.image}
                link={`/single/${v.id}`}
                price={v.price}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div>
            <div>
              <GiCargoShip />
            </div>
            <div>
              <strong>Worldwide Delivery</strong>
              <p>We ship to anywhere in the world</p>
            </div>
          </div>

          <div>
            <div>
              <MdOutlineSecurity />
            </div>
            <div>
              <strong>Secure SSL</strong>
              <p>256-Bit Payment Protection</p>
            </div>
          </div>

          <div>
            <div>
              <MdOutlinePayment />
            </div>
            <div>
              <strong>Paypal/Credit Card/Mobile money</strong>
              <p>Pay with Multiple options</p>
            </div>
          </div>

          <div>
            <div>
              <FaRegClock />
            </div>
            <div>
              <strong>24/7 Support</strong>
              <p>Our support team is always available</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
