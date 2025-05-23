import mqtt from "mqtt";
import { createContext, useEffect, useRef, useState } from "react";
//Urls mqtt
const MQTT_URL = "wss://broker.emqx.io:8084/mqtt";
//const MQTT_URL = "wss://test.mosquitto.org:8081/mqtt";
export const MQTT_TOPIC = "finance-bills-app-localhost-broker";

export const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [message, setMessage] = useState([]);

    const handleMessage = (currentTopic, payload) => {
        if (currentTopic === MQTT_TOPIC) {
            setMessage(JSON.parse(payload.toString()));
        }
    }

    useEffect(() => {
        const mqttClient = mqtt.connect(MQTT_URL);

        mqttClient.on('connect', () => {
            mqttClient.publish(`${MQTT_TOPIC}-parcial-bills`, '.');
        });

        mqttClient.on('error', (e) => {
            console.error(e);
            mqttClient.end();
        });
        mqttClient.subscribe(MQTT_TOPIC);
        mqttClient.on('message', handleMessage);
        setClient(mqttClient);

        return () => {
            if (mqttClient) {
                mqttClient.end();
            }
        }
    }, []);

    return (
        <MQTTContext.Provider value={{ client, message, setMessage }}>
            {children}
        </MQTTContext.Provider>
    )
} 