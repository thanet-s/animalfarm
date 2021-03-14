import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'}]
}, { versionKey: false });

const Food = mongoose.model('Food', foodSchema);

export default Food;