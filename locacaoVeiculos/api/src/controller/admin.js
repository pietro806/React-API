import { Router } from "express";
import { AlterarCliente, AlterarVeiculo, BuscarCliente, BuscarVeiculo, DeletarCliente, DeletarVeiculo, InserirCliente, InserirVeiculo } from "../repository/admin.js";



const endpoints = Router();

endpoints.post('/cliente/inserir', async (req, resp) => {
    try{
        let cliente = req.body
        if(!cliente.nome)
            resp.status(400).send('Nome não identificado')
        if(!cliente.email)
            resp.status(400).send('Email não identificado')
        if(!cliente.telefone)
            resp.status(400).send('Telefone não identificado')
        if(!cliente.cpf)
            resp.status(400).send('CPF não identificado')
        if(!cliente.cnh)
            resp.status(400).send('CNH não identificado')
        
        let dados = await InserirCliente(cliente)

        resp.send(dados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


endpoints.get('/cliente', async (req, resp) => {
    try{
        let {nome} = req.query;
        if(!nome)
            resp.status(400).send('Nome não identificado')

        let dados = await BuscarCliente(nome);
            if(dados.length === 0)
                resp.status(404).send()
        resp.send(dados)
    }
    catch(err) {
        resp.status(500).send({
            erro: err.message
        })
    }
})
   

endpoints.put('/cliente/:id', async (req, resp) => {
    try{
        let cliente = req.body
            if(!cliente.nome)
                resp.status(400).send('Nome não identificado')
            if(!cliente.email)
                resp.status(400).send('Email não identificado')
            if(!cliente.telefone)
                resp.status(400).send('Telefone não identificado')
            if(!cliente.cpf)
                resp.status(400).send('CPF não identificado')
            if(!cliente.cnh)
                resp.status(400).send('CNH não identificado')
        let id = req.params.id
            if(!id)
                resp.status(400).send('id não identificado')
        
        let affectedRows = await AlterarCliente(cliente, id)

        if(affectedRows != 1)
            resp.status(400).send('Não pode ser alterado')
        resp.status(204).send()
    }
    catch(err) {
        resp.status(500).send({
            erro: err
        })
    }
})

endpoints.delete('/cliente/:id', async (req, resp) => {
    try {
        let id = req.params.id;
            if(!id)
                resp.status(400).send('id não identificado')

        let affectedRows = await DeletarCliente(id)
        
            if(affectedRows != 1)
                resp.status(400).send('Não pode ser deletado')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err
        })
    }
})

endpoints.post('/veiculo', async (req, resp) => {
    try {
        let veiculo = req.body
            if(!veiculo.tipo)
                resp.status(400).send('Tipo não identificado')
            if(!veiculo.modelo)
                resp.status(400).send('Modelo não identificado')
            if(!veiculo.marca)
                resp.status(400).send('Marca não identificada')
            if(!veiculo.ano)
                resp.status(400).send('Ano não identificado')
            if(!veiculo.placa)
                resp.status(400).send('Placa não identificada')
        
        let dados = await InserirVeiculo(veiculo)

        resp.send(dados)
    }
    catch(err){
        resp.status(500).send({
            erro: err
        })
    }
})

endpoints.get('/veiculo', async (req, resp) => {
    try {
        let {nome} = req.query

        let dados = await BuscarVeiculo(nome)

        resp.send(dados)
    }
    catch(err){
        resp.status(500).send({
            erro: err
        })
    }
})

endpoints.put('/veiculo/:id', async (req, resp) => {
    try {
        let {id} = req.params
            if(!id)
                resp.status(400).send('ID não identificado')
        let veiculo = req.body
            if(!veiculo.tipo)
                resp.status(400).send('Tipo não identificado')
            if(!veiculo.modelo)
                resp.status(400).send('Modelo não identificado')
            if(!veiculo.marca)
                resp.status(400).send('Marca não identificada')
            if(!veiculo.ano)
                resp.status(400).send('Ano não identificado')
            if(!veiculo.placa)
                resp.status(400).send('Placa não identificada')

        let affectedRows = await AlterarVeiculo(veiculo, id)

        if(affectedRows != 1)
             resp.status(400).send('Não pode ser alterado')
         
        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err
        })
    }
})

endpoints.delete('/veiculo/:id', async (req, resp) => {
    try {
        let {id} = req.params

        let affectedRows = await DeletarVeiculo(id)
        
        if(affectedRows != 1)
            resp.status(400).send('Não pode ser deletado')
     
        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err
        })
    }
})














export default endpoints