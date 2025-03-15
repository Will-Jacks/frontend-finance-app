import mqtt from "mqtt";
export const client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
export const topic = "finance-bills-app";
//-localhost-broker