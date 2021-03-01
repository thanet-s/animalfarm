import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  subtitle: {
    marginTop: theme.spacing(2),
  },
}));


export default function TypeDetail() {
  const classes = useStyles();
  const [edit, setEdit] = useState('');
  const [remove, setRemove] = useState('');

  function handleChangeModify(event) {
    setEdit(event.target.value)
  }
  function handleSubmitModify(event) {
    event.preventDefault();
    if (edit !== '') {
      alert('คุณได้เปลี่ยนประเภทสัตว์จาก วัว เป็น : ' + edit);
    } else {
      alert(`กรุณากรอกข้อมูล`);
    }

  }
  function handleChangeRemove(event) {
    setRemove(event.target.value)
  }

  function handleSubmitRemove(event) {
    event.preventDefault();
    if (remove === 'วัว') {
      alert('คุณได้ลบ' + remove);
    } else {
      alert(`กรุณากรอกให้ถูก`)
    }

  }

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <Typography variant="h4" component="h1" align='center' gutterBottom>
          วัว
        </Typography>

        <Typography variant="h5" component="h2" className={classes.subtitle} gutterBottom>
          แก้ไขประเภทสัตว์
        </Typography>
        <form noValidate onSubmit={handleSubmitModify}>
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
                value={edit}
                onChange={handleChangeModify}
              />
            </Grid>
            <Grid item xs={3} md={2} alignItems="stretch" style={{ display: "flex" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                แก้ไข
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h5" component="h2" className={classes.subtitle} gutterBottom>
          ลบ
        </Typography>
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
  );
}