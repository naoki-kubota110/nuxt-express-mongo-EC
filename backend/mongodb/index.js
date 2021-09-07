const  mongoose = require('mongoose');
const  config  = require('../config');

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const url = config.MONGODB_CONNECT_URL
mongoose.connect(
  url,options
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log("DB connection successful"));

module.exports = mongoose;