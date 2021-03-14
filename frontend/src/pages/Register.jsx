import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [firstname, setFirstname] = useState('');
    function handleFirstname(event) {
        setFirstname(event.target.value)
    }

    const [lastname, setLastname] = useState('');
    function handleLastname(event) {
        setLastname(event.target.value)
    }

    const [tel, setTel] = useState('');
    function handleTel(event) {
        setTel(event.target.value)
    }

    const [password, setPassword] = useState('');
    function handlePassword(event) {
        setPassword(event.target.value)
    }

    const [re_password, setre_Password] = useState('');
    function handleRe_Password(event) {
        setre_Password(event.target.value)
    }

    // hook foods for state --> foods is value of Menulist tag
    const [confirm, setConfirm] = React.useState(false);

    // set state of foods
    const handleCheck = (event) => {
        if (confirm == false){
            setConfirm(event.target.value = true);
        } else{
            setConfirm(event.target.value = false);
        }
    };
    const { confirms } = confirm;
    // ------------------------------------

    function handleSubmit(event) {
        event.preventDefault();
        
        // ในกรณีที่ผู้ใช้งานกรอกข้อมูลไม่ครบ
        // if (user.firstName == "" || user.lastName == "" || user.tel == "" || user.password == "" || user.re_password == "") {
        //     alert("โปรดกรอกข้อมูลให้ครบ")
        // } else {
        //     // ในกรณีที่รหัสผ่านตรงกัน และ ผู้ใช้งานติ๊กยอมรับการใช้งาน
        //     if (user.password === re_password && confirm === true) {
        //         // ส่งข้อมูลเข้า mongodb
        //         axios.post('/api/users/register', user)
        //             .then(res => {
        //                 alert(JSON.stringify(res.data.msg));
        //                 if(res.status == 200){
        //                     alert("Hey");
        //                     return <Redirect to="/" />
        //                 }
        //             })

        //     }
        //     // ถ้าผู้ใช้งานไม่ติ๊กยอมรับการใช้งาน
        //     else if (confirm == false){
        //         alert("โปรดติ๊กยอมรับการใช้งาน")
        //     }
        //     // กรณีรหัสผ่านไม่ตรงกัน
        //     else if(user.password !== re_password) {
        //         alert("รหัสผ่านไม่ตรงกัน โปรดกรอกอีกครั้ง")
        //     }else{
        //         alert("เกิดข้อผิดพลาด")
        //     }
        // }
    }

    const user = {
        "firstName": firstname,
        "lastName": lastname,
        "tel": tel,
        "password": password,
    }


    return (
        <Container component={Paper} maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    สมัครสมาชิก
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="ชื่อ"
                                placeholder="ไม่ต้องใส่คำนำหน้า"
                                autoFocus
                                value={firstname}
                                onChange={handleFirstname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="สกุล"
                                name="lastName"
                                autoComplete="lname"
                                value={lastname}
                                onChange={handleLastname}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="tel"
                                label="หมายเลขโทรศัพท์"
                                name="tel"
                                autoComplete="tel-national"
                                placeholder="09XXXXXXXX"
                                value={tel}
                                onChange={handleTel}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="รหัสผ่าน"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="ยืนยันรหัสผ่าน"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={re_password}
                                onChange={handleRe_Password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox
                                color="primary" />}
                                label="ฉันยอมรับข้อตกลงการใช้งานของเว็บนี้"
                                value={true}
                                checked={confirms}
                                onChange={handleCheck}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}

                    >
                        สมัครสมาชิก
                    </Button>
                </form>
            </div>
        </Container>
    );
}