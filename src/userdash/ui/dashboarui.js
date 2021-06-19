import React, { useEffect } from 'react';

import clsx from 'clsx';
import Feedback from '../feedbackpoints/feedback'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TimelineIcon from '@material-ui/icons/Timeline';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import firebase from 'firebase'
import logo from '../../asserts/logo.png'
import logo2 from '../../asserts/logo2.png'
import Editprofile from '../editprofile/editprofile'
import { Image } from 'react-bootstrap'
import Wallet from '@material-ui/icons/AccountBalanceWallet';
import WorkOutlinedIcon from '@material-ui/icons/WorkOutlined';
import WebIcon from '@material-ui/icons/Web';
import Dashi from '../dashana/cards'
import { Button } from '@material-ui/core'
import Prefercat from '../prefer/preference'
import Viewjob from '../viewjobs/viewjobs'
import Resume from '../resumamake/resumae'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Mycourse from '../mycourses/mycourse'
import Applied from '../appliedintern/appliedintern'
import { IoIosArrowDroprightCircle, } from 'react-icons/io'
import { FcOrgUnit, FcBriefcase, FcRules, FcInspection, FcManager, FcGraduationCap, FcDiploma2 } from 'react-icons/fc'
import Progess from './progress'
import Poper from './pop'
import { Avatar } from "@material-ui/core"
import { AiOutlineLogout } from "react-icons/ai"




const drawerWidth2 = 70
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer,
        width: `calc(100% - ${drawerWidth2}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,

        }),
        backgroundColor: 'white',
        border: '1px solid lightgray',
        boxShadow: 'none',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: '#1b1b1b',
        transition: 'ease-out 1 '

    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,

        }),
        backgroundColor: 'white'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        backgroundColor: 'white'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxShadow: 'none',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [indexhi, setindexhi] = React.useState(0)
    const [intstatus, setintstatus] = React.useState(false)
    const [loading, setloading] = React.useState(false)
    const [userdetails, setuserdetails] = React.useState(null)
    const [popstate, setpopstate] = React.useState(false)
    const [popstate1, setpopstate1] = React.useState(false)
    const [anchor, setAnchorEl] = React.useState()

    useEffect(() => {

        const fetchuserdetails = async () => {
            const db = firebase.firestore()
            const curruser = firebase.auth().currentUser.uid
            const ddi = db.collection('/user').doc(curruser)
            ddi.onSnapshot(snap => {
                const ddi = snap.data()
                console.log(ddi)
                setuserdetails(ddi)
            })

        }
        fetchuserdetails()

    }, [])


    const popi = () => {
        setpopstate(false)
        setAnchorEl(null)
    }

    const setload = (elem) => {
        console.log(elem)
        setloading(elem)

    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const clicked = (inde) => {
        setindexhi(inde)
    }
    return (
        <div className={classes.root} style={{ position: 'relative', backgroundColor: '#F4F3EF', height: "100vh" }}>



            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{
                    backgroundColor: 'white', display: 'flex',
                    boxShadow: 'none',
                    justifyContent: 'space-between', background: "transparent"
                }}>
                    <div style={{
                        display: 'flex', alignContent: 'center', textAlign: 'center'
                        , marginLeft: '20px', textTransform: 'capitalize', fontWeight: 'bold',
                        color: 'black'

                    }}>

                        <Typography variant="h6" noWrap style={{ fontWeight: 'bold', display: 'flex' }}>
                            {userdetails != null ? userdetails.firstname : null}
                            {userdetails != null ? userdetails.lastname : null} <IoIosArrowDroprightCircle style={{ fontSize: "30px", marginLeft: '5px' }} />
                        </Typography>


                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginRight: '10px', flexDirection: 'column', color: 'lightpink', fontSize: "30px", fontWeight: 'bold',
                        }}>
                            B

                        </div>
                        <div style={{ fontWeight: 'bold', color: 'red', fontSize: "30px", borderRadius: "100px" }}>
                            <Progess />
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            <Avatar src={userdetails != null ? userdetails.logourl : null} onClick={(event) => {
                                setAnchorEl(event.currentTarget)
                                setpopstate(true)
                            }}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>

                        <Poper open={popstate} close={popi} anchor={anchor} position="left" >

                            <div
                                style={{ width: '200px', margin: '20px', display: "flex", alignItems: 'center', justifyContent: 'center' }}
                            ><AiOutlineLogout /><Button onClick={() => firebase.auth().signOut()}>Sign Out</Button></div>
                        </Poper>



                    </div>


                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}

                onMouseOver={handleDrawerOpen}
                onMouseLeave={handleDrawerClose}
            >
                <div className={classes.toolbar} style={{ overflowX: 'clip' }}>

                    <Image fluid src={logo} style={{ width: "60px", height: '60px', marginTop: "10px" }} />
                </div>

                <List>
                    {['Dashboard', 'Internships', 'Resume ', "Applied internships",
                        'Edit profile', "My Skills", 'Point table']
                        .map(
                            (text, index) => (
                                <ListItem
                                    button key={text} onClick={() => { clicked(index) }} style={{
                                        color: 'gray',
                                        marginTop: "30px", alignItems: 'center', paddingTop: "10px", paddingBottom: "10px"
                                    }}
                                    selected={indexhi === index ? true : false}>

                                    <ListItemIcon style={{ color: 'gray' }} >
                                        {index === 0 ? <FcOrgUnit style={indexhi === 0 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> :
                                            index === 1 ? <FcBriefcase style={indexhi === 1 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> :
                                                index === 2 ? <FcRules style={indexhi === 2 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> :
                                                    index === 3 ? < FcInspection style={indexhi === 3 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> :

                                                        index === 4 ? <FcManager style={indexhi === 5 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> :
                                                            index === 5 ? < FcGraduationCap style={indexhi === 5 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> : null}
                                        {index === 6 ? <FcDiploma2 style={indexhi === 6 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> : null}
                                    </ListItemIcon>
                                    <ListItemText primary={text} style={{ fontSize: "3vh", textTransform: 'capitalize' }} />
                                </ListItem>

                            ))}
                </List>






            </Drawer>
            <main key={indexhi} className={classes.content}>
                <div className={classes.toolbar} />

                {indexhi === 0 ? <Dashi /> : null}
                {indexhi === 1 ? <div>

                    <Viewjob />
                </div> : null}
                {indexhi === 2 ? <Resume /> : null}
                {indexhi === 3 ? <Applied /> : null}
                {indexhi === 4 ? <Editprofile /> : null}
                {indexhi === 5 ? <Mycourse /> : null}

                {indexhi === 6 ? <Feedback /> : null}


            </main>
        </div >
    );
}