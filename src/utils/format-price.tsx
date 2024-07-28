const formatPrice = (price: number) =>
  `${new Intl.NumberFormat("fa").format(price)} ریال`;

export default formatPrice;
