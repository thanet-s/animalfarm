import express from 'express';
import Food from '../models/Food';

const router = express.Router();

router.get('/all', async (req, res) => {
    const foods = await Food.find();
    res.json({ foods: foods });
});

router.post('/add', async (req, res) => {
    const body = req.body;
    await Food.findOne({ name: body.food }, async (err, food) => {
        if (err) {
            res.status(500).json({ msg: 'แตก' });
        }
        if (food) {
            res.status(400).json({ msg: 'ซ้ำ' });
        } else {
            console.log(body);
            const food = await Food({ name: body.food });
            food.save();
            res.json({ msg: 'เพิ่มสำเร็จ' });
        }
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        await Food.findById(id, (err, food) => {
            if (food) {
                res.json(food);
            } else {
                res.status(500).json({ msg: err });
            }
        });
    } else {
        res.status(500).json({ msg: 'Id ไม่ถูกต้อง' });
    }
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    await Food.findById(id, (err, food) => {
        if (food) {
            food.name = req.body.food;
            food.save();
            res.json(food);
        } else {
            res.status(500).json({ msg: err });
        }
    });
});

router.post('/remove/:id', async (req, res) => {
    const id = req.params.id;
    await Food.deleteOne({_id: id}, err => {
        if (err) {
            res.status(500).json({ msg: err });
        } else {
            res.json({ msg: 'ทำการลบสำเร็จ' });
        }
    });
});

export default router;