'use client';

import format_number from '@/utils/format_number';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/data/redux/features';
import useGetCurrency from '@/utils/useGetCurrency';
import useSelectors from '@/data/redux/useSelectors';

type CardType = {
  id: string;
  title: string;
  img: string;
  price: string;
  link: string;
};

const Card = ({ title, img, link, price, id }: CardType) => {


  const dispatch = useDispatch();
  const obj = useSelectors();
  const { curr, item_price } = useGetCurrency(price);
  const btn = Object.keys(obj.cart).includes(id);

  const handleClick = () => {
    const bj = {
      [id]: {
        title,
        img,
        link,
        price,
        id,
        qty: 1, 
        total: Number(price),
        size: ''
      },
    };
    dispatch(addToCart(bj));
  };

  const BtnEnabled = () => {
    return (
      <button className="enabled-btn" onClick={handleClick}>
        Add to cart
      </button>
    );
  };

  const BtnDisabled = () => {
    return (
      <button className="disabled-btn" onClick={handleClick}>
      Add to cart
      </button>
    );
  };

  const router = useRouter();

  const subt = Number(title?.length) < 30 ? title : title.slice(0, 5) + '...';

  const res = item_price.toString();

  return (
    <div className="card">
      <div
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        {' '}
        <div onClick={() => router.push(link)}></div>
      </div>

      <h4 title={title}>{subt}</h4>
      
      <div>
        <div>
          <h4>
            {curr}
            {format_number(res)}
          </h4>
        </div>
        <div>{btn ? <BtnDisabled /> : <BtnEnabled />}</div>
      </div>
    </div>
  );
};

export default Card;
