import useGetQuery from "@/data/query/useGetQuery";
import useSelectors from "@/data/redux/useSelectors";
import setCurrencyType from "./setCurrencyType";

const useGetCurrency = (price: string) => {
  const cont = useGetQuery('/contact', 'contact') || [];
  const obj = useSelectors();
  const  res = setCurrencyType(obj, price,1, cont);
  return res
}

export default useGetCurrency