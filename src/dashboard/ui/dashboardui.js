import React, { useEffect } from 'react';
import Editprofile from '../editprofile/editprofile'
import clsx from 'clsx';
import Opeen from '../openings/openings'
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
import Postjob from '../postjob/postjob'
import firebase from 'firebase'
import logo from '../../asserts/logo.png'
import logo2 from '../../asserts/logo2.png'

import { Image } from 'react-bootstrap'
import Wallet from '@material-ui/icons/AccountBalanceWallet';
import WorkOutlinedIcon from '@material-ui/icons/WorkOutlined';
import Cardi from '../dashana/cards'
import Applicant from '../applicant/applicant'
import { Button, Avatar, Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { FcWorkflow, FcManager, FcVoicePresentation, FcBriefcase } from "react-icons/fc";
import Poper from './pop'
import { AiOutlineLogout } from "react-icons/ai"

const drawerWidth = 240;
const drawerWidth2 = 70
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
        backgroundColor: 'white',
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

    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxShadow: 'none',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        backgroundColor: 'white',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(6),
        minHeight: '90vh'
    },
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [indexhi, setindexhi] = React.useState(0)
    const [intstatus, setintstatus] = React.useState(false)
    const [loading, setloading] = React.useState(false)
    const [curimg, setimg] = React.useState(logo2)
    const [userdata, setuserdata] = React.useState({})
    const [popstate, setpopstate] = React.useState(false)
    const [popstate1, setpopstate1] = React.useState(false)
    const [anchor, setAnchorEl] = React.useState()
    const defaultProps = {
        color: 'secondary',
        children: <NotificationsIcon />,
    };
    useEffect(() => {
        var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function (snap) {
            if (snap.val() === true) {
                setloading(false)
            } else {
                setloading(true)
            }
        });



        const fetuserdetails = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const papl = await db.collection("companies").doc(currentuser).onSnapshot(data => {
                console.log(data.data())
                setuserdata(data.data())

            })
        }
        fetuserdetails()




    }, [])


    const popi = () => {
        setpopstate(false)
        setAnchorEl(null)
    }
    const popi1 = () => {
        setpopstate1(false)
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
        <div className={classes.root} style={{ position: 'relative', backgroundColor: '#F4F3EF' }}>



            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{ backgroundColor: "#F4F3EF", boxShadow: 'none', borderBottom: '1px solid lightgray', }}

            >
                <Toolbar

                    style={{
                        backgroundColor: 'transparent', display: 'flex',

                        justifyContent: 'space-between', backgroundColor: 'white'
                    }}>
                    <div style={{
                        display: 'flex', alignContent: 'center', textAlign: 'center'
                        , marginLeft: '20px', color: 'black', textTransform: 'capitalize', fontWeight: 'bold',
                        backgroundColor: 'white',

                    }}>

                        <Typography variant="h6" noWrap style={{ fontWeight: 'bold', display: 'flex' }}>
                            {userdata.companyname} <IoIosArrowDroprightCircle style={{ fontSize: "30px", marginLeft: '5px' }} />
                        </Typography>
                    </div>


                    <div style={{ display: 'flex', float: 'right', color: '#183E65', justifyContent: 'center', alignItems: 'center' }}>
                        <Badge badgeContent={2}
                            onClick={(event) => {
                                setAnchorEl(event.currentTarget)
                                setpopstate1(true)
                            }}
                            style={{ cursor: 'pointer' }}
                            {...defaultProps} className='mr-3' />


                        <Avatar src={userdata.logourl} onClick={(event) => {
                            setAnchorEl(event.currentTarget)
                            setpopstate(true)
                        }}
                            style={{ cursor: 'pointer' }}
                        />

                        <Poper open={popstate1} close={popi1} anchor={anchor} position="left" >
                            <div style={{
                                width: "30vh", height: "40vh",

                            }}>
                                <div style={{
                                    maxwidth: '200px',
                                    width: "30vh", height: "10vh", borderBottom: '1px solid lightgray',
                                    padding: '5px',
                                }}>
                                    notification1
                               </div>
                            </div>
                        </Poper>
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
                    {['Dashboard', 'Open Internships', 'View Applicants',
                        'Edit profile']
                        .map(
                            (text, index) => (
                                <ListItem
                                    button key={text} onClick={() => { clicked(index) }} style={{
                                        color: 'gray',
                                        marginTop: "30px", alignItems: 'center', paddingTop: "10px", paddingBottom: "10px"
                                    }}
                                    selected={indexhi === index ? true : false}>

                                    <ListItemIcon style={{ color: 'gray' }} >
                                        {index === 0 ? <FcWorkflow style={indexhi === 0 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> :
                                            index === 1 ? <FcBriefcase style={indexhi === 1 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> :
                                                index === 2 ? <FcVoicePresentation style={indexhi === 2 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> :


                                                    index === 3 ? <FcManager style={indexhi === 5 ? { color: '#183E65', fontSize: "30px" } : { fontSize: "30px" }} /> :
                                                        null}
                                    </ListItemIcon>
                                    <ListItemText primary={text} style={{ fontSize: "3vh", textTransform: 'capitalize' }} />
                                </ListItem>

                            ))}
                </List>





            </Drawer>
            <main key={indexhi} className={classes.content} >


                {indexhi === 0 ? <Cardi userdata={userdata} /> : null}
                {indexhi === 1 ? <Opeen userdata={userdata} /> : null}
                {indexhi === 2 ? <Applicant /> : null}

                {indexhi === 3 ? <Editprofile /> : null}



            </main>
        </div >
    );
}