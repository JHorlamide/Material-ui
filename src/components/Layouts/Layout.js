import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { format } from 'date-fns';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },

    drawer: {
      width: drawerWidth,
    },

    drawerPaper: {
      width: drawerWidth,
    },

    root: {
      display: 'flex',
    },

    active: {
      background: '#f4f4f4',
    },

    title: {
      padding: theme.spacing(2),
    },

    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },

    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color='secondary' />,
      path: '/notes',
    },
    {
      text: 'Create Notes',
      icon: <AddCircleOutlineOutlined color='secondary' />,
      path: '/create',
    },
  ];

  return (
    <div className={classes.root}>
      {/* App Bar */}
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
            To day is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar src='/mario-av.png' className={classes.avatar} />
        </Toolbar>
      </AppBar>

      {/* Side Draw */}
      <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant='h5' className={classes.title}>
            Ninja Notes
          </Typography>
        </div>

        {/* List / Links */}
        <List>
          {menuItems.map((item) => {
            return (
              <ListItem
                key={item.text}
                button
                onClick={() => history.push(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Pages Content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
