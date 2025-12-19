// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, loading } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = await login(email, password);
        if (role) navigate('/dashboard');
    };

    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body, html {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                #root {
                    width: 100%;
                    height: 100%;
                }

                .main-wrapper {
                    width: 100vw;
                    height: 100vh;
                    position: fixed;
                    top: 0;
                    left: 0;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    background: linear-gradient(
                        rgba(0, 0, 0, 0.4),
                        rgba(0, 0, 0, 0.4)
                    ),
                    url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1973&q=80');
                    background-size: cover;
                    background-position: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                /* ✅ CONTENEUR DE CENTRAGE */
                .login-page {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .login-container {
                    width: 550px;
                    max-width: 90%;
                    padding: 30px 45px;
                    border-radius: 25px;

                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

                    animation: slideIn 0.6s ease-out;
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .logo {
                    text-align: center;
                    margin-bottom: 15px;
                }

                .logo-image {
                    max-width: 180px;
                }

                .company-slogan {
                    text-align: center;
                    color: white;
                    margin-bottom: 20px;
                }

                h2 {
                    color: white;
                    text-align: center;
                }

                .description {
                    text-align: center;
                    color: rgba(255,255,255,0.85);
                    margin-bottom: 20px;
                }

                .input-group {
                    margin-bottom: 15px;
                }

                .input-group label {
                    color: white;
                    display: block;
                    margin-bottom: 8px;
                }

                .input-group input {
                    width: 100%;
                    padding: 14px;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.3);
                    background: rgba(255,255,255,0.15);
                    color: white;
                }

                .input-group input:focus {
                    outline: none;
                    border-color: #C7541F;
                    box-shadow: 0 0 0 3px rgba(199,84,31,0.3);
                }

                .btn-login {
                    width: 100%;
                    padding: 15px;
                    border: none;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #C7541F, #E06B3A);
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                }

                .forgot-password {
                    text-align: center;
                    margin-top: 15px;
                }

                .forgot-password a {
                    color: #E06B3A;
                    text-decoration: none;
                }
            `}</style>

            <div className="main-wrapper">
                <div className="login-page">
                    <div className="login-container">
                        <div className="logo">
                            <img src="/logo.png" alt="GBI" className="logo-image" />
                        </div>

                        <p className="company-slogan">
                            Global Business Immo, un service à juste valeur
                        </p>

                        <h2>Connexion Employé</h2>
                        <p className="description">Accès sécurisé à l'administration</p>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>E-mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Mot de passe</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button className="btn-login">
                                Se connecter
                            </button>

                            <div className="forgot-password">
                                <a href="#">Mot de passe oublié ?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
