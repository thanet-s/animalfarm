import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
}));

export default function Profile() {
    const classes = useStyles();

    return (
        <Container component={Paper} maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.icon}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    บัญชีของฉัน
                </Typography>
                <div className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>
                                ชื่อ: Prayuth Chan-O-Cha
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                หมายเลขโทรศัพท์: 0999999999
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {/* free space */}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
}