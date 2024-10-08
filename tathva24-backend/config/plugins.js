module.exports = ({}) => ({});
module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'strapi-provider-email-sendgrid', 
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'lishinvs6541@gmail.com',
          defaultReplyTo: 'lishinvs6541@gmail.com',
        },
      },
    },
  });