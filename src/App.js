import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl, IconButton} from "@material-ui/core";
import Message from "./Message"
import db from './firebase';
import firebase from 'firebase';
import {Send as SendIcon} from "@material-ui/icons";
import FlipMove from 'react-flip-move';

const useStyles = makeStyles({
    form: {
        display: "flex",
        flexDirection: "row",
        width: "90%",
        position: "fixed",
        bottom: "5%",
        margin: "0 auto",
        right: 0,
        left: 0,
        padding: 20,
        background: "rgba(128,128,128,.25)",
        borderRadius: 10,
        zIndex: 1
    },
    flipMove: {
        display: "flex",
        flexDirection: "column-reverse"
    }
})


function App() {
    const [input, setInput] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [username, setUsername] = React.useState('');

    const classes = useStyles();
    const scroller = React.useRef();


    React.useEffect(() => {
        db.collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => ({id: doc.id, message: doc.data()})))
            });
    }, []);

    React.useEffect(() => {
        setUsername(prompt("Please enter your username"));
    }, []);

    React.useEffect(() => {
        scroller.current.scrollIntoView();
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection('messages').add({
            message: input,
            username: username || "Anonymous",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
    }


    return (
        <div className="App">

            <form>
                <FormControl classes={{root: classes.form}}>
                    <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} label="Send a message" />
                    <IconButton disabled={!input} type="submit" onClick={sendMessage} variant="contained" color="primary">
                        <SendIcon/>
                    </IconButton>
                </FormControl>
            </form>

            <FlipMove className={classes.flipMove}>
                 {
                    messages.map(({id, message}) => (
                        <Message key={id} username={username} message={message}/>
                    ))
                }
            </FlipMove>
           
            <div ref={scroller} />
        </div>
    );
}

export default App;
