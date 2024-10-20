"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const pet_router_1 = __importDefault(require("./routers/pet.router"));
const mocks_router_1 = __importDefault(require("./routers/mocks.router"));
const adoption_router_1 = __importDefault(require("./routers/adoption.router"));
const db_connection_1 = require("./config/db.connection");
const config_1 = __importDefault(require("./config/config"));
const logger_1 = require("./logs/logger");
const error_handler_1 = require("./middlewares/error.handler");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const info_1 = require("./docs/info");
const app = (0, express_1.default)();
const specs = (0, swagger_jsdoc_1.default)(info_1.info);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use((0, morgan_1.default)('dev', {
    stream: {
        write: (message) => logger_1.logger.info(message.trim())
    }
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_connection_1.dbConnection)()
    .then(() => logger_1.logger.info('Connected to MongoDB'))
    .catch((error) => logger_1.logger.error('Database connection error:', error));
app.use('/api/users', user_router_1.default);
app.use('/api/pets', pet_router_1.default);
app.use('/api/adoptions', adoption_router_1.default);
app.use('/api/mocks', mocks_router_1.default);
// @ts-ignore
app.use(error_handler_1.errorHandler);
const PORT = config_1.default.PORT || 8080;
const server = app.listen(PORT, () => logger_1.logger.info(`Server running on port: ${PORT}`));
server.on('error', (err) => logger_1.logger.error('Server error:', err));
