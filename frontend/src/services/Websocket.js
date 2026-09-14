import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;
export const connectWebSocket = (groupId,token, onMessage)=>{
    stompClient = new Client ({
        webSocketFactory: () => {
            return new SockJS("http://localhost:8080/ws");
        },
        connectHeaders: {
            Authorization: `Bearer ${token}`
        },
        reconnectDelay: 5000,
        onConnect:() => {
            console.log("Websocket Connected");
            stompClient.subscribe(
                `/topic/group.${groupId}`,
                (message) =>{
                    const receivedMessage = JSON.parse(message.body);
                    console.log("Message Received:", receivedMessage);
                    onMessage(receivedMessage);
                }
            );
        },
        onStompError: (frame) => {
            console.error("STOMP error:", frame);
        },
        onWebSocketError: (error) =>{
            console.error("Websocket error:", error);
        }
    });
    stompClient.activate();
};

export const disconnectWebsocket= () =>{
    if(stompClient){
        stompClient.deactivate();
        stompClient=null;
        console.log("Websocket disconnected");
    }
};