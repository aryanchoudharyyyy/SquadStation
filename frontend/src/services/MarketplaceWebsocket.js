import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_URL = "http://localhost:8080/ws";

let stompClient = null;
let connectionStatusCallback = null;

export const connectMarketplaceWebSocket = (conversationId, onMessage, onStatusChange) => {
    disconnectMarketplaceWebSocket();

    connectionStatusCallback = onStatusChange;
    if (onStatusChange) onStatusChange("connecting");

    stompClient = new Client({
        webSocketFactory: () => {
            return new SockJS(WS_URL);
        },
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("WebSocket connected to marketplace conversation", conversationId);
            if (connectionStatusCallback) connectionStatusCallback("connected");

            stompClient.subscribe(
                `/topic/marketplace.${conversationId}`,
                (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log("Marketplace Message received:", receivedMessage);
                    onMessage(receivedMessage);
                }
            );
        },
        onDisconnect: () => {
            console.log("Marketplace WebSocket disconnected");
            if (connectionStatusCallback) connectionStatusCallback("disconnected");
        },
        onStompError: (frame) => {
            console.error("STOMP error:", frame);
            if (connectionStatusCallback) connectionStatusCallback("disconnected");
        },
        onWebSocketError: (error) => {
            console.error("WebSocket error:", error);
            if (connectionStatusCallback) connectionStatusCallback("disconnected");
        }
    });

    stompClient.activate();
};

export const sendMarketplaceMessage = (conversationId, senderId, content) => {
    if (!stompClient || !stompClient.connected) {
        console.warn("Cannot send message — WebSocket not connected");
        return false;
    }

    stompClient.publish({
        destination: "/app/marketplace.sendMessage",
        body: JSON.stringify({
            conversationId: conversationId,
            senderId: senderId,
            content: content.trim()
        })
    });
    return true;
};

export const isMarketplaceConnected = () => {
    return stompClient?.connected ?? false;
};

export const disconnectMarketplaceWebSocket = () => {
    connectionStatusCallback = null;
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
        console.log("Marketplace WebSocket disconnected");
    }
};
