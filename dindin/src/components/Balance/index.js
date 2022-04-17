import './style.css';



function Balance({balance, setShowRegister}) {
    

    return (
        <>
            <div className='content-abstract'>
                <h2>Resumo</h2>
                <div className='received'>
                    <span>Entradas</span>
                    <span>R$ {(balance.entrada / 1000).toFixed(2)}</span>
                </div>
                <div className='exits'>
                    <span>Saídas</span>
                    <span className='exits-price'>R$ {(balance.saida / 1000).toFixed(2)}</span>
                </div>

                <div className='balance'>
                    <span>Saldo</span>
                    <span>R$ {((balance.entrada - balance.saida) / 1000).toFixed(2)}</span>
                </div>

            </div>
            <button className='add-register'
                onClick={() => setShowRegister(true)}
            >
                Adicionar Registro
            </button>
        </>
    )
};

export default Balance;