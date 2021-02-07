import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Nav from './components/Nav'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';


import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function App() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <Nav />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/animal">
                            <h1>animal</h1>
                        </Route>
                        <Route path="/animalrecord">
                            <h1>animalrecord</h1>
                        </Route>
                        <Route path="/search">
                            <h1>search</h1>
                        </Route>
                    </Switch>
                    <Footer />
                </main>
            </div>
        </Router>
    );
}