import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";


import InputBase from "@material-ui/core/InputBase";




import SendIcon from "@material-ui/icons/Send";
const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    background: "#fff",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

const Input = ({currentSocket}) => {
  const classes = useStyles();

    const [chatMessage, setChatMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    currentSocket.emit("onSend", {
      userId: localStorage.getItem("userId"),
      msg: chatMessage,
      timeStamp: new Date().toLocaleTimeString(),
    });
    setChatMessage("");
  };

  const onChatMessageChange = (e) => {
    setChatMessage(e.target.value);
    console.log(chatMessage)
  };




  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <form className="ChatInput-form" onSubmit={handleSubmit}>
        <InputBase
          className={classes.input}
          placeholder="메시지 입력해주세요"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={onChatMessageChange}
          value={chatMessage}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SendIcon />
          </IconButton>
          </form>
      </Toolbar>
    </AppBar>
  );
};

export default Input;
