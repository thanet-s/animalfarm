import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Nav from './components/Nav'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Type from './pages/Type';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TypeDetail from './pages/TypeDetail'
import Food from './pages/Food';
import FoodDetail from './pages/FoodDetail'
import Animal from './pages/Animal';
import Search from './pages/Search';


import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
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
        position: "relative",
        minHeight: "100vh",
        [theme.breakpoints.up("sm")]: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    contentWarp: {
        paddingBottom: "2.5rem",
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
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.contentWarp}>
                        <Switch>
                            <Route exact path="/">
                                <Dashboard />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/profile">
                                <Profile />
                            </Route>
                            <Route path="/types">
                                <Type />
                            </Route>
                            <Route path="/type/:id">
                                <TypeDetail />
                            </Route>
                            <Route path="/foods">
                                <Food />
                            </Route>
                            <Route path="/food/:id">
                                <FoodDetail />
                            </Route>
                            <Route path="/search">
                                <Search />
                            </Route>
                            <Route path="/animals">
                                <Animal />
                            </Route>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}