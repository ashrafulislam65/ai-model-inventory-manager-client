import React, { use } from 'react';
import { NavLink, useNavigate } from 'react-router';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('Sign out successful');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/add-model'>Add Model</NavLink></li>
        <li><NavLink to='/models'>All Models</NavLink></li>
        
       
    </>;
    return (
        <div className="navbar md:px-20 bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <NavLink to="/" className="relative overflow-hidden px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-60"></span>
                    <span className="relative flex items-center gap-2">
                         AIM Manager
                    </span>
                </NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {links}
                </ul>
            </div>

            <div className="navbar-end gap-4">
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* User Profile or Login Button */}
                {user ? (
                    // User is logged in - Show profile dropdown
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                                <img
                                    alt={user.displayName || user.name || 'User'}
                                    src={user.photoURL || user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 rounded-box z-50 mt-3 w-64 p-4 shadow-xl border">
                            {/* User Info Section */}
                            <li className="menu-title">
                                <div className="flex flex-col space-y-1">
                                    <span className="font-bold text-lg truncate">
                                        {user.displayName || user.name || 'User'}
                                    </span>
                                    <span className="text-sm text-gray-500 truncate">
                                        {user.email}
                                    </span>
                                </div>
                            </li>

                            <div className="divider my-2"></div>

                            {/* Navigation Links */}
                            <li>
                                <NavLink to="/myModelPurchase" className="justify-between">
                                    <span className="flex items-center gap-2">
                                         Model Purchase
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/myModels" className="justify-between">
                                    <span className="flex items-center gap-2">
                                         My Models
                                    </span>
                                </NavLink>
                            </li>

                            <div className="divider my-2"></div>

                            {/* Settings and Theme */}
                            <li>
                                <details>
                                    <summary className="flex items-center gap-2">
                                        Settings
                                    </summary>
                                    <ul>
                                        <li><a>Profile Settings</a></li>
                                        <li><ThemeToggle /></li>
                                    </ul>
                                </details>
                            </li>

                            <div className="divider my-2"></div>

                            {/* Sign Out */}
                            <li>
                                <button
                                    onClick={handleSignOut}
                                    className="text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                    <span></span>
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    // User is not logged in - Show Login Button
                    <button
                        onClick={handleSignIn}
                        className="relative overflow-hidden px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105"
                    >
                        <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-blue-500 blur-xl opacity-60"></span>
                        <span className="relative flex items-center gap-2">
                             Login
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;