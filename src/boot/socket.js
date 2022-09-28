import Vue from "vue";
import socketio from "socket.io-client";
import VueSocketIO from "vue-socket.io";

// export const SocketInstance = socketio("https://api.apps.com.pe");
export const SocketInstance = socketio('https://apipro.apps.com.pe/', {
    path: `/webhookwordpress/websocket`,
    // transports: ["websocket"]
    // namespace: "events"
});
// export const SocketInstance = socketio("http://localhost:7667/socketimpresora");

// Vue.use(VueSocketIO, SocketInstance)
Vue.use(
    new VueSocketIO({
        debug: true,
        connection: SocketInstance
        // options: {path: `${process.env.SOCKETURL_PATCH}`}
    })
);
