import './style.css';
import { getItem } from '../../utils/storage';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import Close from '../../assets/close.svg';


function AddRegister({ lodaTransactions, loadBalance, setShowRegister }) {
    const [types, setTypes] = useState('saida');
    const [erro, setErro] = useState('');
    const [options, setOptions] = useState([]);
    const [select, setSelect] = useState({ id: '', nome: '' });
    const [form, setForm] = useState({
        tipo: '',
        valor: '',
        categoria_id: '',
        data: '',
        descricao: ''
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

    function handleChangeSelect(event) {
        const localOptions = [...options];

        const myOption = localOptions.find((item) => item.id === parseInt(event.target.value));

        setSelect({ id: myOption.id, nome: myOption.nome });
    }

    async function listCategories() {
        try {
            const response = await api.get('/categoria', headers);
            setOptions([...response.data])
        } catch (error) {
            setErro(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        listCategories();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post('/transacao', {
                tipo: types,
                valor: Number(form.valor),
                categoria_id: select.id,
                data: form.data,
                descricao: form.descricao
            }, headers);
            lodaTransactions();
            loadBalance();

        } catch (error) {
            setErro(error.response.data.mensagem)
        }
    }

    return (
        <form className='card-add-register' onSubmit={handleSubmit}>
            <h1>Adicionar Registro</h1>
            <img className='btn-close'
                src={Close} alt='close button'
                onClick={() => setShowRegister(false)}
            />

            <div className='register-buttons'>
                <div style={{ backgroundColor: types === 'entrada' && '#3A9FF1' }}
                    className='btn-received'
                    onClick={() => setTypes('entrada')}
                >
                    Entrada
                </div>
                <div style={{ backgroundColor: types === 'entrada' && '#B9B9B9' }}
                    className='btn-exits'
                    onClick={() => setTypes('saida')}
                >
                    Saída
                </div>
            </div>

            <div className='input-value'>
                <label>Valor</label>
                <input
                    name='valor'
                    type='number'
                    value={form.valor}
                    onChange={handleChangeInputValue}
                />
            </div>
            <div className='input-categories'>
                <label>Categorias</label>
                <select
                    value={select.id}
                    onChange={(event) => handleChangeSelect(event)}
                >
                    {options.map((item) => (
                        <option
                            key={item.id}
                            type='text'
                            value={item.id}>
                            {item.nome}
                        </option>
                    ))}
                </select>

            </div>
            <div className='input-date'>
                <label>Data</label>
                <input
                    name='data'
                    type='date'
                    value={form.data}
                    onChange={handleChangeInputValue}
                />
            </div>
            <div className='input-description'>
                <label>Descrição</label>
                <input
                    name='descricao'
                    type='text'
                    value={form.descricao}
                    onChange={handleChangeInputValue}
                />
            </div>
            <button
                className='btn-confirm-add-register'
            >
                Confirmar
            </button>
            <span className='error' >{erro && erro}</span>
        </form>
    )
};

export default AddRegister;