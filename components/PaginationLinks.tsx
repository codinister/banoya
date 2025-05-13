'use client';

import { ItemTypes } from '@/@types/types';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationLinks = {
  arr: ItemTypes;
};

const PaginationLinks = ({ arr }: PaginationLinks) => {
  //Begin Pagination links
  const datalength = Math.ceil(Number(arr.length) / 9);

  const pushtoArr = [];
  for (let i = 0; i < datalength; i++) {
    pushtoArr.push(i + 1);
  }

  const page = useRouter();
  const searchParams = useSearchParams();
  const cur_page = searchParams.get('p');
  const search_res = searchParams.get('s');

  const divd = Number(cur_page) / 10;
  const calc = parseInt(String(divd));
  const sum = Number(calc) * 10 - 1;

  const startPage = Number(sum) < 0 ? 0 : sum;
  const endPage = Number(calc) * 10 + 10;

  const last = Number(pushtoArr.length) - 1;
  const lastp = pushtoArr[last];

  const lastpage =
    Number(cur_page) < Number(lastp) - 10 ? (
      <>
        ...
        <button
          className={Number(cur_page) === lastp ? 'active' : ''}
          onClick={() => page.push(`?p=${lastp}`)}
        >
          {lastp}
        </button>
      </>
    ) : (
      ''
    );

  const url = search_res ? `?s=${search_res}&` : '';
  const prevurl = search_res
    ? `${url}p=${Number(cur_page) - 1}`
    : `?p=${Number(cur_page) - 1}`;

    const nexturl = search_res
    ? `${url}p=${Number(cur_page) + 1}`
    : `?p=${Number(cur_page) + 1}`;

  return (
    <div className="pagination">
      <div>
        <div>
          {Number(cur_page) > 1 ? (
            <button onClick={() => page.push(prevurl)}>Prev</button>
          ) : (
            ''
          )}
        </div>
        <div>
          {pushtoArr.slice(startPage, endPage).map((v, k) => {
            const s = search_res ? url+`p=${v}`: `?p=${v}`
            return (
              <button
                className={Number(cur_page) === v ? 'active' : ''}
                key={k}
                onClick={() => page.push(s)}
              >
                {v}
              </button>
            );
          })}{' '}
          {lastpage}
        </div>
        <div>
          {Number(cur_page) < Number(lastp) - 10 ? (
            <button onClick={() => page.push(nexturl)}>
              Next
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginationLinks;
