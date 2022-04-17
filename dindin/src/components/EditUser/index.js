import './style.css';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import Close from '../../assets/close.svg';


function EditUser({ setShowEditUser, lodaUser }) {
    const [register, setRegister] = useState(false);
    const [erro, setErro] = useState('');
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        contrasenha: ''
    });

    const token = getItem('token');
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

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

            const response = await api.put(`/usuario`, {
                nome: form.nome,
                email: form.email,
                senha: form.senha
            }, headers);
            if (response) {
                setShowEditUser(false)
            }
            
            lodaUser()

        } catch (error) {
            setErro(error.response.data.mensagem)
        }
    }


    return (

        <div className='container-content-register'>

            <div className='card-login-edit-user'>

                <form className='card-edit-user' onSubmit={handleSubmit}>
                    <img className='btn-close'
                        src={Close} alt='close button'
                        onClick={() => setShowEditUser(false)}
                    />
                    <h1>Editar Perfil</h1>
                    <div className='inputs'>
                        <div className='input-name'>
                            <label>Nome</label>
                            <input
                                name='nome'
                                type='text'
                                placeholder='Name'
                                value={form.nome}
                                onChange={handleChangeInputValue}
                            />
                        </div>

                        <div className='input-email'>
                            <label>E-mail</label>
                            <input
                                name='email'
                                type='text'
                                placeholder='Email'
                                value={form.email}
                                onChange={handleChangeInputValue}
                            />
                        </div>

                        <div className='input-password'>
                            <label>Senha</label>
                            <input
                                name='senha'
                                type='password'
                                placeholder='Password'
                                value={form.senha}
                                onChange={handleChangeInputValue}
                            />
                        </div>
                        <div className='input-password-confirm'>
                            <label>Confirmação de senha</label>
                            <input
                                name='contrasenha'
                                type='password'
                                placeholder='Password'
                                value={form.contrasenha}
                                onChange={handleChangeInputValue}
                            />
                        </div>
                    </div>
                    <button className='btn-confirm-edit-user'>Confirmar</button>

                    <span className='error' >{erro && erro}</span>
                </form>
            </div>
        </div>
    )
};

export default EditUser;