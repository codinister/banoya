import format_number from './format_number';

const setCurrencyType = (
  obj: { currency: string },
  price: string,
  qty: number,
  cont: { dollar: string; euros: string; pounds: string }[]
) => {
  let curr = 'GH₵';
  let itemprice = Number(price);
  let itemTotal = Number(price) * Number(qty);
  const tot = Number(price) * Number(qty);

  if (obj.currency === 'dollar') {
    curr = '$';
    itemprice = Number(price) / Number(cont[0]?.dollar);
    itemTotal = Number(tot) / Number(cont[0]?.dollar);
  } else if (obj.currency === 'euro') {
    curr = '€';
    itemprice = Number(price) / Number(cont[0]?.euros);
    itemTotal = Number(tot) / Number(cont[0]?.euros);
  } else if (obj.currency === 'pounds') {
    curr = '£';
    itemprice = Number(price) / Number(cont[0]?.pounds);
    itemTotal = Number(tot) / Number(cont[0]?.pounds);
  }

  const item_price = format_number(String(itemprice));
  const item_total = format_number(String(itemTotal));

  return { curr, item_price, item_total };
};

export default setCurrencyType;
