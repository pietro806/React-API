import Aside from "../../components/aside";
import Header from "../../components/header";
import './index.scss';
import {useState} from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer, toast} from 'react-toastify'
import { confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function Clientes() {
    const [nome, setNome] =    useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [CPF, setCPF] = useState('')
    const [CNH, setCNH] = useState('')
    const [listaClientes, setListaClientes] = useState([])
    const [buscaNome, setBuscaNome] = useState('')
    const [id, setID] = useState(0)

    async function Salvar(){
        try {
            if(id === 0){
                let cliente = {
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    CPF: CPF,
                    CNH: CNH
                }
        
                let dados = await axios.post('http://localhost:5000/cliente', cliente)
        
                toast.success('Cliente inserido!!!!')
            }
            else{
                let clienteAlterado = {
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    CPF: CPF,
                    CNH: CNH
                }
                let dados = await axios.put('http://localhost:5000/cliente/' + id, clienteAlterado)
                toast.success('Cliente Alterado!!!')
                BuscarAlterado()
                Limpar()
                setID(0)
            }
        }
        catch(err){
            toast.error(err.response.data.erro)
        }
    }

    function Deletar(item) {
        confirmAlert({
            title: 'Deletar cliente',
            message: 'Tem certeza que deseja remover ?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                  try {
                    let r = await axios.delete('http://localhost:5000/cliente/' + item.Id);
                    console.log(r);
                    toast.success('Cliente removido!!!');
                    Buscar();
                  }
                  catch (err) {
                    toast.error(err.response.data.erro);
                  }
                }
              },
              {
                label: 'Não'
              }
            ]
          });
    }

    async function Buscar(){
        try{
            let dados
            if(buscaNome === ''){
                dados = await axios.get('http://localhost:5000/cliente')
            }
            else{
                dados = await axios.get('http://localhost:5000/clienteNome?nome=' + buscaNome)
            }

            if(buscaNome === '' && dados.data.length === 0)
                toast.info('Não existe clientes registrados')
            if(dados.data.length === 0 && buscaNome !== '')
                toast.info('Não existe cliente com esse nome')
            setListaClientes(dados.data)

        }
        catch(err){
            toast.error(err.response.data.erro)
        }
    }

    async function BuscarAlterado(){
        try{
            let dados = await axios.get('http://localhost:5000/clienteNome?nome=' + nome)
            setListaClientes(dados.data)
        }
        catch(err){
            toast.error(err.response.data.erro)
        }
    }
 
    function Alterar(item){
        setNome(item.Nome)
        setEmail(item.Email)
        setTelefone(item.Telefone)
        setCPF(item.CPF)
        setCNH(item.CNH)
        setID(item.Id)
    }

    function Limpar(){
        setNome('')
        setEmail('')
        setTelefone('')
        setCPF('')
        setCNH('')
        setID('')
    }

    return(
        <main className="pag-clientes">
            <ToastContainer />
            <main>
                <Aside />
                <section>
                    <Header />
                    <article>
                        <div>
                            <h5> ÁREA ADMINISTRATIVA </h5>
                            <h1>Controle de Clientes </h1>
                        </div>
                        <article className='registro'>
                                <h2> Novo Cliente </h2>
                                <section>
                                    <div>
                                        <h6>Nome</h6>
                                        <input type="txt" value={nome} onChange={e => setNome(e.target.value)}/>
                                    </div>
                                    <div>
                                        <h6>Email</h6>
                                        <input type="txt" value={email} onChange={e => setEmail(e.target.value)}/>
                                    </div>
                                    <div>
                                        <h6>Telefone</h6>
                                        <input type="txt" value={telefone} onChange={e => setTelefone(e.target.value)} />
                                    </div>
                                    <div>
                                        <h6>CPF</h6>
                                        <input type="txt" value={CPF} onChange={e => setCPF(e.target.value)} />
                                    </div>
                                    <div>
                                        <h6>CNH</h6>
                                        <input type="txt" value={CNH} onKeyUp={(e) => {if(e.key == 'Enter'){ Salvar() }}} onChange={e => setCNH(e.target.value)} />
                                    </div>
                                </section>
                                <button onClick={Salvar}> {id === 0 ? 'Salvar' : 'Alterar'} </button>
                            
                        </article>
                        <article className='lista'>
                            <section className='campoInput'>
                                <h2> Lista de Clientes </h2>
                                <div>
                                    <div>                                        
                                        <h6> Nome</h6>
                                        <input type='text' onKeyUp={(e) => {if(e.key == 'Enter'){ Buscar() }}} value={buscaNome} onChange={e => setBuscaNome(e.target.value)}/>
                                    </div>
                                    <img onClick={Buscar} src='/assets/images/icon-source.png' />
                                </div>
                            </section>
                            <section className='tabela'>
                                <table>
                                    <thead> 
                                        <tr>
                                            <th> Nome </th>
                                            <div>
                                                <th> CPF </th>
                                                <th> Telefone </th>
                                                <th> Email </th>
                                            </div>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaClientes.map(item => {
                                            return(
                                                <tr>
                                                    <td className='nome'> {item.Nome} </td>
                                                    <div className='marginIgual'>
                                                        <td> {item.CPF} </td>
                                                        <td> {item.CNH} </td>
                                                        <td> {item.Email} </td>
                                                    </div>
                                                    <div className='icons'>
                                                        <div></div>
                                                        <i onClick={() => Deletar(item)} className='fa fa-trash-can '></i>
                                                        <i onClick={() => Alterar(item)} class="fa-solid fa-pencil"></i>
                                                    </div>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </section>
                        </article>

                    </article>

                </section>
            </main>
        </main>
    )
}