import express from 'express';
import Animal from '../models/Animal';
import Food from '../models/Food';

const router = express.Router();

function removeArr(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

router.post('/add', async (req, res) => {
    const body = req.body;
    await Animal.findOne({ name: body.animal }, async (err, animal) => {
        if (err) {
            res.status(500).json({ msg: 'แตก' });
        }
        if (animal) {
            res.status(400).json({ msg: 'ซ้ำ' });
        } else {
            console.log(body);
            animal = await Animal({
                name: body.name,
                type: body.type,
                foods: body.foods,
                date: new Date(body.date),
                desc: body.desc
            });
            animal.save();
            const fs = body.foods
            fs.map(async fId => {
                let food = await Food.findById(fId);
                food.animals.push(animal._id);
                food.save();
            });
            res.json({ msg: 'เพิ่มสำเร็จ', id: animal._id });
        }
    });
});

router.get('/get/all', async (req, res) => {
    const animals = await Animal.find();
    res.json({ animals: animals });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        await Animal.findById(id, (err, animal) => {
            if (animal) {
                res.json(animal);
            } else {
                res.status(500).json({ msg: err });
            }
        });
    } else {
        res.status(500).json({ msg: 'Id ไม่ถูกต้อง' });
    }
});

router.post('/edit/:id', async (req, res) => {
    const body = req.body;
    console.log(body);
    await Animal.findById(req.params.id, (err, animal) => {
        if (animal) {
            animal.name = body.name;
            animal.type = body.type;
            animal.foods = body.foods;
            animal.date = body.date;
            animal.desc = body.desc;
            animal.save();
            res.json(animal);
        } else {
            res.status(500).json({ msg: err });
        }
    });
});

router.post('/remove/:id', async (req, res) => {
    const id = req.params.id;
    await Animal.findOne({ _id: id }, async (err, animal) => {
        if (err) {
            res.status(500).json({ msg: err });
        } else {
            const fs = animal.foods;
            fs.map(async fId => {
                let food = await Food.findById(fId);
                const newArr = removeArr(food.animals, animal._id);
                food.animals = newArr;
                food.save();
            });
            await Animal.deleteOne({ _id: id }, err => {
                if (err) {
                    res.status(500).json({ msg: err });
                } else {
                    res.json({ msg: 'ทำการลบสำเร็จ' });
                }
            });
        }
    });
});

export default router;