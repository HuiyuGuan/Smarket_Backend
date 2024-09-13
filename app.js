const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./auth");
const Sequelize = require("sequelize");
const port = process.env.PORT || 8080;
const item = require("./models/item");
const user = require("./models/user");
const order = require("./models/order");
const category = require("./models/category");
const sellingList = require("./models/selllingList");
const feedbacks = require("./models/feedback");
const purchaseCart = require("./models/purchaseCart");
const { pool } = require("pg");
require("dotenv").config();
const purchaseCartRoutes = require('./routes/purchaseCart');

// const SequelizeStore = require("connect-session-sequelize")(session.Store);
const database = require("./models/database");
// const sessionStore = new SequelizeStore({ database });
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const app = express();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// const syncDb = async () => {
//     await db.sync({ force: true });
//   }

// var corsOptions = {
//     origin: "http:// localhost: 3000"
// };

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Parses incoming requests with URL-encoded payloads
app.use("/users", require("./routes/user"));
app.use("/items", require("./routes/item"));
app.use("/orders", require("./routes/order"));
app.use("/category", require("./routes/category"));
app.use("/sellinglists", require("./routes/sellingList"));
app.use("/feedbacks", require("./routes/feedback"));
//app.use("/purchaseCart", require("./routes/purchaseCart"));
app.use(purchaseCartRoutes);

//     session({
//       secret: "a super secretive secret key string to encrypt and sign the cookie",
//       store: sessionStore,
//       resave: false,
//       saveUninitialized: false
//     })
//   );

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/auth", authRouter);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () =>
    console.log(`Serving portmanteau since there were ports ${port}`)
  );
});

app.get("/", (req, res) => {
  res.json({ message: "Routing works" });
});
