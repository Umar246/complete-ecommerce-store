const STRIPE_SECRET_KEY =
  process.env.REACT_APP_STRIPE_SECRET_KEY;
const STRIPE_PUBLISHABLE_KEY =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

module.exports = {
  stripeSecretKey: STRIPE_SECRET_KEY,
  stripePublishableKey: STRIPE_PUBLISHABLE_KEY,
};
