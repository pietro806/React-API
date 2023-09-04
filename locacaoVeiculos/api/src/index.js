import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import endpointsCliente from './controller/cliente.js';
import tipoVeiculos from './controller/tiposVeiculo.js';
import endpointsVeiculo from './controller/veiculo.js';

const server = express();

server.use(cors());
server.use(express.json())
server.use(endpointsCliente)
server.use(tipoVeiculos)
server.use(endpointsVeiculo)

server.listen(process.env.PORT, 
    () => console.log(`API online na porta ${process.env.PORT}`));
