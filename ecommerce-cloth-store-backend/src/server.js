const app = require(".");
const connectDB = require("./Utils/DB");
// require("dotenv").config();

const PORT = process.env.REACT_APP_SERVER_PORT || 5007;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Ecommerce store backend listening on PORT ${PORT}`);
  });
});
