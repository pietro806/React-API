import Aside from "../../components/aside";
import Header from "../../components/header";
import './index.scss';
import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function Veiculos() {
    const [listaTipos, setListaTipos] = useState([])
    const [modelo, setModelo] = useState('')
    const [marca, setMarca] = useState('')
    const [ano, setAno] = useState(0)
    const [placa, setPlaca] = useState('')
    const [nomeBusca, setNomeBusca] = useState('')
    const [id, setId] = useState(0)
    const [listaVeiculos, setListaVeiculos] = useState([])
    const [idTipo, setIdTipo] = useState(0)
    const [tipo, setTipo] = useState('')
    
    async function BuscarTipos() {
        let resp = await axios.get('http://localhost:5000/buscarTipo')
        setListaTipos(resp.data)
    }


    useEffect(() => {
        BuscarTipos()
    }, [])

    async function Salvar() {
        try{
            if(id === 0){
                let tipoAgora = await BuscarTipo()
                console.log(tipoAgora);
                let veiculo = {
                    modelo: modelo,
                    idTipo: idTipo,
                    marca: marca,
                    ano: ano,
                    tipo: tipoAgora,
                    placa: placa
                }
                let resp = await axios.post('http://localhost:5000/veiculo', veiculo)
                toast.success('Veículo inserido!!!')
                BuscarVeiculoAlterado()
                Limpar()
            }
            else {
                let tipoAgora = await BuscarTipo()
                let veiculo = {
                    modelo: modelo,
                    idTipo: idTipo,
                    marca: marca,
                    ano: ano,
                    tipo: tipoAgora,
                    placa: placa
                } 
                let resp = await axios.put('http://localhost:5000/veiculo/' + id, veiculo)
                toast.success('Veículo alterado!!!')
                Limpar()
                BuscarVeiculoAlterado()
            }
        }
        catch(err){
            toast.error(err.response.data.erro)
        }
    }
    async function BuscarTipo() {
        let id = idTipo

        let resp = await axios.get('http://localhost:5000/buscarTipoId/' + id)
        setTipo(resp.data.Tipo)

        return resp.data.Tipo
    }

    async function BuscarVeiculos() {
        try{
            let resp = ''
            if(nomeBusca === ''){
                resp = await axios.get('http://localhost:5000/veiculo')
            }
            else if(nomeBusca !== ''){
                let nome = nomeBusca
                resp = await axios.get('http://localhost:5000/veiculoNome?nome=' + nome)
            }
            if(resp.data.length === 0 && nomeBusca === ''){
                toast.info('Não há veiculos cadastrados')
            }
            else if(resp.data.length === 0 && nomeBusca !== '')
                toast.info('Não há veiculos com esse nome em sua placa, modelo ou marca')
            setListaVeiculos(resp.data)
        }
        catch(err){
            toast.error(err.response.data.erro)
        }
    }

    async function BuscarVeiculoAlterado() {
        let nome = placa
        let resp = await axios.get('http://localhost:5000/veiculoNome?nome=' + nome)
        setListaVeiculos(resp.data)
    }

    function Alterar(veiculo) {
        setIdTipo(veiculo.IdTipo)
        setModelo(veiculo.Modelo)
        setMarca(veiculo.Marca)
        setPlaca(veiculo.Placa)
        setAno(veiculo.Ano)
        setTipo(veiculo.tipo)
        setId(veiculo.Id)
    }

    function Limpar(){
        setIdTipo(0)
        setModelo('')
        setMarca('')
        setPlaca('')
        setAno(0)
        setTipo('')
        setId(0)
    }


    async function Deletar(id) {
        confirmAlert({
            title: 'Deletar veículo',
            message: 'Tem certeza que deseja deletar o veiculo ?',
            buttons:[
                {
                    label: 'Sim',
                    onClick: async () => {
                        let idVeiculo = id 
                        let resp = await axios.delete('http://localhost:5000/veiculo/' + idVeiculo)
                        toast.success('Veículo deletado!!!')
                        BuscarVeiculos()
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }
    return(
        <main className="pag-veiculos">
            <ToastContainer />
            <main>
                <Aside />
                <section>
                    <Header />
                    <article>
                        <div>
                            <h5> ÁREA ADMINISTRATIVA </h5>
                            <h1>Controle de Veículos </h1>
                        </div>
                        <article className='registro'>
                                <h2> Novo Veículo </h2>
                                <section>
                                    <span className="formulario">
                                        <h6>Tipo</h6>
                                        <select value={idTipo} onChange={e => setIdTipo(Number(e.target.value))}>
                                            <option> Selecione </option>
                                            {listaTipos.map(item => {
                                                return(
                                                    <option value={item.Id}> {item.Tipo} </option>
                                                )
                                            })}
                                        </select>
                                    </span>
                                    <div className="formulario">
                                        <h6>Modelo</h6>
                                        <input type="txt" value={modelo} onKeyUp={(e) => {if(e.key === 'Enter') Salvar()}} onChange={e => setModelo(e.target.value)}/>
                                    </div>
                                    <div className="formulario">
                                        <h6>Marca</h6>
                                        <input type="txt"  value={marca} onKeyUp={e => {if(e.key === 'Enter') Salvar()}} onChange={e => setMarca(e.target.value)}/>
                                    </div>
                                    <div className="formulario">
                                        <h6>Ano</h6>
                                        <input type="txt" value={ano} onKeyUp={e => {if(e.key === 'Enter') Salvar()}} onChange={e => setAno(Number(e.target.value))} />
                                    </div>
                                    <div className="formulario">
                                        <h6>Placa</h6>
                                        <input type="txt" value={placa} onKeyUp={e => {if(e.key === 'Enter') Salvar()}} onChange={e => setPlaca(e.target.value)} />
                                    </div>
                                </section>
                                <button onClick={Salvar}> {id === 0 ? 'Salvar' : 'Alterar'} </button>
                            
                        </article>
                        <article className='lista'>
                            <section className='campoInput'>
                                <h2> Lista de Veículos </h2>
                                <div>
                                    <div>                                        
                                        <h6> Modelo, Marca, Placa</h6>
                                        <input type='text' value={nomeBusca} onKeyUp={e => {if(e.key === 'Enter') BuscarVeiculos() }} onChange={e => setNomeBusca(e.target.value)}/>
                                    </div>
                                    <img onClick={BuscarVeiculos} src='/assets/images/icon-source.png' />
                                </div>
                            </section>
                            <section className='tabela'>
                                <table>
                                    <thead> 
                                        <tr>
                                            <th> Modelo </th>
                                            <div>
                                                <th> Marca </th>
                                                <th> Ano </th>
                                                <th> Tipo </th>
                                                <th> Placa </th>
                                            </div>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaVeiculos.map(veiculo => {
                                            return(
                                                <tr>
                                                    <td className='nome'> {veiculo.Modelo} </td>
                                                    <div className='marginIgual'>
                                                        <td> {veiculo.Marca} </td>
                                                        <td> {veiculo.Ano} </td>
                                                        <td> {veiculo.Tipo} </td>
                                                        <td> {veiculo.Placa} </td>
                                                    </div>
                                                    <div className='icons'>
                                                        <div></div>
                                                        <i onClick={() => Deletar(veiculo.Id)} className='fa fa-trash-can '></i>
                                                        <i onClick={() => Alterar(veiculo)} class="fa-solid fa-pencil"></i>
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