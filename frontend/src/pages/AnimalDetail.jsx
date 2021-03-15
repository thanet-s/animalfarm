import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
// test import code
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useParams, Redirect } from "react-router-dom";
// end test import code
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    subtitle: {
        marginTop: theme.spacing(2),
    },
}));


export default function AnimalDetail(props) {
    const classes = useStyles();
    const { id } = useParams();
    const [count, setCount] = useState(0);
    const [types, setTypes] = useState([{ _id: 1, name: "Cow" }]);
    const [foods, setFoods] = useState([{ _id: 1, name: "Carrot" }]);
    const [type, setType] = useState('');
    const [food, setFood] = useState({});
    const [foodanimal, setFoodAnimal] = useState([]);
    const [remove, setRemove] = useState('');
    const [name, setName] = useState("");
    const [namehead, setNameHead] = useState("xxx");
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            axios.get(`/api/animal/${id}`).then(res => {
                if (res.status === 200) {
                    setName(res.data.name);
                    setNameHead(res.data.name);
                    setType(res.data.type);
                    setFoodAnimal(res.data.foods);
                    setDate(res.data.date);
                    setDesc(res.data.desc);
                    setCount(count + 1);
                } else {
                    alert(res.data.msg);
                }
            });
        };
        fetchData();
    }, [props]);

    if (namehead !== "xxx" && count === 1) {
        const fetchfood = async () => {
            axios.get('/api/food/all').then(res => {
                if (res.status === 200) {
                    const foods = res.data.foods;
                    setFoods(foods);
                    let ff = {};
                    foods.map(fh => {
                        ff[fh._id] = foodanimal.includes(fh._id) ? true : false;
                    });
                    setFood(ff);
                }
            })

        };
        const fetchtype = async () => {
            axios.get('/api/type/types').then(res => {
                if (res.status === 200) {

                    setTypes(res.data.types);
                }
            })

        };

        fetchtype();
        fetchfood();
        setCount(count + 1);
    }

    function handleChangeRemove(event) {
        setRemove(event.target.value)
    }
    function handleSubmitRemove(event) {
        event.preventDefault();
        if (remove === namehead) {
            axios.post(`/api/animal/remove/${id}`).then(res => {
                if (res.status === 200) {
                    alert('คุณได้ลบ ' + remove);
                    setRefresh(true);
                } else {
                    alert("err")
                }
            });
        } else {
                alert(`กรุณากรอกให้ถูก`)
            }

        }
        // hook state for age --> age is value of select tag !!! 

        // set state of type
        const handleChangeType = (event) => {
            setType(event.target.value);
        };
        // --------

        // hook foods for state --> foods is value of Menulist tag

        // set state of foods
        const handleChangecheck = (event) => {
            setFood({ ...food, [event.target.name]: event.target.checked });
        };
        // ------------------------------------


        // hook state for value --> value is value of textfield
        const [value, setValue] = React.useState('');

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

        function handleChangeModify(event) {
            setName(event.target.value)
        }
        //ตรวจสอบข้อมูลว่ากรอกครบหรือไม่
        function handleSubmit(event) {
            event.preventDefault();
            if (name !== '') {
                const checkedfood = Object.keys(food).filter((fd) => food[fd] );
                const animalData = {
                    "name": name,
                    "type": type,
                    "foods": checkedfood,
                    "date": date,
                    "desc": desc,
                };
                axios.post(`/api/animal/edit/${id}`, animalData).then(res => {
                    if(res.status === 200){
                      alert("บันทึกข้อมูลสำเร็จ");
          
                    } else{
                      alert(res.data.msg);
                    }
                });
            } else {
                alert(`กรุณากรอกข้อมูล`);
            }

        }
        
        return <div>{refresh ? (<Redirect to="/search" />) : (
            <Container maxWidth="sm">
                <div className={classes.root}>
                    <Typography variant="h4" component="h1" align='center' gutterBottom>
                        {namehead}
                    </Typography>

                    <Typography variant="h5" component="h2" className={classes.subtitle} gutterBottom>
                        เปลี่ยนชื่อ
        </Typography>
                    {/* form ของ ปุ่มแก้ไข */}
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
                                        value={name}
                                        onChange={handleChangeModify}
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
                                        defaultValue={type}
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
                                        defaultValue={date}
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
                                        placeholder={desc}
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

                    <Typography variant="h5" component="h2" className={classes.subtitle} gutterBottom>
                        ลบ
                </Typography>
                    {/* form ของ ปุ่มลบ */}
                    <form noValidate onSubmit={handleSubmitRemove}>
                        <Grid container spacing={1}>
                            <Grid item xs={9} md={10}>
                                <TextField
                                    component={Paper}
                                    variant="outlined"
                                    fullWidth
                                    id="animalTypeRemove"
                                    label="กรอกประเภทสัตว์เพื่อลบ"
                                    name="animalTypeRemove"
                                    placeholder="เช่น วัว"
                                    value={remove}
                                    onChange={handleChangeRemove}
                                />
                            </Grid>
                            <Grid item xs={3} md={2} alignItems="stretch" style={{ display: "flex" }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="warning"
                                >
                                    ลบ
              </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container >
        )}
        </div>
    }