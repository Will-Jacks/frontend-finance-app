import mqtt from "mqtt";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

//Urls mqtt
const MQTT_URL = "wss://broker.emqx.io:8084/mqtt";
//const MQTT_URL = "wss://test.mosquitto.org:8081/mqtt";
export const MQTT_TOPIC = "finance-bills-app";//-localhost-broker";

export const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const mqttClient = mqtt.connect(MQTT_URL);

        mqttClient.on('connect', () => {
            setIsConnected(true);
        });

        mqttClient.on('error', () => {
            toast.error('Erro! Reinicie a página');
            mqttClient.end();
        });

        mqttClient.on('offline', () => {
            setIsConnected(false);
        });

        setClient(mqttClient);

        return () => {
            if (mqttClient) {
                mqttClient.end();
            }
        }
    }, []);

    return (
        <MQTTContext.Provider value={{ client, isConnected }}>
            {children}
        </MQTTContext.Provider>
    )
} 