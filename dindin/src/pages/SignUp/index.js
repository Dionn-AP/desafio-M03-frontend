import './style.css';
import { Link } from 'react-router-dom';
import Background from '../../assets/background.svg'
import Logo from '../../assets/logo.svg';


function SignUp() {

    return (
        <div className='container'>
            <div className='container-login' style={{backgroundImage: `url(${Background})`}}>
            <div className='container-content-register'>
                <img src={Logo} alt='logo-mark' />
                <div className='card-login'>
                    <form>
                        <h2>Cadastre-se</h2>
                        <div className='inputs'>
                            <div className='input-name'>
                                <label>Nome</label>
                                <input 
                                    type='text'
                                />
                            </div>
                            <div className='input-email'>
                                <label>E-mail</label>
                                <input 
                                    type='text'
                                />
                            </div>
                            <div className='input-password'>
                                <label>Senha</label>
                                <input 
                                    type='password'
                                />
                            </div>
                            <div className='input-password-confirm'>
                                <label>Confirmação de senha</label>
                                <input 
                                    type='password'
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                        >
                            Cadastrar
                        </button>
                        <span>Já tem cadastro? <Link to='/sign-in'>Clique aqui!</Link></span>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
};

export default SignUp;