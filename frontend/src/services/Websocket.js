import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_URL = "http://localhost:8080/ws";

let stompClient = null;
let connectionStatusCallback = null;

/**
 * Connect to a trip group's WebSocket channel.
 * @param {number} groupId  — The group to subscribe to
 * @param {function} onMessage — Called with each received message object
 * @param {function} [onStatusChange] — Called with "connected" | "connecting" | "disconnected"
 */
export const connectWebSocket = (groupId, onMessage, onStatusChange) => {
    // Disconnect any existing connection first
    disconnectWebSocket();

    connectionStatusCallback = onStatusChange;
    if (onStatusChange) onStatusChange("connecting");

    stompClient = new Client({
        webSocketFactory: () => {
            return new SockJS(WS_URL);
        },
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("WebSocket connected to group", groupId);
            if (connectionStatusCallback) connectionStatusCallback("connected");

            stompClient.subscribe(
                `/topic/group.${groupId}`,
                (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log("Message received:", receivedMessage);
                    onMessage(receivedMessage);
                }
            );
        },
        onDisconnect: () => {
            console.log("WebSocket disconnected");
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

/**
 * Send a message to the connected group.
 * @param {number} groupId — The group to send to
 * @param {string} content — The message text
 */
export const sendMessage = (groupId, content) => {
    if (!stompClient || !stompClient.connected) {
        console.warn("Cannot send message — WebSocket not connected");
        return false;
    }

    stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify({
            groupId: groupId,
            content: content.trim()
        })
    });
    return true;
};

/**
 * Check if WebSocket is currently connected.
 */
export const isConnected = () => {
    return stompClient?.connected ?? false;
};

/**
 * Disconnect the WebSocket cleanly.
 */
export const disconnectWebSocket = () => {
    connectionStatusCallback = null;
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
        console.log("WebSocket disconnected");
    }
};