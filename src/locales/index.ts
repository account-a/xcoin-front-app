export const enLocale: { [key: string]: string } = {
  give: 'Give',
  get: 'Get',
  balance: 'Balance:',
  exchangeRate: 'Exchange rate:',
  exchange: 'Exchange',
  currencyGiveAway: 'Select the currency, which one you want to give away',
  currencyReceive: 'Select the currency, which one you want to receive',
  serverError: 'Server error. Please, wait a few minutes, and try again.',
  exceedsBalance: 'Your balance is exceeded',
  title: 'Exchange currencies \n right on this screen.'
};

export const getLocale = (lang?: string): typeof enLocale => {
  // if (lang === 'de') return deLocale;
  return enLocale;
};
