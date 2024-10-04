module.exports = {
	routes: [
		{
			method: 'POST',
			path: '/reg-webhook',
			handler: 'reg-webhook.regWebhook',
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
}
