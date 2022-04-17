import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../../assets/background.svg'
import Logo from '../../assets/logo.svg';
import { useState } from 'react';
import api from '../../services/api';
import { setItem } from '../../utils/storage';


function SignIn() {
    const navigate = useNavigate();
    const [erro, setErro] = useState('');
    const [form, setForm] = useState({
        email: '',
        senha: ''
    });

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post('/login', {
                ...form
            });

            const { token, usuario } = response.data;

            setItem('token', token);
            setItem('user', usuario.id)

            if (token) {
                setTimeout(() => {
                    navigate('/home')
                }, 1500)
            }

        } catch (error) {
            setErro(error.response.data.mensagem)
        }
    }

    return (
        <div className='container'>
            <div className='container-login' style={{ backgroundImage: `url(${Background})` }}>
                <div className='container-content-login'>
                    <img src={Logo} alt='logo-mark' />
                    <div className='card-content'>
                        <h1>Controle suas <span>finanças</span>, <br />sem planilha chata.</h1>
                        <h2>
                            Organizar as suas finanças nunca foi tão fácil,<br />
                            com o DINDIN, você tem tudo num único lugar <br />
                            e em um clique de distância.
                        </h2>
                        <Link to='/sign-up'>
                            <button>
                                Cadastre-se
                            </button>
                        </Link>

                    </div>
                    <div className='card-login-sign-in'>
                        <form className='sign-in' onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            <div className='inputs'>
                                <div className='input-email'>
                                    <label>E-mail</label>
                                    <input
                                        name='email'
                                        type='text'
                                        value={form.email}
                                        onChange={handleChangeInputValue}
                                    />
                                </div>
                                <div className='input-password'>
                                    <label>Password</label>
                                    <input
                                        name='senha'
                                        type='password'
                                        value={form.senha}
                                        onChange={handleChangeInputValue}
                                    />
                                </div>
                            </div>
                            <button className='btn-confirm-sign-in'>Entrar</button>
                            <span className='error' >{erro && erro}</span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignIn;