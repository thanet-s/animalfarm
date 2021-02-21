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
function createData(id, name) {
  return { id, name, };
}

const rows = [
  createData(1, 'Frozen yoghurt'),
  createData(2, 'Ice cream sandwich'),
  createData(3, 'Eclair'),
  createData(4, 'Cupcake'),
  createData(5, 'Gingerbread'),
];

export default function Food() {
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
          อาหาร
        </Typography>
        <Typography variant="h5" component="h2" className={classes.subtitle} gutterBottom>
          เพิ่มอาหาร
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={9} md={10}>
              <TextField
                component={Paper}
                variant="outlined"
                fullWidth
                id="food"
                label="อาหาร"
                name="food"
                placeholder="เช่น มะนาว"
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
          อาหารทั้งหมด
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{ "fontWeight":"1000"}}>
                <TableCell style={{ "fontWeight":"1000"}}>ลำดับ</TableCell>
                <TableCell style={{ "fontWeight":"1000"}}>อาหาร</TableCell>
                <TableCell style={{ "fontWeight":"1000"}} align="right">แก้ไข</TableCell>
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
                    <Link to={`/food/${row.id}`}>
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