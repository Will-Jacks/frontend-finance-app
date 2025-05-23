// src/components/NavBar.jsx
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    const location = useLocation();

    const tabs = [
        { label: <FontAwesomeIcon icon={faHouse} />, path: '/' },
        { label: <FontAwesomeIcon icon={faSquarePollVertical} />, path: '/generalBills' },
        { label: <FontAwesomeIcon icon={faCalendar} />, path: '/months' },
    ];

    return (
        <nav className="bottom-nav">
            {tabs.map((tab) => (
                <Link
                    key={tab.path}
                    to={tab.path}
                    className={`nav-item ${location.pathname === tab.path ? 'active' : ''}`}
                >
                    {tab.label}
                </Link>
            ))}
        </nav>
    );
}

export default NavBar;
