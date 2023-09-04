import { Router } from "express";
import { BuscarTipoId, BuscarTipoVeiculo } from "../repository/tiposVeiculo.js";


const tipoVeiculos = Router();

tipoVeiculos.get('/buscarTipo', async (req, resp) => {
    try {
        let dados = await BuscarTipoVeiculo()
        resp.send(dados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

tipoVeiculos.get('/buscarTipoId/:id', async (req, resp) => {
    try {
        let {id} = req.params
        let dados = await BuscarTipoId(id)
        resp.send(dados)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

export default tipoVeiculos;