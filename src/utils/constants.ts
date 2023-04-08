export const CURRENCIES = [ 'USD', 'EUR', 'GBP' ] as const;
type CURRENCY_LIST = typeof CURRENCIES[number];

export const CURRENCY_MAP: {[key in CURRENCY_LIST]: string} = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
}