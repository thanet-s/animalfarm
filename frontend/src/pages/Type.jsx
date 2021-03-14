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
import axios from 'axios';

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
}));

// const rows = array.maps(x) --> array is data from backend , x is ...

export default function Type() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [rows, setRows] = useState([]);
  // var count = 1;
  let id = 1;
  useEffect(() => {
    const fetchData = async () => {
      axios.get('/api/type/types').then(res => {
        if (res.status === 200) {
          setRows(res.data.types);
        } else {
          setRows([]);
        }
      })

    };
    fetchData();
  }, []);

  function handleChange(event) {
    setValue(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (value !== '') {
      axios.post('/api/type/addtype', type).then(res => {
          if(res.status === 200){
            alert(res.data.msg);
            window.location.reload();

          } else{
            alert(res.data.msg);
          }
        });
    } else {
      alert(`กรุณากรอกข้อมูล`);
    }
  }

  const type = { "type": value }

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <Typography variant="h4" component="h1" align='center' gutterBottom>
          ประเภทสัตว์
        </Typography>
        <Typography variant="h5" component="h2" className={classes.subtitle} gutterBottom>
          เพิ่มประเภทสัตว์
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={9} md={10}>
              <TextField
                component={Paper}
                variant="outlined"
                fullWidth
                id="animalType"
                label="ประเภทสัตว์"
                name="animalType"
                placeholder="เช่น วัว"
                value={value}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3} md={2} alignItems="stretch" style={{ display: "flex" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                เพิ่ม
              </Button>
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
                    {id++}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">
                    <Link to={`/type/${row._id}`}>
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