import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true},
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food', require: true}],
    date: { type: Date, required: true},
    desc: { type: String, required: true},
}, { versionKey: false });

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;