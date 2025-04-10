import { useContext } from "react";
import { MQTTContext } from "../context/MQTTContext";

function useMQTT() {
    const context = useContext(MQTTContext);
    if(!context) {
        throw new Error('useMQTT is supposed to be in a MQTTProvider');
    }
    return context;
}

export default useMQTT;