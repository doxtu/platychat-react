import React from "react";
import { connect } from "react-redux";
import { store } from "../../redux/store";

import {
  convoListResponse,
  setSocket,
  setIsConnected,
} from "../../redux/socket/socket.reducer";
import {
  setConvos,
  setMessageSearchResults,
  setGalleryUrls,
  setSuckCounter,
} from "../../redux/messages/messages.reducer";
import { setUser } from "../../redux/base/base.reducer";

console.warn = () => {};

let hidden, visibilityChange;

if (typeof document.hidden !== undefined) {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

const WebsocketProvider = ({
  user,
  socket,
  isConnected,
  convoListResponse,
  setConvos,
  setSocket,
  setIsConnected,
  setMessageSearchResults,
  setGalleryUrls,
  setSuckCounter,
}) => {
  React.useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = ({ data }) => {
      data = JSON.parse(data);
      const type = data.type;
      const payload = data.payload;

      switch (type) {
        case "login-response": {
          if (!user) return;
          setUser({
            ...user,
            color: payload.color,
          });
          break;
        }
        case "convo-list-response": {
          const normalizedConvos = payload.convos.reduce((acc, d) => {
            acc[d.convoid] = d;
            return acc;
          }, {});
          convoListResponse(normalizedConvos);
          break;
        }
        case "convo-gallery-response": {
          const urls = payload.imageUrls;
          setGalleryUrls(urls);
          break;
        }
        case "convo-create-response": {
          const convos = store.getState().messages.convos;
          setConvos({
            ...convos,
            [payload.convoid]: {
              convoid: payload.convoid,
              convoname: payload.convoname,
            },
          });
          break;
        }
        case "convo-join-response": {
          setConvos({
            ...store.getState().messages.convos,
            [payload.convoid]: {
              ...store.getState().messages.convos[payload.convoid],
              messages: payload.messages,
            },
          });
          break;
        }
        case "convo-message-response": {
          //Nothing yet...
          break;
        }
        case "convo-message-incoming": {
          const convos = store.getState().messages.convos;
          setConvos({
            ...convos,
            [payload.convoid]: {
              ...convos[payload.convoid],
              messages: [
                ...(convos[payload.convoid]["messages"]
                  ? convos[payload.convoid]["messages"]
                  : []),
                {
                  convoid: payload.convoid,
                  todayString: payload.todayString,
                  alias: payload.alias,
                  color: payload.color,
                  timestamp: payload.timestamp,
                  rawtext: payload.rawtext,
                },
              ],
            },
          });
          break;
        }
        case "convo-search-response": {
          setMessageSearchResults(payload.messages);
          break;
        }
        case "convo-image-response": {
          const currentConvoid = store.getState().messages.currentConvoid;
          const user = store.getState().base.user;
          const socket = store.getState().socket.socket;

          if (socket && user && isConnected)
            socket.send(
              JSON.stringify({
                type: "convo-join-request",
                payload: {
                  jwt: user.token,
                  userid: user.uid,
                  convoid: currentConvoid,
                },
              })
            );

          break;
        }
        case "suck-counter-response": {
          setSuckCounter(payload.count);
          break;
        }
        default:
          break;
      }
    };

    //eslint-disable-next-line
  }, [socket, setUser]);

  React.useEffect(() => {
    window.addEventListener("focus", () => {
      //Nothing
    });

    document.addEventListener(visibilityChange, () => {
      //Nothing
    });
  }, []);

  return null;
};

const mapStateToProps = (state) => ({
  user: state.base.user,
  socket: state.socket.socket,
  isConnected: state.socket.isConnected,
  convos: state.messages.convos,
});

const mapDispatchToProps = (dispatch) => ({
  convoListResponse: (convos) => dispatch(convoListResponse(convos)),
  setConvos: (convos) => dispatch(setConvos(convos)),
  setUser: (user) => dispatch(setUser(user)),
  setMessageSearchResults: (messages) =>
    dispatch(setMessageSearchResults(messages)),
  setSocket: (socket) => dispatch(setSocket(socket)),
  setGalleryUrls: (urls) => dispatch(setGalleryUrls(urls)),
  setSuckCounter: (count) => dispatch(setSuckCounter(count)),
  setIsConnected: (isConnected) => dispatch(setIsConnected(isConnected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WebsocketProvider);
