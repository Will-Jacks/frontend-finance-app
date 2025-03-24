import axios from "axios";
import Headers from "../components/Headers/Header";
import { useEffect } from "react";


export default function Banks() {
    const urlSLivia = "http://10.0.0.151:8080/conta/filter?comprador=livia&banco=santander";   
    
    async function fetchUrl(url) {
        const response = await axios.get(url);
        const data = await response.data;
        if(data) {
            console.log(data);
        }
    }

    useEffect(()=> {
        fetchUrl(urlSLivia);
    }, []);

    
    return(
        <>
            <Headers />
            <div>
                <h2>Santander</h2>
                <p>Lívia: </p>
                <p>William: </p>
                <p>Miriam: </p>
            </div>
        </>
    )
}