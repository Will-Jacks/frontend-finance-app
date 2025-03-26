import Banks from "../components/Banks/Banks";
import Headers from "../components/Headers/Header";

export default function BankInfo() {

    return (
        <>
            <Headers />
            <Banks
                title="Santander"
                message="santander"
            />
            <Banks
                title="Nubank"
                message="nubank"
            />
        </>
    )
}