import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    const navigation = useNavigate();

    const [user,setUser] = useState(null);

    useEffect(()=>{
        const u = localStorage.getItem('user');
        setUser(u);
    })

    const handleLogout=()=>{
        localStorage.clear();
        navigation('/login')
    }

    return (
        <nav>
            <div>
                <h2 className='navhead'>SpendWise</h2>
            </div>
            <div>
                <ul className={clicked ? "navbar active" : "navbar"}>
                    {
                        user && <li><Link to="/">DashBoard</Link></li>
                    }
                    {
                        user && <li><Link to="/incomes">Incomes</Link></li>
                    }
                    {
                        user && <li><Link to="/expenses">Expenses</Link></li>
                    }
                    {
                        !user && <li><Link to="/login">Login</Link></li>
                    }
                    {
                        !user && <li><Link to="/register">Register</Link></li>
                    }
                    {
                        user && <li><a onClick={handleLogout} className='logout'>Logout</a></li>
                    }
                </ul>
            </div>

            <div id='mobile' onClick={handleClick}>
                <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
        </nav>
    );
}

export default Navbar;
