import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
// import ChatInput from "../../components/ChatInput/ChatInput";
// import ChatLog from "../../components/ChatLog/ChatLog";

import { makeStyles } from '@material-ui/core/styles';
//const socket = socketIOClient("localhost:5000");
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Chat = ({ roomName, userName }) => {
      const classes = useStyles();
  const myInfo = {
    roomName: roomName ? roomName : localStorage.getItem("roomName"),
    userName: userName ? userName : localStorage.getItem("userName"),
  };
  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient("localhost:5000"));
  }, []);

  if (currentSocket) {
    currentSocket.on("connect", () => {
      currentSocket.emit("join", myInfo);
    });
  }

  return (
    <div>
      {currentSocket ? (
        <>
          {/* <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput> */}
        </>
      ) : (
    <Backdrop className={classes.backdrop} open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>
      )}
    </div>
  );
};

export default Chat;
