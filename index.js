const Application = require('./app/server');
const PORT = process.env.PORT || 3000;
const DB_URL = 'mongodb://127.0.0.1:27017/ProjectManagement';
require('dotenv').config();
new Application(PORT, DB_URL);