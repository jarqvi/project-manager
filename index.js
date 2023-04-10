const Application = require('./app/server');
const DB_URL = 'mongodb://127.0.0.1:27017/ProjectManagement';
new Application(3000, DB_URL);