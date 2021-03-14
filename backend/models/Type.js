import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, dropDups: true }
}, { versionKey: false });

const Type = mongoose.model('Type', typeSchema);

export default Type;