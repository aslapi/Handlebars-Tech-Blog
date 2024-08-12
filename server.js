const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js view engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views', 'layouts') }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
const sessionStore = new SequelizeStore({ db: sequelize });
app.use(session({
  secret: 'your-secret-key',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/', require('./controllers/authController'));
app.use('/dashboard', require('./controllers/blogController'));
app.use('/posts', require('./controllers/userController'));

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
