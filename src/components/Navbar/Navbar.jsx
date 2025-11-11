import React, { use } from 'react';
import { NavLink } from 'react-router';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                alert('Sign out successful');
            })
            .catch(error => {
                console.log(error);
            });


    }
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/add-model'>Add Model</NavLink></li>
        <li><NavLink to='/models'>View Models</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
        {
            user && <>
                <li><NavLink to='/myModels'>My Models</NavLink></li>
                <li><NavLink to='/myModelPurchase'>My Model Purchase</NavLink></li>


            </>
        }

    </>
    return (
        <div>
            <div className="navbar md:px-20 bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <button className="relative overflow-hidden px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105">
                        <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-blue-500 blur-xl opacity-60"></span>
                        <span className="relative flex items-center gap-2">
                            AIM Manager
                        </span>
                    </button>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>

                <div className="navbar-end gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <ThemeToggle></ThemeToggle>
                        </ul>
                    </div>
                    {
                        user ?
                            <button onClick={handleSignOut} className="relative overflow-hidden px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105">
                                <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-blue-500 blur-xl opacity-60"></span>
                                <span className="relative flex items-center gap-2">
                                    Sign Out
                                </span>
                            </button> :
                            <button className="relative overflow-hidden px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105">
                                <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-blue-500 blur-xl opacity-60"></span>
                                <span className="relative flex items-center gap-2">
                                    Sign In
                                </span>
                            </button>
                    }


                </div>
            </div>
        </div>
    );
};

export default Navbar;