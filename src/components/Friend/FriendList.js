import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';





const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


const FriendList = ({allusers,friend}) => {
    const classes = useStyles();
  console.log('allusers',allusers)
  console.log('friend', friend)



  function isApple(element, number) {
    let res =[]
    for (var i = 0; i < number.length; i++) {
      res.push(element.filter(it => it.number.includes(number[i])));
    }

    return res;

  }

  console.log(isApple(allusers,friend)[0])
    return (
      <List className={classes.root}>
        {isApple(allusers,friend).map((data, idx) => (
          <ListItem key={idx} button>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={data[0].img} />
            </ListItemAvatar>
            <ListItemText primary={data[0].id} />
          </ListItem>
        ))}
    </List>
    );
};

export default FriendList;