const app = require(".");
const connectDB = require("./Utils/DB");
// require("dotenv").config();

const PORT = process.env.REACT_APP_SERVER_PORT || 5007;

// Replace existing PRODUCTION block with:
if (process.env.REACT_APP_NODE_ENV === "PRODUCTION") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Ecommerce store backend listening on PORT ${PORT}`);
  });
});
