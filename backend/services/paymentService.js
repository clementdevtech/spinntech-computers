const mpesa = require('../services/mpesa');
const paypal = require('../services/paypal');
const bankService = require('../services/bankService');

exports.processPayment = async (method, amount, userId, details) => {
    switch (method) {
        case 'mpesa':
            return await mpesa.processPayment(amount, details.phone);
        case 'paypal':
            return await paypal.processPayment(amount, details.email);
        case 'bank':
            return await bankService.processPayment(amount, details.accountNumber);
        default:
            throw new Error("Invalid payment method.");
    }
};
