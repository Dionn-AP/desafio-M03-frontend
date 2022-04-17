import './style.css';
import Logo from '../../assets/logo.svg';
import ImageProfile from '../../assets/photo-user.svg';
import ImageLogout from '../../assets/button-logout.svg';
import Filter from '../../assets/icon-filter.svg';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { clear, getItem } from '../../utils/storage';
import AddRegister from '../../components/AddRegister';
import EditRegister from '../../components/EditRegister';
import EditUser from '../../components/EditUser';
import Table from '../../components/Table';
import Balance from '../../components/Balance';


function Home() {
    const navigate = useNavigate();
    const token = getItem('token');
    const [user, setUser] = useState([]);
    const [balance, setBalance] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [showRegister, setShowRegister] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);


    const [showEdit, setShowEdit] = useState({
        id: '',
        show: false
    });
    const [showIcons, setShowIcons] = useState({
        id: '',
        show: false
    });

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    function handleLogout() {
        clear();
        navigate('/sign-in')
    }

    async function lodaUser() {
        try {
            const response = await api.get('/usuario', headers);
            setUser(response.data.nome.split(' '))
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        lodaUser();
    }, []);

    async function lodaTransactions() {
        try {
            const response = await api.get('/transacao', headers);
            setTransactions(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    async function loadBalance() {
        try {

            const response = await api.get('/transacao/extrato', headers);

            setBalance(response.data);

        } catch (error) {

        }
    }

    async function deleteTransaction(id) {
        try {
            const response = await api.delete(`/transacao/${id}`, headers);

            loadBalance();
            lodaTransactions()
        } catch (error) {
            
        }
    }

    useEffect(() => {
        loadBalance();
        lodaTransactions();
    }, []);


    return (
        <div className="container-home">
            {showRegister &&
                <div className='position-absolute'>
                    <AddRegister
                        setShowRegister={setShowRegister}
                        lodaTransactions={lodaTransactions}
                        loadBalance={loadBalance}
                    />
                </div>
            }

            {showEdit.show &&
                <div className='position-absolute'>
                    <EditRegister
                        showEdit={showEdit}
                        setShowEdit={setShowEdit}
                        lodaTransactions={lodaTransactions}
                        loadBalance={loadBalance}
                    />
                </div>
            }
            {showEditUser &&
                <div className='position-absolute'>
                    <EditUser
                        lodaUser={lodaUser}
                        setShowEditUser={setShowEditUser}
                        lodaTransactions={lodaTransactions}
                        loadBalance={loadBalance}
                    />
                </div>
            }

            <footer>
                <img className='image-logo' src={Logo} alt='logo-mark' />
                <div className='user-current'>
                    <img className='image-logout' src={ImageProfile} alt='profile'
                        onClick={() => setShowEditUser(true)}
                    />
                    <span className='profile-name'>{user[0]}</span>
                    <img
                        className='log-out'
                        src={ImageLogout}
                        alt='logout'
                        onClick={() => handleLogout()}
                    />
                </div>
            </footer>

            <div className='container-content-home'>

                <div className='container-table-abstract'>
                    <div className='filter-table'>
                        <button>
                            <img src={Filter} alt='filter-table' />
                            Filtrar
                        </button>
                    </div>

                    <div className='container-table'>

                        <Table 
                            transactions={transactions}
                            setTransactions={setTransactions}
                            showIcons={showIcons}
                            setShowIcons={setShowIcons}
                            deleteTransaction={deleteTransaction}
                            setShowEdit={setShowEdit}
                        />

                    </div>
                    <div className='card-abstract'>
                        
                        <Balance 
                            balance={balance}
                            setShowRegister={setShowRegister}
                        />

                    </div>

                </div>

            </div>

        </div>
    )
};

export default Home;