import React, { useState } from 'react';
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
// If x = y : prinT(kuy)
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
function createData(id, name) {
    return { id, name, };
}
// for i in range()
const rows = [
    createData(1, 'Frozen yoghurt'),
    createData(2, 'Ice cream sandwich'),
    createData(3, 'Eclair'),
    createData(4, 'Cupcake'),
    createData(5, 'Gingerbread'),
];

export default function Type() {
    const classes = useStyles();
    const [value, setValue] = useState('');
    function handleChange(event) {
        setValue(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (value !== '') {
            alert('A name was submitted: ' + value);
        } else {
            alert(`กรุณากรอกข้อมูล`);
        }

    }
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
                                    // value={age}
                                    onChange={handleChange}
                                    label="animalType"
                                >
                                    <MenuItem value="">
                                        <em>เลือกประเภทสัตว์</em>
                                    </MenuItem>
                                    <MenuItem value={10}>วัว</MenuItem>
                                    <MenuItem value={20}>กระต่าย</MenuItem>
                                    <MenuItem value={30}>หมู</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} alignItems="stretch" >
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">อาหาร</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    // value={age}
                                    onChange={handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>เลือกอาหารสัตว์</em>
                                    </MenuItem>
                                    <MenuItem value={10}>แครรอท</MenuItem>
                                    <MenuItem value={20}>หญ้าสีเขียว</MenuItem>
                                    <MenuItem value={30}>เพ็ดดีกรี</MenuItem>
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
                                <TableCell style={{ "fontWeight": "1000" }}>ประเภทสัตว์</TableCell>
                                <TableCell style={{ "fontWeight": "1000" }} align="right">แก้ไข</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" align="left">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">
                                        <Link to={`/animalsdetail/${row.id}`}>
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