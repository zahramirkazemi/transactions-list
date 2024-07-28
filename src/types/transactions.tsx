interface Transactions {
  amount: number | string;
  trackId: number;
  status: number;
  paidAt: string;
  cardNumber: string | string;
}

export default Transactions;
