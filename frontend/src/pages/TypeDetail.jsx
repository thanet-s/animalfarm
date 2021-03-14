import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useParams, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  subtitle: {
    marginTop: theme.spacing(2),
  },
}));


export default function TypeDetail(props) {
  const classes = useStyles();

  const { id } = useParams();
  const [name, setName] = useState("");
  const [namehead, setNameHead] = useState("xxx");
  const [remove, setRemove] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`/api/type/type/${id}`).then(res => {
        if (res.status === 200) {
          setName(res.data.name);
          setNameHead(res.data.name);
        } else {
          alert(res.data.msg);
        }
      });

    };
    fetchData();
    // return () => {
    //   source.cancel("Component got unmounted");
    // };
  }, [props]);

  function handleChangeModify(event) {
    setName(event.target.value)
  }
  const type = { "type": name }

  function handleSubmitModify(event) {
    event.preventDefault();
    if (name !== '') {
      axios.post(`/api/type/edittype/${id}`, type).then(res => {
        if (res.status === 200) {
          alert(`คุณได้เปลี่ยนประเภทสัตว์จาก ${namehead} เป็น : ` + name);
          window.location.reload();
        } else {
          alert("err")
        }
      });

    } else {
      alert(`กรุณากรอกข้อมูล`);
    }

  }
  function handleChangeRemove(event) {
    setRemove(event.target.value)
  }

  function handleSubmitRemove(event) {
    event.preventDefault();
    if (remove === namehead) {
      axios.post(`/api/type/removetype/${id}`).then(res => {
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

  return (
    < div >
      {refresh
        ? (<Redirect to="/types" />)
        : (
          <Container maxWidth="sm">
            <div className={classes.root} >
              <Typography variant="h4" component="h1" align='center' gutterBottom>
                {namehead}
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
                      value={name}
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
            </div >
          </Container >
        )
      }
    </div >
  );
}