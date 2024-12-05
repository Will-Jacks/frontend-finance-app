import BillCreator from "../billCreator/BillCreator";
import "./header.css";

const Header = () => {

    return (
        <header className="header-container">
            <h1 className="header-main-title">Finanças</h1>

            <BillCreator />
        </header>
    )
}

export default Header;