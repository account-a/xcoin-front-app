import { IRate } from 'interfaces/general';

export async function getRate(base: string, quote: string): Promise<IRate> {
  const result = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${base}&tsyms=${quote}`);
  const data: IRate = await result.json();
  return data;
}

