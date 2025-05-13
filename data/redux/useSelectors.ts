import { useSelector } from 'react-redux';
const useSelectors = () => {
  type stateType = {
    cart: {
      total: string;
      cart: object;
      currency: string;
      size: string;
      lastwatched: object;
      customer: {
        address: string;
        apartment: string;
        city: string;
        company: string;
        email: string;
        firstname: string;
        lastname: string;
        phone: string;
        shipping: string;
        zipcode: string;
      };
    };
  };

  const data = useSelector((state: stateType) => state.cart);

  return data;
};

export default useSelectors;
