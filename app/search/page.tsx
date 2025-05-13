'use client';

import { ItemTypes, ItemData } from '@/@types/types';
import Card from '@/components/card/Card';
import Pageheader from '@/components/Pageheader';
import PaginationLinks from '@/components/PaginationLinks';
import useGetQuery from '@/data/query/useGetQuery';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get('p');
  const result = searchParams.get('s');
  const item: ItemTypes = useGetQuery('item', '/item') || [];

  const bestselling: ItemTypes =
    useGetQuery('bestselling', '/bestselling') || [];

  const arr = Object.values(
    [...item, ...bestselling].reduce<Record<string, ItemData>>((a, b) => {
      a[b.title] = b;
      return a;
    }, {})
  ).filter((v) => {
    const res = result?.toLowerCase() || '';
    return Object.values(v).join(' ').toLowerCase().includes(res);
  });

  const [getData, setData] = useState<ItemTypes>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    let result: ItemTypes = [];

    if (value === 'Sort by price: Low to High') {
      result = [...arr].sort((a, b) => a.price.localeCompare(b.price));
    }

    if (value === 'Sort by price: High to Low') {
      result = [...arr].sort((a, b) => b.price.localeCompare(a.price));
    }

    if (value === 'Sort by latest') {
      result = [...arr].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    setData(result);
  };

  let obj = [];
  if (getData.length > 0) {
    obj = getData;
  } else {
    obj = arr;
  }

  const currentPage = search;
  const perPage = 9;
  const startPoint = Number(currentPage) * Number(perPage) - Number(perPage);
  const endPoint = Number(startPoint) + Number(perPage);

  const sliceData = obj.slice(startPoint, endPoint);

  return (
    <section className="shop">
      <Pageheader />

      <div className="container search-result">
        <select onChange={handleChange}>
          <option>Sort by latest </option>
          <option>Sort by price: Low to High </option>
          <option>Sort by price: High to Low</option>
        </select>

        <div>
          {arr.length} results for <strong>{result}</strong>
        </div>
      </div>

      <div className="container">
        {sliceData.map((v, k: number) => (
          <Card
            key={k}
            id={v.id}
            title={v.title}
            img={v.image}
            link={`/single/${v?.id}`}
            price={v.price}
          />
        ))}
      </div>

      <div className="container">
        <PaginationLinks arr={arr} />
      </div>
    </section>
  );
}
