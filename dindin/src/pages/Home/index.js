import './style.css';
import Logo from '../../assets/logo.svg';
import ImageProfile from '../../assets/photo-user.svg';
import ImageLogout from '../../assets/button-logout.svg';
import Filter from '../../assets/icon-filter.svg';


function Home() {

    return (
        <div className="container-home">
            <img className='image-logo' src={Logo} alt='logo-mark' />
            <div className='user-current'>
                <img className='image-logout' src={ImageProfile} alt='profile'/>
                <span className='profile-name'>Dionnatan</span>
                <img src={ImageLogout} alt='logout'/>
            </div>
            <div className='container-content-home'>
                <div className='filter-table'>
                    <button>
                        <img src={Filter} alt='filter-table'/>
                        Filtrar
                    </button>
                </div>
                <div className='container-table'>
                    <div className='column-date'>Data</div>
                    <div className='column-day-week'>Dia da semana</div>
                    <div className='column-description'>Descrição</div>
                    <div className='column-categorie'>Categoria</div>
                    <div className='column-value'>Valor</div>
                    <div className='column-edit-trash'></div>
                </div>
                <div className='card-abstract'>
                    <div className='content-abstract'>
                        <h2>Resumo</h2>
                        <div className='received'>
                            <span>Entradas</span>
                            <span>R$ 200,00</span>
                        </div>
                        <div className='exits'>
                            <span>Saídas</span>
                            <span className='exits-price'>R$ 70,50</span>
                        </div>

                        <tr />
                        
                        <div className='balance'>
                            <span>Saldo</span>
                            <span>R$ 129,50</span>
                        </div>
                        
                    </div>
                    <button>Adicionar Registro</button>
                </div>
            </div>
            
        </div>
    )
};

export default Home;