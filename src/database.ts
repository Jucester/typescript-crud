import mongoose from 'mongoose';

export default async function connect() {

    try {
        await mongoose.connect('mongodb://localhost/ts-crud', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (e) {
        console.log('Error', e);
    }
}
