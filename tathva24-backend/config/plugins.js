module.exports = ({env}) => ({
 email: {
  config: {
      provider: 'mailgun',
      providerOptions: {
        key: env('MAILGUN_API_KEY', '2d72d7d72929dfe25cfd46470a7a76f5-5dcb5e36-21eaf41b'), // Required
        domain: env('MAILGUN_DOMAIN', 'testing.tathva.org'), // Required
        url: env('MAILGUN_URL', 'https://api.mailgun.net'), //Optional. If domain region is Europe use 'https://api.eu.mailgun.net'
      },
      settings: {
        defaultFrom: 'tathva@testing.tathva.org',
        defaultReplyTo: 'tathva@testing.tathva.org',
      },
    },
  },
});
