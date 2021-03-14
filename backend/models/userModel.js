import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    tel: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;