'use client';

import useGetQuery from '@/data/query/useGetQuery';
import useSelectors from '@/data/redux/useSelectors';
import setCurrencyType from '@/utils/setCurrencyType';
import { useState } from 'react';
import ItemSize from '../ItemSize';
import { useDispatch } from 'react-redux';
import { addToCart, deleteCart } from '@/data/redux/features';
import getGrandTotal from '@/utils/getGrandTotal';

import Link from 'next/link';

const Cartlist = ({ handleHide }: { handleHide: () => void }) => {

  const cont = useGetQuery('/contact', 'contact') || [];

    const obj = useSelectors();
  const data = Object.values(obj.cart);

  const [scrollPosition, setScrollPosition] = useState(0);

  const total_items = data.length;

  const dispatch = useDispatch();

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget; // safer than e.target, guaranteed to be the element the listener is attached to
    const { scrollTop, scrollHeight, clientHeight } = target;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );
    setScrollPosition(position);
  };

  const deleteItem = (id: string) => {
  
    const bj = Object.values(data)
      .filter((v) => v.id !== id)
      .reduce((a, b) => {
        a[b.id] = b;
        return a;
      }, {});

    dispatch(deleteCart(bj));
  };

  const handleClick = (id: string, status: string) => {
    const alldata = Object.values(data).find((v) => v.id === id);

    let qty = 0;
    let total;

    if (status === 'dec') {
      qty = Number(alldata.qty) - 1;
      total = Number(alldata.price) * (Number(alldata.qty) - 1);
    } else if (status === 'inc') {
      qty = Number(alldata.qty) + 1;
      total = Number(alldata.price) * (Number(alldata.qty) + 1);
    }

    const bj = {
      [id]: {
        ...alldata,
        total,
        qty: qty < 1 ? 1 : qty,
      },
    };

    dispatch(addToCart(bj));
  };

  const { curr, grand_total } = getGrandTotal(obj, cont);

  return (
    <>
      <div className="items-box" onScroll={handleScroll}>
        <table>
          <tbody>
            {[...data].map((v, k) => {
              const { curr, item_total } = setCurrencyType(
                obj,
                v.price,
                v.qty,
                cont
              );

              return (
                <tr key={k}>
                  <td>
                    <div
                      style={{
                        backgroundImage: `url(${v?.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                      }}
                    ></div>
                  </td>
                  <td>
                    <div>{v.title}</div>

                    <div className="chexbtns">
                      <div>
                        <button onClick={() => handleClick(v.id, 'dec')}>
                          -
                        </button>
                        <span>{v.qty}</span>
                        <button onClick={() => handleClick(v.id, 'inc')}>
                          +
                        </button>
                      </div>
                      <div>
                        <ItemSize id={v.id} obj={obj.cart} />
                      </div>
                    </div>
                  </td>
                  <td>
                    {curr} {item_total}
                    <button
                      title="Close"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        deleteItem(v.id);
                      }}
                    >x</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className={`scroll-box ${
            scrollPosition > 0 ? 'hide' : total_items > 3 ? 'show' : ''
          }`}
        >
          Scroll for more items
        </div>
      </div>

      <div className="cart-sub-total">
        <h4>Subtotal:</h4>
        <h4>
          {curr} {grand_total}
        </h4>
      </div>

      <div>
        <Link href="/checkout" onClick={handleHide} className="checkoutbtn">
          Checkout
        </Link>
      </div>
    </>
  );
};

export default Cartlist;
