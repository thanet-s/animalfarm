import express from 'express';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import userRouter from './routes/userRouter';
import typeRouter from './routes/typeRouter';
import foodRouter from './routes/foodRouter';
import animalRouter from './routes/animalRouter';

import Type from './models/Type';
import Food from './models/Food';
import Animal from './models/Animal';

const app = express();
const port = 3001;
dotenv.config();

const mongourl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@127.0.0.1/animalfarm?authSource=admin`;
mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch((error) => {
    console.log(error);
});

// app.use(session({
//     name: 'animalfarmSession',
//     secret: process.env.SECRET,
//     store: MongoStore.create({ mongoUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@127.0.0.1/animalfarm?authSource=admin` }),
//     cookie: {
//         maxAge: 300000
//     },
//     resave: true,
//     saveUninitialized: false
// }));
app.use(bodyParser.json());

app.get('/api/', async (req, res) => {
    res.send('Welcom to Animalfarm API!');
});

app.get('/api/dashboard', async (req, res) => {
    const types = await Type.countDocuments();
    const foods = await Food.countDocuments();
    const animals = await Animal.countDocuments();
    res.json({ types: types, foods: foods, animals: animals });
});

app.post('/api/search', async (req, res) => {
    const body = req.body;
    console.log(body);
    if (body.type == '1') { //ประเภทสัตว์ทั้งหมด
        if (body.food == '1') {
            if (body.name == '') {
                const animals = await Animal.find();
                res.json({ animals: animals });
            } else {
                const animals = await Animal.find({ name: { $regex: '.*' + body.name + '.*' } });
                res.json({ animals: animals });
            }
        } else { //อาหารอื่นๆ
            if (body.name == '') {
                const animals = await Animal.find({foods: { "$in" : [body.food]} });
                res.json({ animals: animals });
            } else {
                const animals = await Animal.find({ name: { $regex: '.*' + body.name + '.*' }, foods: { "$in" : [body.food]} });
                res.json({ animals: animals });
            }
        }
    } else { //ประเภทสัตว์อื่นๆ
        if (body.food == '1') {
            if (body.name == '') {
                const animals = await Animal.find({type: body.type});
                res.json({ animals: animals });
            } else {
                const animals = await Animal.find({ name: { $regex: '.*' + body.name + '.*' }, type: body.type });
                res.json({ animals: animals });
            }
        } else { //อาหารอื่นๆ
            if (body.name == '') {
                const animals = await Animal.find({foods: { "$in" : [body.food]}, type: body.type });
                res.json({ animals: animals });
            } else {
                const animals = await Animal.find({ name: { $regex: '.*' + body.name + '.*' }, foods: { "$in" : [body.food]}, type: body.type });
                res.json({ animals: animals });
            }
        }
    }
});

// app.use('/api/users', userRouter);
app.use('/api/type', typeRouter);
app.use('/api/food', foodRouter);
app.use('/api/animal', animalRouter);

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});