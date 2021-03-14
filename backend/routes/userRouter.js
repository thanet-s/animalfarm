import express from 'express';
import userModel from '../models/userModel';

const router = express.Router();

router.get('/isLoggedIn', async (req, res) => {
    console.log('check Logged In');
    const firstName = req.session.firstName;
    if (firstName) {
        res.json({ isLoggedIn: true, firstName: firstName });
    } else {
        res.json({ isLoggedIn: false });
    }
});

router.post("/register", async (req, res) => {
    const body = req.body;
    await userModel.findOne({ tel: body.tel }, async (err, user) => {
        if (err) {
            res.status(500).json({ msg: 'แตก' });
        }
        if (user) {//เบอร์โทรซ้ำ
            res.status(400).json({ msg: 'เบอร์โทรซ้ำ' });
        } else {// เบอร์โทรไม่ซ้ำ
            console.log(body);
            const user = await userModel({ firstName: body.firstName, lastName: body.lastName, tel: body.tel, password: body.password });
            user.save();
            req.session.firstName = user.firstName;
            res.json({msg : 'สมัครสำเร็จ'});
        }
    });
});

router.post("/login", async (req, res) => {
    const body = req.body;
    await userModel.findOne({ tel: body.tel }, async (err, user) => {
        if (err) {
            res.status(500).json({ msg: 'แตก' });
        }
        if (user) {
            req.session.firstName = user.firstName;
            res.json({msg : 'เข้าสู่ระบบสำเร็จ'});
        } else {
            res.json({ msg: 'ไม่พบหมายเลขโทรศัพท์ในระบบ กรุณาสมัครสมาชิก' });
        }
    });
});

export default router;