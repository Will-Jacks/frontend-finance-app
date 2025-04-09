import mqtt from "mqtt";

const url = "wss://broker.emqx.io:8084/mqtt";
//const url2 = "wss://test.mosquitto.org:8081/mqtt";

function connectMQTTBroker(url) {
    const client = mqtt.connect(url);
    client.on('connect', () => {
        return;
    });
    client.on('error', (error) => console.log(error));

    return client;
}
export const client = connectMQTTBroker(url);
export const topic = "finance-bills-app";