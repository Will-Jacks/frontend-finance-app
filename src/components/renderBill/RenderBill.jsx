import { useEffect, useState } from "react";

const RenderBill = () => {

    const [responseOfFetchApi, setResponseOfFetchApi] = useState(null);

    const url = "http://10.0.0.151:8080/conta/1";
    const getBill = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        const fetchData = async() => {
            try{
                const data = await getBill(url);
                setResponseOfFetchApi(data);
            }catch(e) {
                console.error(e);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <h1>Testando componente</h1>
            {
                responseOfFetchApi ? (
                    <>
                    <p>Título: {responseOfFetchApi.titulo}</p>
                    <p>Banco: {responseOfFetchApi.banco}</p>
                    <p>Categoria: {responseOfFetchApi.categoria}</p>
                    <p>Valor: {responseOfFetchApi.valor}</p>
                    </>
                )
                    :
                    <p>Objeto não encontrado</p>
            }
        </>
    )
}

export default RenderBill;