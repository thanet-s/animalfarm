import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    subtitle: {
        marginTop: theme.spacing(2),
    },
    table: {
        minWidth: 300,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));


export default function Type() {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [types, setTypes] = useState([{ _id: 1, name: "ทั้งหมด" }]);
    const [type, setType] = useState("");
    const [show, setShow] = useState([]);
    const [foods, setFoods] = useState([{ _id: 1, name: "ทั้งหมด" }]);
    const [food, setFood] = useState("");
    const [rows, setRows] = useState([]);
    let id = 1;

    function handleChange(event) {
        setValue(event.target.value)
    }
    function handleChangeType(event) {
        setType(event.target.value)
    }
    function handleChangeFood(event) {
        setFood(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();
        if(type !== "" && food !== ""){
           
            const alldata = {
                "type":type,
                "food":food,
                "name":value
            }
            axios.post("/api/search", alldata).then(res => {
                if(res.status === 200){
                    setShow(res.data.animals);
                    
                } else{
                  alert(res.data.msg);
                }
              });
        } else{
            alert("กรุณาเลือกประเภทสัตว์ และอาหารสัตว์");
        }
    }

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
                    setFoods(res.data.foods);

                }
            })

        };
        fetchtype();
        fetchfood();

    }, []);
    
    return (
        <Container maxWidth="xl">
            <div className={classes.root}>
                <Typography variant="h4" component="h1" align='center' gutterBottom>
                    ค้นหาสัตว์
                </Typography>
                <Typography variant="h5" component="h3" align='left' gutterBottom>
                    เลือกประเภทสัตว์/เลือกอาหารสัตว์/กรอกชื่อสัตว์
                </Typography>

                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={4} alignItems="stretch" >
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">ประเภทสัตว์</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={handleChangeType}
                                    label="animalType"
                                >
                                    <MenuItem value="1">
                                        <em>ทั้งหมด</em>
                                    </MenuItem>
                                    {types.map((t) => (
                                        <MenuItem value={t._id}>{t.name}</MenuItem>
                                    ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} alignItems="stretch" >
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">อาหาร</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={handleChangeFood}
                                    label="Age"
                                >
                                    <MenuItem value="1">
                                        <em>ทั้งหมด</em>
                                    </MenuItem>
                                    {foods.map((f) => (
                                        <MenuItem value={f._id}>{f.name}</MenuItem>
                                    ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2} lignItems="stretch" >
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="animalType"
                                    label="ชื่อสัตว์"
                                    name="animalType"
                                    placeholder="เช่น บอยอุบล"
                                    value={value}
                                    onChange={handleChange}
                                />
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} md={2} alignItems="stretch" >
                            <FormControl variant="outlined" className={classes.formControl} >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    startIcon={<SearchIcon />}
                                >
                                    ค้นหา
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
                <Typography variant="h5" component="h2" className={classes.subtitle} gutterBottom>
                    ประเภทสัตว์ทั้งหมด
                </Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ "fontWeight": "1000" }}>ลำดับ</TableCell>
                                <TableCell style={{ "fontWeight": "1000" }}>ชื่อสัตว์</TableCell>
                                <TableCell style={{ "fontWeight": "1000" }} align="right">แก้ไข</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {show.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" align="left">
                                        {id++}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">
                                        <Link to={`/animal/${row._id}`}>
                                            <Button
                                                variant="contained"
                                                color="secondary">
                                                <EditIcon />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container >
    );
}