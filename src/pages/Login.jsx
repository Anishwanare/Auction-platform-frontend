import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeadingTitle from '@/custom-components/HeadingTitle';
import { login } from '@/store/slices/userSlice';

const Login = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.User);
    const { isSuperAdminAuthenticated } = useSelector((state) => state.SuperAdmin);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        dispatch(login(formData));
    };

    useEffect(() => {
        if (isAuthenticated || isSuperAdminAuthenticated) {
            navigateTo('/');
        }
    }, [isAuthenticated, isSuperAdminAuthenticated, navigateTo]);

    return (
        <section className="bg-gray-200 w-full min-h-screen py-20 lg:pl-[320px] flex flex-col items-center ">
            <div className="bg-white max-w-3xl shadow-lg md:mx-auto w-full h-auto px-8 py-8 flex flex-col gap-6 rounded-lg mx-20">
                <div className="flex items-center justify-center">
                    <HeadingTitle content="Login" color="#3c2bd6" />
                </div>
                <form className="flex flex-col gap-6 " onSubmit={handleLogin}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-[16px]">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[16px]">Password:</label>
                            <div className="flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-blue-500 flex-1"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleShowPassword}
                                    className="ml-2 text-blue-800 hover:underline"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-600 text-white text-lg py-2 rounded-md transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
