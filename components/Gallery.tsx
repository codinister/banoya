import { ItemTypes } from '@/@types/types';
import { addToCart } from '@/data/redux/features';
import useSelectors from '@/data/redux/useSelectors';
import useGetCurrency from '@/utils/useGetCurrency';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsBasket } from 'react-icons/bs';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { GiAlarmClock } from 'react-icons/gi';
import { GiAnticlockwiseRotation } from 'react-icons/gi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import ItemSize from './ItemSize';

type galleryType =
  | {
      image: string;
    }[]
  | string;

const Gallery = ({ data }: { data: ItemTypes }) => {
  const arr: ItemTypes = [...data];
  const [img, setImg] = useState('');

  const dispatch = useDispatch();
  const { curr, item_price } = useGetCurrency(arr[0]?.price);

  const slct = useSelectors();


  const btn = Object.keys(slct.cart).includes(arr[0]?.id);

  const galleryArray: galleryType = arr[0]?.gallery
    ? arr[0]?.gallery
    : [{ image: arr[0]?.image }];

  const handleClick = () => {
    const bj = {
      [arr[0]?.id]: {
        id: arr[0]?.id,
        title: arr[0]?.title,
        img: arr[0]?.image,
        link: `/single/${arr[0]?.id}`,
        price: arr[0]?.price,
        size: '',
      },
    };
    dispatch(addToCart(bj));
  };

  return (
    <div className="gallery">
      <div>
        {Object.values(galleryArray).map((v, k) => (
          <div
            key={k}
            onClick={() => setImg(v?.image)}
            style={{
              backgroundImage: `url(${v?.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              height: '10rem',
            }}
          ></div>
        ))}
      </div>
      <div
        style={{
          backgroundImage: `url(${img ? img : arr[0]?.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      ></div>
      <div>
        <h2>{arr[0]?.title}</h2>
        <h3>
          {curr} {item_price}
        </h3>

   
          <ItemSize id={arr[0]?.id} obj={slct.cart} />
    

        <p>Order now, we will ship it within 24 hours!</p>

        {btn ? (
          ''
        ) : (
          <button className="add-to-basket" onClick={handleClick}>
            <span>Add to basket</span> <BsBasket />
          </button>
        )}

        <div className="shipping-details">
          <div>
            <span>
              <LiaShippingFastSolid />
            </span>
            <span>Free shipping from 100 €</span>
          </div>
          <div>
            <span>
              <GiAlarmClock />
            </span>
            <span>Shipping within 24h</span>
          </div>
          <div>
            <span>
              <GiAnticlockwiseRotation />
            </span>
            <span>Up to 100 days for product return</span>
          </div>
          <div>
            <span>
              <RiSecurePaymentLine />
            </span>
            <span>Secure payments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
