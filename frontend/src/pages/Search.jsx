import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Search() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <div className={classes.root}>
                    <Typography variant="h4" component="h1" align='center' gutterBottom>
                        ค้นหาสัตว์
                    </Typography>
                </div>
            </Container>
        </React.Fragment>
    );
}