import { Transactions } from "../types";
import formatCardNumber from "./format-card-number";
import dateTimeFormat from "./format-date";
import formatPrice from "./format-price";

const formatTransaction = (transactions: Transactions[]): Transactions[] => {
  return (
    transactions.map((transaction: Transactions) => {
      return {
        ...transaction,
        amount: formatPrice(transaction.amount as number),
        paidAt: dateTimeFormat(transaction.paidAt),
        cardNumber: formatCardNumber(transaction.cardNumber),
      };
    }) || []
  );
};

export default formatTransaction;
