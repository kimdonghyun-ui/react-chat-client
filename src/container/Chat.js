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
import Typography from '@material-ui/core/Typography';
import Loading from "../components/Loading";
import FriendList from "../components/Friend/FriendList";
import Divider from '@material-ui/core/Divider';

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
            <Grid item md={3} xs={12}>
              <Typography variant="h4" gutterBottom>
                친구 리스트
              </Typography>
              <Divider />
              <FriendList />
            </Grid>
            <Grid item md={9} xs={12}>
              <Log currentSocket={currentSocket} />
              <Input currentSocket={currentSocket} />
            </Grid>
          </Grid>

          {/* <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput> */}
        </Paper>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default Chat;
