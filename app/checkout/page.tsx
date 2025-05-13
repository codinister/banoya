'use client';

import Address from '@/components/checkouts/Address';
import Items from '@/components/checkouts/Items';
import useSelectors from '@/data/redux/useSelectors';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import getGrandTotal from '@/utils/getGrandTotal';
import useGetQuery from '@/data/query/useGetQuery';
import { useDispatch } from 'react-redux';
import { deleteCustomer } from '@/data/redux/features';
import formatDate from '@/utils/DateFormats';
import { usePaystackPayment } from 'react-paystack';

// you can call this function anything
const onSuccess = (reference: string) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed');
};

const Checkout = () => {
  const obj = useSelectors();
  const cont = useGetQuery('/contact', 'contact') || [];
  const data = Object.values(obj.cart);
  const customer = obj.customer;
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length < 1) {
      router.push('/');
    }
  }, []);

  const { grand_total, curr } = getGrandTotal(obj, cont);

  const config = {
    reference: new Date().getTime().toString(),
    email: customer?.email,
    currency: 'GHs',
    amount: Number(grand_total), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_4589bf9fa76134b0892747bf3cc7edec56a72017',
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
              <td>
                {curr} {grand_total}
              </td>
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
              initializePayment({onSuccess, onClose});
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
