import langFr from '../assets/lang/fr.json';

const _ = (key) => {
    return (key in langFr) ? langFr[key] : key;
}

const parsePrice = (price) => (price && price !== '') ? `${price} Fcfa` : null;


export const String = {
    _,
    parsePrice,
}