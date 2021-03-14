import express from 'express';
import Type from '../models/Type';

const router = express.Router();

router.get('/types', async (req, res) => {
    const types = await Type.find();
    res.json({ types: types });
});

router.post('/addtype', async (req, res) => {
    const body = req.body;
    await Type.findOne({ name: body.type }, async (err, type) => {
        if (err) {
            res.status(500).json({ msg: 'แตก' });
        }
        if (type) {
            res.status(400).json({ msg: 'ซ้ำ' });
        } else {
            console.log(body);
            const type = await Type({ name: body.type });
            type.save();
            res.json({ msg: 'เพิ่มสำเร็จ' });
        }
    });
});

router.get('/type/:id', async (req, res) => {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        await Type.findById(id, (err, type) => {
            if (type) {
                res.json(type);
            } else {
                res.status(500).json({ msg: err });
            }
        });
    } else {
        res.status(500).json({ msg: 'Id ไม่ถูกต้อง' });
    }
});

router.post('/edittype/:id', async (req, res) => {
    const id = req.params.id;
    await Type.findById(id, (err, type) => {
        if (type) {
            type.name = req.body.type;
            type.save();
            res.json(type);
        } else {
            res.status(500).json({ msg: err });
        }
    });
});

router.post('/removetype/:id', async (req, res) => {
    const id = req.params.id;
    await Type.deleteOne({_id: id}, err => {
        if (err) {
            res.status(500).json({ msg: err });
        } else {
            res.json({ msg: 'ทำการลบสำเร็จ' });
        }
    });
});

export default router;