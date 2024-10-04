module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/startpayment",
      handler: "order.startPayment",
    },
    {
      method: "POST",
      path: "/orders/onPaymentComplete",
      handler: "order.onPaymentComplete",
    }
  ],
};