import { Router } from "express";
import { AlterarVeiculo, BuscarVeiculo, BuscarVeiculoNome, DeletarVeiculo, InserirVeiculo } from "../repository/veiculo.js";

const endpointsVeiculo = Router()

endpointsVeiculo.post('/veiculo', async (req, resp) => {
    try {
        let veiculo = req.body
            if(!veiculo.idTipo || isNaN(veiculo.idTipo))
                throw new Error('Id tipo não identificado')
            if(!veiculo.modelo)
                throw new Error('Modelo não identificado')
            if(!veiculo.marca)
                throw new Error('Marca não identificada')
            if(!veiculo.ano || isNaN(veiculo.ano))
                throw new Error('Ano não identificado')
            if(!veiculo.tipo)
                throw new Error('Tipo não identificado')
            if(!veiculo.placa)
                throw new Error('Placa não identificada')
        let verificaoPlaca = await BuscarVeiculoNome(veiculo.placa)
        if (verificaoPlaca.length >= 1)
                throw new Error('Placa indisponível')    

        let dados = await InserirVeiculo(veiculo)
        resp.send(dados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpointsVeiculo.get('/veiculoNome', async (req, resp) => {
    try {
        let {nome} = req.query

        let dados = await BuscarVeiculoNome(nome)

        resp.send(dados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpointsVeiculo.get('/veiculo', async (req, resp) => {
    try {
        let dados = await BuscarVeiculo()

        resp.send(dados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpointsVeiculo.put('/veiculo/:id', async (req, resp) => {
    try {
        let {id} = req.params
            if(!id || id === 0)
                throw new Error('ID não identificado')
        let veiculo = req.body
            if(!veiculo.idTipo)
                throw new Error('Tipo não identificado')
            if(!veiculo.modelo)
                throw new Error('Modelo não identificado')
            if(!veiculo.marca)
                throw new Error('Marca não identificada')
            if(!veiculo.ano || isNaN(veiculo.ano))
                throw new Error('Ano não identificado')
            if(!veiculo.tipo)
                throw new Error('Tipo não identificado')
            if(!veiculo.placa)
                throw new Error('Placa não identificada')

        let affectedRows = await AlterarVeiculo(veiculo, id)

        if(affectedRows != 1)
            throw new Error('Não pode ser alterado')
         
        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpointsVeiculo.delete('/veiculo/:id', async (req, resp) => {
    try {
        let {id} = req.params
        if(!id || id === 0)
            throw new Error('Id não identificado')

        let affectedRows = await DeletarVeiculo(id)
        
        if(affectedRows != 1)
            throw new Error('Não pode ser deletado')
     
        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

export default endpointsVeiculo;
