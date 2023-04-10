const { AllRoutes } = require('./router/router');

module.exports = class Application {
    #express = require('express');
    #app = this.#express();
    constructor(PORT, DB_URL) {
        this.configDatabase(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }
    configApplication() {
        const path = require('path');
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended: true }));
        this.#app.use(this.#express.static(path.join(__dirname, '..', 'public')));
    }
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    configDatabase(DB_URL) {
        const mongoose = require('mongoose');
        main().catch(err => console.log(err));
        async function main() {
            await mongoose.connect(DB_URL)
                .then(() => console.log('Connected to MongoDB...'))
                .catch(err => console.error('Could not Connected to MongoDB...', err));
        }
    }
    errorHandler() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Not found route or method.'
            });
        });
        this.#app.use((err, req, res, next) => {
            const status = err?.status || 500;
            const message = err?.message || 'Internal server error.';
            return res.status(500).json({
                status,
                success: false,
                message
            });
        });
    }
    createRoutes() {
        this.#app.get('/', (req, res, next) => {
            return res.json({
                message: 'this is a new express application.'
            });
        });
        this.#app.use(AllRoutes);
    }
};