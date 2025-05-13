import { ItemTypes } from '@/@types/types';
import useGetQuery from '@/data/query/useGetQuery';

const Pageheader = () => {
  const bestselling: ItemTypes =
    useGetQuery('bestselling', '/bestselling') || [];

  return (
    <div
      className="page-header"
      style={{
        backgroundImage: `url(${bestselling[0]?.image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
      }}
    >
      <div>
        <div>
          <h2>The Latest Trends</h2>
          <p>Exclusive and authentic designs just for you.</p>
        </div>
      </div>
    </div>
  );
};

export default Pageheader;
