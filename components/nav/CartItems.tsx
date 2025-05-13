import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Cartlist from './Cartlist';

type CartItemsType = {
  handleHide: () => void;
  tdisplay: string;
};
const CartItems = ({ handleHide, tdisplay }: CartItemsType) => {
  const [showbox, setShowbox] = useState(false);
  useEffect(() => {
    setShowbox(true);
  }, []);
  return showbox
    ? createPortal(
        <div className={`cart-backdrop ${tdisplay}`}>
          <div className="cart-backdrop-bx">
            <Cartlist handleHide={handleHide} />
            <button onClick={handleHide}>X</button>
          </div>
          <div className="cart-backdrop-bg" onClick={handleHide}></div>
        </div>,
        document.querySelector('body') as HTMLElement
      )
    : '';
};

export default CartItems;
