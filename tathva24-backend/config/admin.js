module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'verytopsecret'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'hello'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'nosalt4u'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
