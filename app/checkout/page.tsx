'use client';

import Address from '@/components/checkouts/Address';
import Items from '@/components/checkouts/Items';
import useSelectors from '@/data/redux/useSelectors';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import getGrandTotal from '@/utils/getGrandTotal';
import useGetQuery from '@/data/query/useGetQuery';
import { useDispatch } from 'react-redux';
import { deleteAllCart,  deleteCustomer } from '@/data/redux/features';
import formatDate from '@/utils/DateFormats';
import { usePaystackPayment } from 'react-paystack';
import format_number from '@/utils/format_number';

// you can call this function anything

const Checkout = () => {
  const dispatch = useDispatch();

  const onSuccess = (reference: string) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    dispatch(deleteCustomer());
        dispatch(deleteAllCart());
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const obj = useSelectors();
  const cont = useGetQuery('/contact', 'contact') || [];
  const data = Object.values(obj.cart);
  const customer = obj.customer;
  const router = useRouter();

  useEffect(() => {
    if (data.length < 1) {
      router.push('/');
    }
  }, []);

  const { ceditotal } = getGrandTotal(obj, cont);

  const config = {
    reference: new Date().getTime().toString(),
    email: customer?.email,
    currency: 'GHS',
    amount: Number(ceditotal * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_live_86d2df60ee9f3ef0336b8db3cd09ecb92d00a22b',
  };
  const initializePayment = usePaystackPayment(config);

  const cancelOrder = () => {
    dispatch(deleteCustomer());
  };

  if (Object.values(customer).length > 0) {
    const date = new Date();
    const orderno = '' + Math.floor(Math.random() * 1000000000 + 1);
    return (
      <div className="checkout-summary">
        <table>
          <tbody>
            <tr>
              <td>Order Number:</td>
              <td>{orderno}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>{formatDate(date.toString())}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>GHS {format_number(String(ceditotal))}</td>
            </tr>
            <tr>
              <td>Payment method:</td>
              <td>VISA/Mastercard/Mobile Money</td>
            </tr>
          </tbody>
        </table>

        <div>
          Thank you for your order, please click the button below to pay with
          Paystack.
        </div>

        <div>
          <button
            onClick={() => {
              initializePayment({ onSuccess, onClose });
            }}
          >
            PAY NOW
          </button>
          <button onClick={cancelOrder}>CANCEL ORDER & RESTORE CART</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout">
      <div>
        <Address />
      </div>
      <div>
        <Items />
      </div>
    </div>
  );
};

export default Checkout;
