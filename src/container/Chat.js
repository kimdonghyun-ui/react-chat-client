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
// import member from '../../public/data/member'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [allusers, setAllUsers] = useState(null);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const [currentSocket] = useState(socketIOClient("localhost:5000"));

  const myInfo = {
    userId: localStorage.getItem("userId"),
  };
  console.log(myInfo);

const fetchUsers = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setAllUsers(null);
      //loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get('http://localhost:3000/data/member.json');
      setAllUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
      setMe(isApple(response.data.data, localStorage.getItem("userId"))[0]);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };



function isApple(element,id)  {
  let res = element.filter(it => it.id.includes(id));
  return res;
}

  useEffect(() => {
    fetchUsers();

    if (currentSocket) {
      currentSocket.on("connect", () => {
        currentSocket.emit("join", myInfo);
      });
      console.log('소켓연결')
    }

  }, [currentSocket]);







  if (loading) return <Loading />;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!allusers) return null;
console.log(me)
  return (
    <Container fixed>

        <Paper>
          <Grid container spacing={0}>
            <Grid item md={3} xs={12}>
              <Typography variant="h4" gutterBottom>
                {/* 친구 리스트 */}
              </Typography>
              <Divider />
              <FriendList allusers={allusers.data} friend={me.friend} />
            </Grid>
            <Grid item md={9} xs={12}>
              <Log currentSocket={currentSocket} />
              <Input currentSocket={currentSocket} />
            </Grid>
          </Grid>

          {/* <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput> */}
        </Paper>

    </Container>
  );
};

export default Chat;
