import config from './config';
import { connect } from 'mongoose';
import { logger } from '../logs/logger';

export const dbConnection = async () => {
    const MONGO_URI = config.MONGO_URI;
    
    if (!MONGO_URI) {
        logger.error("MONGO_URI is not defined in the configuration");
        throw new Error("MONGO_URI is undefined. Please check your environment variables or config file.");
    }

    try {
        await connect(MONGO_URI);
        logger.info("Connected to MongoDB successfully");
    } catch (error) {
        logger.error("Failed to connect to MongoDB:", error);
        throw error;
    }
};
