import 'dotenv/config';

export default {
    MONGO_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT || 8080,
}