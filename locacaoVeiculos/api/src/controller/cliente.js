import { Router } from "express";
import { AlterarCliente, BuscarClienteNome, BuscarCliente, DeletarCliente, InserirCliente } from "../repository/cliente.js";

const endpointsCliente = Router();

endpointsCliente.post('/cliente', async (req, resp) => {
    try{
        let cliente = req.body
        if(!cliente.nome)
            throw new Error('Nome não identificado')
        if(!cliente.email) 
            throw new Error('Email não identificado')
        if(!cliente.telefone)
            throw new Error('Telefone não identificado')
        if(!cliente.CPF)
            throw new Error('CPF não identificado')
        if(!cliente.CNH) 
            throw new Error('CNH não identificada')
        
        let dados = await InserirCliente(cliente)

        resp.send(dados) 
    }     
    catch(err){
        resp.status(500).send({
            erro: err.message       
        })         
    }
})

endpointsCliente.get('/clienteNome', async (req, resp) => {
    try{
        let {nome} = req.query;
        if(!nome)
            throw new Error('Nome não identificado')

        let dados = await BuscarClienteNome(nome);

        resp.send(dados) 
    }
    catch(err) {
        resp.status(500).send({
            erro: err.message
        })
    }
})
   
endpointsCliente.get('/cliente', async (req, resp) => {
    try{
        let dados = await BuscarCliente(); 
        resp.send(dados) 
    }
    catch(err) { 
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpointsCliente.put('/cliente/:id', async (req, resp) => {
    try{
        let cliente = req.body
            if(!cliente.nome)
                throw new Error('Cliente não identificada')
            if(!cliente.email)
                throw new Error('Email não identificado')
            if(!cliente.telefone)
                throw new Error('Telefone não identificado')
            if(!cliente.CPF)
                throw new Error('CPF não identificada')
            if(!cliente.CNH)
                throw new Error('CNH não identificada')
        let id = req.params.id
            if(!id)
                throw new Error('ID não identificado')
        
        let affectedRows = await AlterarCliente(cliente, id)

        if(affectedRows != 1)
            throw new Error('Não pode ser alterado')
        resp.status(204).send()
    }
    catch(err) {
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpointsCliente.delete('/cliente/:id', async (req, resp) => {
    try {
        let {id} = req.params;
            if(!id)
                throw new Error('ID não identificado')

        let affectedRows = await DeletarCliente(id)
        
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


export default endpointsCliente;