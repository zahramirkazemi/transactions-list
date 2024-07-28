const formatCardNumber = (cardNumber: string): string =>
  cardNumber.replace(/^(\d{4})(\d{2})\*{6}(\d{4})$/, "$1-$2**-****-$3");

export default formatCardNumber;
