const dateTimeFormat = (dateTime?: Date | string): string =>
  new Intl.DateTimeFormat("fa", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  }).format(dateTime ? new Date(dateTime) : new Date());

export default dateTimeFormat;
