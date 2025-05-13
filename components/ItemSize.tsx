import { addToCart } from '@/data/redux/features';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CiWarning } from 'react-icons/ci';


type ItemSize = {
  id: string; 
  obj: object
}
const ItemSize = ({ id, obj }: ItemSize) => {

  const dispatch = useDispatch();
  const [cartValue, setCartValue] = useState(true);

  const handleClick = (size: string) => {
    const cart = Object.values(obj).reduce((a, b) => {
      if (b.id === id) {
        a[id] = {
          ...b,
          size,
        };
      }

      return a;
    }, {});

    if (Object.values(cart).length > 0) {
      setCartValue(true);
      dispatch(addToCart(cart));

    } else {
      setCartValue(false);
    }

  };


  const sizes = Object.values(obj).filter((v) => v.id === id)[0]?.size;

  return (
    <>
      {cartValue ? (
        ''
      ) : (
        <div className="item-warning">
          <CiWarning />
          Add the item to cart{' '}
        </div>
      )}
      <div className="sizes-btn">
        <button
          className={sizes === 'M' ? 'btn-active' : ''}
          onClick={() => handleClick('M')}
        >
          M
        </button>
        <button
          className={sizes === 'L' ? 'btn-active' : ''}
          onClick={() => handleClick('L')}
        >
          L
        </button>
        <button
          className={sizes === 'XL' ? 'btn-active' : ''}
          onClick={() => handleClick('XL')}
        >
          XL
        </button>
        <button
          className={sizes === 'XXL' ? 'btn-active' : ''}
          onClick={() => handleClick('XXL')}
        >
          XXL
        </button>
      </div>
    </>
  );
};

export default ItemSize;
