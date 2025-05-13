'use client';

import { ItemTypes } from '@/@types/types';
import Card from '@/components/card/Card';
import Gallery from '@/components/Gallery';
import useGetQuery from '@/data/query/useGetQuery';
import { addLastwatched } from '@/data/redux/features';
import useSelectors from '@/data/redux/useSelectors';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const Singlepage = () => {
  const item: ItemTypes = useGetQuery('item', '/item') || [];
  const bestselling: ItemTypes =
    useGetQuery('bestselling', '/bestselling') || [];

  const obj = [...item, ...bestselling];

  const params = useParams();
  const router = useRouter();

  const id = params?.singlepageid;

  const filta = Object.values(obj).filter((v) => v.id === id);

  useEffect(() => {
    if (filta.length < 1) {
      router.push('/');
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const bjs = {
      [filta[0]?.id]: {
        id: filta[0]?.id,
        title: filta[0]?.title,
        img: filta[0]?.image,
        link: `/single/${filta[0]?.id}`,
        price: filta[0]?.price,
      },
    };

    dispatch(addLastwatched(bjs));
  },[]);

  const slct = useSelectors();
  const lastw = Object.values(slct?.lastwatched)
    .filter((v) => v.id !== undefined)
    .map((v, k: number) => {
      return (
        <Card
          key={k}
          id={v?.id}
          title={v.title}
          img={v?.img}
          link={`/single/${v?.id}`}
          price={v?.price}
        />
      );
    });

  return (
    <section className="single-page">
      <Gallery data={filta} />

      <div className="container product-details">
        <div>
          <div>
            <div>Product description</div>
            <div>{filta[0]?.desc}</div>
          </div>
          <div
            style={{
              backgroundImage: `url(${filta[0]?.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
            }}
          ></div>
        </div>
      </div>

      <div className="container last-watched">
        <h3>Last watched</h3>
        <div>{lastw}</div>
        <div></div>
      </div>
    </section>
  );
};

export default Singlepage;
