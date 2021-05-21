import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
// import ChatInput from "../../components/ChatInput/ChatInput";
// import ChatLog from "../../components/ChatLog/ChatLog";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Log from "../components/Log";
import Input from "../components/Input";

//로딩바--
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
//로딩바--

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Chat = ({ roomName, userName }) => {
  const classes = useStyles();
  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient("localhost:5000"));
  }, []);

  const myInfo = {
    userId: localStorage.getItem("userId"),
  };
  console.log(myInfo);

  if (currentSocket) {
    currentSocket.on("connect", () => {
      currentSocket.emit("join", myInfo);
    });
  }

  return (
    <Container fixed>
      {currentSocket ? (
        <Paper>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              xs=3
            </Grid>
            <Grid item xs={9}>
              <Log currentSocket={currentSocket} />
              <Input currentSocket={currentSocket} />
            </Grid>
          </Grid>

          {/* <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput> */}
        </Paper>
      ) : (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
};

export default Chat;
