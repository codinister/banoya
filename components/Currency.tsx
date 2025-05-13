'use client';

import { setCurrency } from '@/data/redux/features';
import useSelectors from '@/data/redux/useSelectors';

import { useDispatch } from 'react-redux';

const Currency = () => {

  const dispatch = useDispatch();

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setCurrency(value));
  };

    const details = useSelectors()
    const cur = details?.currency

  return (
    <div className="currency">
      <ul>
        <li>
          <label htmlFor="cedi" title="Cedis">
            ₵
          </label>
          <input
            id="cedi"
            checked={cur === 'cedi' ? true : false}
            onChange={handlechange}
            value="cedi"
            type="radio"
            name="cur"
          />
        </li>
        <li>
          <label htmlFor="dollar" title="Euro">
            $
          </label>
          <input
            id="dollar"
            checked={cur === 'dollar' ? true : false}
            onChange={handlechange}
            value="dollar"
            type="radio"
            name="cur"
          />
        </li>
        <li>
          <label htmlFor="pounds" title="Euro">
            £
          </label>
          <input
            id="pounds"
            checked={cur === 'pounds' ? true : false}
            onChange={handlechange}
            value="pounds"
            type="radio"
            name="cur"
          />
        </li>
        <li>
          <label htmlFor="euro" title="Euro">
            €
          </label>
          <input
            id="euro"
            checked={cur === 'euro' ? true : false}
            onChange={handlechange}
            value="euro"
            type="radio"
            name="cur"
          />
        </li>
      </ul>
    </div>
  );
};

export default Currency;
