import MaterialUICollapseMenu from 'material-ui-collapse-menu'
import React, { Fragment, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import {
    Link as RouterLink,
} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

export default function Nav(props) {
    const [items] = useState([
        {
            "id": 1,
            "title": "",
            "items": [
                {
                    "id": "dashboard",
                    "icon": "dashboard",
                    "name": "สรุป",
                    "link": "/"
                }
            ]
        },
        {
            "id": 2,
            "title": "",
            "items": [
                {
                    "id": "manage",
                    "icon": "border_color",
                    "name": "การจัดการ",
                    "subitems": [
                        {
                            "id": "manage1",
                            "icon": "category",
                            "name": "ประเภทสัตว์",
                            "link": "/types"
                        },
                        {
                            "id": "manage2",
                            "icon": "restaurant",
                            "name": "อาหารสัตว์",
                            "link": "/foods"
                        },
                        {
                            "id": "manage3",
                            "icon": "pets",
                            "name": "สัตว์",
                            "link": "/animals"
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "title": "",
            "items": [
                {
                    "id": "search",
                    "icon": "search",
                    "name": "ค้นหาสัตว์",
                    "link": "/search"
                }
            ]
        }
    ])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
            color: "#FFFFFF",
        },
        user: {
            color: "#FFFFFF",
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
            color: "#FFFFFF",
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
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <MaterialUICollapseMenu items={items} />
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Fragment className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component={Link} underline='none' href='/' variant="h5" className={classes.title} noWrap>
                        AnimalFarm
                    </Typography>
                    
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="menubar">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </Fragment >
    )
};