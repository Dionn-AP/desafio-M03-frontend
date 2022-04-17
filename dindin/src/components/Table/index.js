import IconEdit from '../../assets/icon-pen.svg';
import IconTrash from '../../assets/icon-trash.svg';
import { format } from 'date-fns';
import PopPup from '../../components/PopPup';
import './style.css';

function Table({ transactions, showIcons, setShowIcons, deleteTransaction, setShowEdit }) {

    const headTable = ['Data', 'Dia da Semana', 'Descrição', 'Categoria', 'Valor', ''];
    const dayOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    return (
        <table>
            <thead>
                <tr>
                    {headTable.map((item, index) => (
                        <th key={index}>
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{format(new Date(transaction.data), 'dd/MM/yy')} </td>
                        <td>{dayOfWeek[new Date(transaction.data).getDay()]}</td>
                        <td>{transaction.descricao}</td>
                        <td>{transaction.categoria_nome}</td>
                        <td style={{
                            color: transaction.tipo === 'entrada' ? '#7B61FF'
                                : '#FA8C10'
                        }}>
                            <strong>
                                {`R$ ${(transaction.valor / 1000).toFixed(2).replace('.', ',')}`}
                            </strong>
                        </td>
                        <td className='icons'>
                            {(showIcons.id === transaction.id && showIcons.show) &&
                                <PopPup
                                    deleteTransaction={deleteTransaction}
                                    setShowIcons={setShowIcons}
                                    transaction={transaction}
                                />
                            }

                            <img className='icon-edit' src={IconEdit} alt='little pen'
                                onClick={() => setShowEdit({
                                    id: transaction.id,
                                    show: true
                                })}
                            />
                            <img className='icon-trash' src={IconTrash} alt='little trash'
                                onClick={() => setShowIcons({
                                    id: transaction.id,
                                    show: true
                                })}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default Table;