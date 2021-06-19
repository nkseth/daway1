import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import { Image } from 'react-bootstrap'
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../asserts/logo5.png';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Navi from '../home/navbar'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const Navbar = () => {
    const classes = useStyles();
    const [menu, setmenu] = useState(false);
    const [state, setState] = React.useState(false);
    const mwnuwidth = window.innerWidth
    console.log(mwnuwidth)
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };


    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <>
            <Navi />
            <div style={{
                height: '10vh',
                backgroundColor: 'white', display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center', boxShadow: '0px 0.5px 3px gray',


            }}
            >


                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <div className="ml-2 " style={{
                        zIndex: '120',
                        display: mwnuwidth < 800 ? 'flex' : 'none',
                    }}

                    >

                        <MenuIcon onClick={toggleDrawer(true)} />
                    </div>
                    <div style={{ height: '4vh', width: '15vh', display: 'flex', alignItems: 'center' }} >
                        <Image src={logo} fluid style={{
                            width: '100%',
                            height: '100%'
                        }} />
                    </div>
                    <SwipeableDrawer

                        open={state}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        {list()}
                    </SwipeableDrawer>
                </div>
                <div
                    style={{ display: mwnuwidth > 800 ? 'flex' : 'none', }}>
                    <div className='ml-3'>
                        Home
                    </div>
                    <div className='ml-3'>
                        About
                    </div>
                    <div className='ml-3'>
                        Home
                    </div>
                    <div className='ml-3'>
                        Home
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar
