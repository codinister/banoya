'use client';
import useSelectors from '@/data/redux/useSelectors';
import { IoCartOutline } from 'react-icons/io5';
import CartItems from './CartItems';
import { useState } from 'react';

const Cart = () => {
  const obj = useSelectors();
  const data = Object.values(obj.cart);
  const val = data.length;

  const [show, setShow] = useState('hide');

  const handleHide = () => {
    setShow('hide');
  };

  const handleShow = () => {
    setShow('show');
  };

  return (
    <>
      <div className="cart">
        <IoCartOutline />
        {val > 0 ? (
          <button onClick={handleShow} className="cart-total">
            {val}
          </button>
        ) : (
          ''
        )}
      </div>

      <CartItems handleHide={handleHide} tdisplay={show} />
    </>
  );
};

export default Cart;
