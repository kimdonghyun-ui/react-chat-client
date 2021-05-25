import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const friend_data = [
  {
    name: "dongdong",
    img: "https://material-app.bootlab.io/static/img/avatars/avatar-1.jpg",
  },
  {
    name: "fogtime",
    img: "https://material-app.bootlab.io/static/img/avatars/avatar-1.jpg",
  },
  {
    name: "fotlove",
    img: "https://material-app.bootlab.io/static/img/avatars/avatar-1.jpg",
  },
  {
    name: "parksh85",
    img: "https://material-app.bootlab.io/static/img/avatars/avatar-1.jpg",
  },
];



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


const FriendList = () => {
    const classes = useStyles();

    return (
      <List className={classes.root}>
        {friend_data.map((data, idx) => (
          <ListItem key={idx} button>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={data.img} />
            </ListItemAvatar>
            <ListItemText primary={data.name} secondary={data.txt} />
          </ListItem>
        ))}
    </List>
    );
};

export default FriendList;