import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Searchbox = () => {
  const route = useRouter();
  const [result, setSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };
  const handleClick = () => {
    route.push(`/search?s=${result}&p=1`);
  };

  return (
    <div className="searchbox">
      <div>
        <input type="text" onChange={handleChange} placeholder="Search" />
        <label>
          <IoSearch />
        </label>
      </div>
      <div>
        <button onClick={handleClick}>Search</button>
      </div>
    </div>
  );
};

export default Searchbox;
