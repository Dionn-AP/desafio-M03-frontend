import './style.css';
import { Link } from 'react-router-dom';
import Background from '../../assets/background.svg'
import Logo from '../../assets/logo.svg';


function SignIn() {

    return (
        <div className='container'>
            <div className='container-login' style={{backgroundImage: `url(${Background})`}}>
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
                    <div className='card-login'>
                        <form>
                            <h2>Login</h2>
                            <div className='inputs'>
                                <div className='input-email'>
                                    <label>E-mail</label>
                                    <input 
                                        type='text'
                                    />
                                </div>
                                <div className='input-password'>
                                    <label>Password</label>
                                    <input 
                                        type='password'
                                    />
                                </div>
                            </div>
                            <button
                                type='submit'
                                >
                                Entrar
                            </button>
                        </form>
                    </div>
                </div> 
            </div>
        </div>
    )
};

export default SignIn;