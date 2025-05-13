import fetch from '../axios/fetch';
import { useQuery } from 'react-query';

const useGetQuery = (url: string, key: string) => {
  const fn = () => fetch({ url });
  const res = useQuery(key, fn);

  if (res) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export default useGetQuery;
