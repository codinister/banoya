import useGetQuery from '@/data/query/useGetQuery';
import useSelectors from '@/data/redux/useSelectors';
import getGrandTotal from '@/utils/getGrandTotal';

const Totalbox = () => {

  const obj = useSelectors();
  const data = Object.values(obj.cart);
  const cont = useGetQuery('/contact', 'contact') || [];

  const { curr, grand_total } = getGrandTotal(obj, cont);

  return (
    <div className="totalbox">
      <table>
        <tbody>
          <tr>
            <td>Subtotal · {data.length} items</td>
            <td></td>
            <td>{curr} {grand_total}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td></td>
            <td>{curr} 00</td>
          </tr>
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td></td>
            <td>
              <strong>{curr} {grand_total}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Totalbox;
