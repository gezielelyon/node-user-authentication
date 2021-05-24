export default {
  jwt: {
    secret: process.env.HASH_SECRET_KEY,
    expiresIn: '1d',
  },
};
