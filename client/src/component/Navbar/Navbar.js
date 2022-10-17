/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useState } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import noPhoto from '../../Image/no-photo.png';
import './navbar.css';

const Navbar = () => {
    const [toggler, setToggler] = useState(false);
    const [inpVal, setInpVal] = useState('');
    const { user, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
        setToggler(false);
    };

    const handleClick2 = () => {
        navigate('/');
    };

    const logOut = () => {
        // setUser(false);
        setToggler(false);
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const handleChange = (e) => {
        setInpVal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inpVal);
    };

    return (
        <div className="navbar">
            <div className="navbar_main">
                <div className="nav_brand">
                    <h5 onClick={handleClick2}>
                        WE<span style={{ color: '#FB2576' }}>BLOG</span>
                    </h5>
                </div>

                <div className="nav_right">
                    <div className="search">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search.."
                                value={inpVal}
                                onChange={handleChange}
                            />
                            <button type="submit">
                                <FaSearch className="search_icon" />
                            </button>
                        </form>
                    </div>

                    <div className="nav_menu">
                        <NavLink to="/">
                            <a href="">Home</a>
                        </NavLink>
                        <NavLink to="/seetings">
                            <a href="">Profile</a>
                        </NavLink>
                        <NavLink to="/write">
                            <a href="">Post</a>
                        </NavLink>
                        {user && (
                            <NavLink to={`users/?user=${user.username}`}>
                                <a href="">My Posts</a>
                            </NavLink>
                        )}
                    </div>

                    {/* nav reg sec */}
                    <div className="nav_reg">
                        {user ? (
                            <>
                                <img
                                    onClick={() => navigate('/seetings')}
                                    className="profilePic"
                                    src={user.profilepic ? user.profilepic : noPhoto}
                                    alt=""
                                />
                                <button type="button" onClick={logOut}>
                                    Log out
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={handleClick}>
                                Log in
                            </button>
                        )}
                    </div>

                    {/* for responsive device */}
                    <div className="res_navbar">
                        {toggler ? (
                            <BiX size={29} onClick={() => setToggler(false)} />
                        ) : (
                            <BiMenu size={29} onClick={() => setToggler(true)} />
                        )}
                        {toggler && (
                            <div className="res_nav_menu">
                                <NavLink to="/">
                                    <a onClick={() => setToggler(false)} href="">
                                        Home
                                    </a>
                                </NavLink>
                                <NavLink to="/">
                                    <a onClick={() => setToggler(false)} href="">
                                        About
                                    </a>
                                </NavLink>
                                <NavLink to="/seetings">
                                    <a onClick={() => setToggler(false)} href="">
                                        User
                                    </a>
                                </NavLink>
                                <NavLink to="/write">
                                    <a onClick={() => setToggler(false)} href="">
                                        Write
                                    </a>
                                </NavLink>
                                {user && (
                                    <NavLink to={`users/?user=${user.username}`}>
                                        <a href="#" onClick={() => setToggler(false)}>
                                            My Posts
                                        </a>
                                    </NavLink>
                                )}

                                <div className="res_nav_reg">
                                    {user ? (
                                        <button type="button" onClick={logOut}>
                                            Log out
                                        </button>
                                    ) : (
                                        <button type="button" onClick={handleClick}>
                                            Log In
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
