/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Input from '../../component/Input/Input';
import { Context } from '../../Context/Context';
import blob from '../../Image/blob.svg';
import './login.css';

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const [authErr, setAuthErr] = useState(false);
    const { dispatch, isFetching } = useContext(Context);

    const inputs = [
        {
            id: 1,
            label: 'Username',
            name: 'username',
            placeholder: 'Username',
            type: 'text',
            required: true,
            errMsg: 'Username is required!',
        },
        {
            id: 2,
            label: 'Password',
            name: 'password',
            placeholder: 'Enter password',
            type: 'password',
            required: true,
            errMsg: 'This field is required!',
        },
    ];

    const nevigete = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        width: '15rem',
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // submit func
    const handleSub = async (e) => {
        e.preventDefault();

        try {
            dispatch({ type: 'LOGIN_START' });
            const res = await axios.post('https://weblog-backend.onrender.com/api/auth/login', {
                username: values.username,
                password: values.password,
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.message });
            nevigete('/');

            Toast.fire({
                icon: 'success',
                title: 'Log in successfully',
            });
        } catch (err) {
            setAuthErr(true);
            dispatch({ type: 'LOGIN_FAILURE' });
            setValues({
                password: '',
            });
        }
    };

    return (
        <div className=" loginForm">
            <img src={blob} alt="ss" />
            <div className="body_form">
                <div className="fform ">
                    <h3>Login Hare</h3>
                    <form onSubmit={handleSub}>
                        {inputs.map((input) => (
                            <Input
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={handleChange}
                            />
                        ))}
                        <button
                            type="submit"
                            className="mb-2 submit_btn"
                            disabled={isFetching}
                            style={{
                                position: 'relative',
                                cursor: isFetching ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {isFetching ? 'Loading..' : 'Log In'}
                        </button>
                        {authErr && (
                            <p style={{ margin: '5px 0' }} className="error">
                                Authentication failed!
                            </p>
                        )}
                        <Link to="/signup">Do not have account? signup hare..</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;
