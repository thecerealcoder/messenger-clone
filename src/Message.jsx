import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import clsx from 'clsx';

const useStyles = makeStyles({
    card: {
        maxWidth: "45%",
        width: "fit-content",
        margin: 10,
        padding: "5px !important",
    },
    cardContent: {
        width: "fit-content",
        margin: 10,
        padding: "5px !important",
        wordBreak: "break-all"
    },
    message: {
        marginRight: "auto",
        textAlign: "left",
        color: "black",
        background: "lightgrey"
    },
    userMessage: {
        marginRight: 10,
        marginLeft: "auto",
        textAlign: "left",
        color: "white",
        background: "lightblue"
    },
    userName: {
        padding: "2px 0px 2px 10px",
        marginRight: "auto",
        textAlign: "left",
        color: "gray",
    }
})

const Message = React.forwardRef(({username, message}, ref) => {

    const classes = useStyles();
    const isUser = username === message.username;
    const isAnon = message.username === "Anonymous" && !username;

    return ( 
        <div ref={ref}>
            {
                !isUser && !isAnon &&
                    <div className={classes.userName}>{message.username}</div>
            }
            <Card className={clsx({[classes.message]: true, [classes.userMessage]: isUser || isAnon})} classes={{root: classes.card}}>
                <CardContent classes={{root: classes.cardContent}}>
                    <Typography
                        variant="h5"
                        component="h2"
                    >
                        {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
});

export default Message;