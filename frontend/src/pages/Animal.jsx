import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// test import code, if not use you can delete it

// end test import code

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    backButton: {
        margin: theme.spacing(2),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formControl: {
        minWidth: 120,
        align: 'center'
    },
    formCheckControl: {
        margin: theme.spacing(3),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

}));

export default function Animal() {

    const [types, setTypes] = useState([{ _id: 1, name: "Cow" }]);
    const [foods, setFoods] = useState([{ _id: 1, name: "Carrot"}]);
    // hook state for age --> age is value of select tag !!! 
    const [type, setType] = React.useState('');
    const [food, setFood] = useState({});

    // set state of type
    const handleChangeType = (event) => {
        setType(event.target.value);
    };
    // --------

    const classes = useStyles();


    // set state of foods
    const handleChangecheck = (event) => {
        setFood({...food,  [event.target.name] : event.target.checked});
    };
    // ------------------------------------

    // hook state for value --> value is value of textfield
    const [value, setValue] = React.useState('');

    // ดึงประเภทสัตว์และอาหารสัตว์
    useEffect(() => {
        const fetchtype = async () => {
            axios.get('/api/type/types').then(res => {
                if (res.status === 200) {
                    setTypes(res.data.types);
                }
            })

        }; 
        const fetchfood = async () => {
            axios.get('/api/food/all').then(res => {
                if (res.status === 200) {
                    const foods = res.data.foods;
                    setFoods(foods);
                    let ff = {};
                    foods.map(fh => {
                        ff[fh._id] = false;
                    });
                    setFood(ff);
                }
            })

        };
        fetchtype();
        fetchfood();

    }, []);

    // set state of value
    function handleChange(event) {
        setValue(event.target.value)
    }
    // รวมข้อมูลจากฟอร์มทั้งหมด เพื่อเตรียมส่งผ่าน axios ไป mongodb

    // hook desc for state --> desc is value of tag 
    const [desc, setDesc] = React.useState("");
    // set desc for date
    function handleChangeDesc(event) {
        setDesc(event.target.value);
    }

    // hook date for state --> date is value of tag TextField : 213
    const [date, setDate] = React.useState("");

    // set date of value
    function handleChangeDate(event) {
        setDate(event.target.value);
    }
    //ตรวจสอบข้อมูลว่ากรอกครบหรือไม่
    function handleSubmit(event) {
        event.preventDefault();
        if (value !== '') {
            const checkedfood = Object.keys(food).filter((fd) => food[fd] );
            const animalData = {
                "name": value,
                "type": type,
                "foods": checkedfood,
                "date": date,
                "desc": desc,
            };
            alert(JSON.stringify(animalData));  
            axios.post('/api/animal/add', animalData).then(res => {
                if(res.status === 200){
                  alert(res.data.msg);
      
                } else{
                  alert(res.data.msg);
                }
            });

        } else {
            alert(`กรุณากรอกข้อมูล`);
        }

    }
   
    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <div className={classes.root}>
                    <Typography variant="h4" component="h1" align='center' gutterBottom>
                        เพิ่มสัตว์
                    </Typography>
                    <Typography variant="h5" component="h1" align='center' gutterBottom>
                        กรอกข้อมูลในแบบฟอร์ม
                    </Typography>
                    <Container component={Paper}>
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12}>

                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        component={Paper}
                                        variant="outlined"
                                        fullWidth
                                        id="food"
                                        label="ชื่อสัตว์"
                                        name="food"
                                        placeholder="เช่น helloWorld"
                                        value={value}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>

                                </Grid>
                                {/* select animal type */}
                                <Grid item xs={12} md={12} align='left' >
                                    {/* <FormControl className={classes.formControl}> */}
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        เลือกประเภทสัตว์
                                        </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        fullWidth
                                        align='center'
                                        defaultValue={types[0]._id}
                                        onChange={handleChangeType}
                                        className={classes.selectEmpty}
                                    >
                                        {types.map(t =>
                                            <MenuItem key={t.name} value={t._id}>{t.name}</MenuItem>
                                        )}
                                    </Select>

                                    {/* </FormControl> */}

                                </Grid>
                                <Grid item xs={12} md={12}>

                                </Grid>
                                <Grid item xs={12} md={12}>

                                </Grid>
                                {/* check box food */}
                                <Grid item xs={12} md={12} align="center">
                                    <FormLabel align="center" component="legend">ติ๊กเลือกอาหารสัตว์</FormLabel>
                                    <FormGroup fullWidth align="center" style={{ width: 150, }}>
                                        {foods.map(f =>
                                            <FormControlLabel
                                                align='center'
                                                fullWidth
                                                control={<Checkbox checked={food[f._id]} onChange={handleChangecheck} name={f._id} />}
                                                label={f.name}
                                            />
                                        )}


                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} md={12}>

                                </Grid>
                                <Grid item xs={12} md={12}>

                                </Grid>
                                {/* เลือก date  */}
                                <Grid item xs={12} md={12} align="center">
                                    <TextField
                                        id="datetime-local"
                                        label="วัน/เดือน/ปี , ชม./ นาที/"
                                        fullWidth
                                        type="datetime-local"
                                        defaultValue="2017-05-24 10:30"
                                        value={date}
                                        onChange={handleChangeDate}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}></Grid>
                                <Grid item xs={12} md={12}>

                                </Grid>
                                <Typography variant="h6" component="h1" align='center' gutterBottom>
                                    กรอกรายละเอียดสัตว์
                                </Typography>
                                {/* desc */}
                                <Grid item xs={12} md={12} alignItems="stretch" style={{ display: "flex" }}>
                                    <TextareaAutosize
                                        rowsMax={4}
                                        style={{ width: 500, height: 75 }}
                                        aria-label="maximum height"
                                        placeholder="Maximum 4 rows"
                                        value={desc}
                                        onChange={handleChangeDesc}
                                        defaultValue="เช่น วัวตัวนี้สีขาวมีเขาที่แหลมคมมากๆ โปรดระวัง!!!!."
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}></Grid>
                                <Grid item xs={12} md={12}>

                                </Grid>
                                <Grid item xs={12} md={12} alignItems="stretch" style={{ display: "flex" }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                    >
                                        เพิ่ม
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={12}></Grid>
                                <Grid item xs={12} md={12}></Grid>

                            </Grid>
                        </form>
                    </Container>
                </div>
            </Container>
        </React.Fragment>
    );
}