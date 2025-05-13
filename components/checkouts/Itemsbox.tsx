'use client';

import useGetQuery from '@/data/query/useGetQuery';
import useSelectors from '@/data/redux/useSelectors';
import setCurrencyType from '@/utils/setCurrencyType';
import { useState } from 'react';


const Itemsbox = () => {
  const obj = useSelectors();
  const cont = useGetQuery('/contact', 'contact') || [];

  const data = Object.values(obj.cart);

  const [scrollPosition, setScrollPosition] = useState(0);

  const total_items = data.length;



  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget; // safer than e.target, guaranteed to be the element the listener is attached to
    const { scrollTop, scrollHeight, clientHeight } = target;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );
    setScrollPosition(position);
  };



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
                    <div>
                      <div>
                        Qty: {v.qty}
                      </div>
                      <div>
                        Size: {v.size}
                      </div>
                    </div>

                  </td>
                  <td>
                    {curr} {item_total}
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
    </>
  );
};

export default Itemsbox;
