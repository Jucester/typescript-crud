import mongoose from 'mongoose';

export default async function connect() {

    try {
        await mongoose.connect('mongodb://mongo/ts-crud', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (err) {
        console.log('Error: ', err);
    }
}
