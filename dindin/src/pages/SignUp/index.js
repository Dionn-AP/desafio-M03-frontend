import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../../assets/background.svg'
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { useState, useEffect } from 'react';


function SignUp() {
    const [register, setRegister] = useState(false);
    const [erro, setErro] = useState('');
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        contrasenha: ''
    });

    const navigate = useNavigate();

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            if (form.senha !== form.contrasenha) {
                setErro('As senhas precisam ser iguais.')
                return
            }

            const response = await api.post('/usuario', {
                nome: form.nome,
                email: form.email,
                senha: form.senha
            });
            
            if (response) {
                setRegister(true)
            }

        } catch (error) {
            setErro(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        if (register) {
            setTimeout(() => {
                setRegister(false)
                navigate('/sign-in')
            }, 1500)
        }
    }, [register]);


    return (
        <div className='container'>
            <div className='container-login' style={{ backgroundImage: `url(${Background})` }}>

                <div className='container-content-register'>
                    <img src={Logo} alt='logo-mark' />

                    <div className='card-login-sign-up'>

                        <form className='sign-up' onSubmit={handleSubmit}>
                            <h2>Cadastre-se</h2>
                            <div className='inputs'>
                                <div className='input-name'>
                                    <label>Nome</label>
                                    <input
                                        name='nome'
                                        type='text'
                                        value={form.nome}
                                        onChange={handleChangeInputValue}
                                    />
                                </div>

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
                                    <label>Senha</label>
                                    <input
                                        name='senha'
                                        type='password'
                                        value={form.senha}
                                        onChange={handleChangeInputValue}
                                    />
                                </div>
                                <div className='input-password-confirm'>
                                    <label>Confirmação de senha</label>
                                    <input
                                        name='contrasenha'
                                        type='password'
                                        value={form.contrasenha}
                                        onChange={handleChangeInputValue}
                                    />
                                </div>
                            </div>
                            <button>Cadastrar</button>
                            <span className='text-bottom' >Já tem cadastro? <Link to='/sign-in'>Clique aqui!</Link></span>

                            <span className='error' >{erro && erro}</span>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignUp;