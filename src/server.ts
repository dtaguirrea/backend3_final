import express from "express";
import morgan from 'morgan';
import userRoute from './routers/user.router';
import petRoute from './routers/pet.router';
import mocksRoute from './routers/mocks.router'; 
import adoptionRoute from './routers/adoption.router'; 
import { dbConnection } from './config/db.connection';
import config from './config/config';
import { logger } from './logs/logger';
import { errorHandler } from './middlewares/error.handler';
import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc";
import { info } from './docs/info';

const app = express();

const specs = swaggerJSDoc(info);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(morgan('dev', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection()
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('Database connection error:', error));

app.use('/api/users', userRoute);
app.use('/api/pets', petRoute);
app.use('/api/adoptions', adoptionRoute)
app.use('/api/mocks', mocksRoute);

// @ts-ignore
app.use(errorHandler);

const PORT = config.PORT || 8080;

const server = app.listen(PORT, () =>
  logger.info(`Server running on port: ${PORT}`)
);

server.on('error', (err) => logger.error('Server error:', err));
