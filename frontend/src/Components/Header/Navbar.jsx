import React from 'react';
import '../Header/navbar.css'
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="sticky-top navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd', paddingLeft: '2rem' }}>
            <NavLink to="/" className={`navbar-brand hover-effect ${isActive('/') ? 'active-link' : ''}`} style={{padding:'5px'}}>
                Edu Connect
            </NavLink>
            <div className={`btn-group ${isActive('/students') || isActive('/students/_add') ? 'active-link' : ''}`} style={{ marginLeft: '10px' }}>
                <button className="btn btn-secondary hover-effect dropdown-toggle" style={{ backgroundColor: '#e3f2fd', color: 'black', border: 'none' }} type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                    Student dropdown
                </button>
                <ul className={`dropdown-menu ${isActive('/students') || isActive('/students/_add') ? 'active-link' : ''}`} aria-labelledby="defaultDropdown">
                    <li>
                        <NavLink to="/students" className={`dropdown-item hover-effect ${isActive('/students') ? 'active-link' : ''}`}>
                            Students
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/students/add" className={`dropdown-item hover-effect ${isActive('/students/add') ? 'active-link' : ''}`}>
                            Add Students
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className={`btn-group ${isActive('/courses') || isActive('/courses/_add') ? 'active-link' : ''}`} style={{ marginLeft: '10px' }}>
                <button className={`btn btn-secondary hover-effect dropdown-toggle ${isActive('/courses') || isActive('/courses/_add') ? 'active-link' : ''}`} style={{ backgroundColor: '#e3f2fd', color: 'black', border: 'none' }} type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                    Courses dropdown
                </button>
                <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                    <li>
                        <NavLink to="/courses" className={`dropdown-item hover-effect`}>
                            Courses
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/courses/_add" className='dropdown-item hover-effect'>
                            Add Courses
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
