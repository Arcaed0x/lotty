import { CURRENCY_LIST } from "@/utils/constants";

const formatCurrency = (amount: number, currency: CURRENCY_LIST) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export default formatCurrency;
