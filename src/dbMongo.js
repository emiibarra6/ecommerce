import mongoose from 'mongoose';
import dotenv from 'dotenv';

const conectarDBMongo = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url} `);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default conectarDBMongo;