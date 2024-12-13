const CinetPay = 'CinetPay' in window ? window.CinetPay : {};

const setConfig = () => {
    CinetPay.setConfig({
        apikey: import.meta.env.VITE_APP_CINETPAY_API_KEY ?? '',
        site_id: import.meta.env.VITE_APP_CINETPAY_SITE_ID ?? '',
        notify_url: import.meta.env.VITE_APP_CINETPAY_NOTIFY_URL ?? '',
        mode: import.meta.env.VITE_APP_CINETPAY_MODE ?? 'DEVELOPMENT'
    });
}
const checkout = (payload = {}, onSuccessCallback, onErrorCallback) => {
    setConfig();
    CinetPay.getCheckout({
        transaction_id: Math.floor(Math.random() * 100000000).toString(),
        amount: payload.amount,
        currency: 'XOF',
        channels: 'ALL',
        description: payload.description ?? '',   
    });

    CinetPay.waitResponse((data) => onSuccessCallback(data));
    CinetPay.onError((data) => onErrorCallback(data));
}

export const Payment = {
    checkout,
}

