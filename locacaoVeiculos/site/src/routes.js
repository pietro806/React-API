import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clientes from './pages/controle clientes'
import Veiculos from './pages/controle veículos'

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Clientes />}/>
                <Route path='/veiculos' element={<Veiculos />}/>
            </Routes>
        </BrowserRouter>
    )
}