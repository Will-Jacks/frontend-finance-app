import mqtt from "mqtt";
export const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");
export const topic = "finance-bills-app";