import conexao from "./connection.js"



export async function InserirCliente(cliente) {
    let comando = ` insert into cliente_tb (nm_cliente, ds_email, ds_telefone, ds_cpf ,ds_cnh) 
                                    values ( ?,           ?,        ?,            ?,    ?) ;`

    let [dados] = await conexao.query(comando, [cliente.nome, cliente.email, cliente.telefone, cliente.CPF, cliente.CNH]);
    
    cliente.Id = dados.insertId

    return cliente
}

export async function BuscarClienteNome(nome) {
    let comando = `select id_cliente   as Id,
                          nm_cliente   as Nome,
                          ds_email     as Email,
                          ds_telefone  as Telefone,
                          ds_cpf       as CPF,
                          ds_cnh       as CNH
                   from cliente_tb
                   where nm_cliente like ?`;

    let [dados] = await conexao.query(comando, [`%${nome}%`])
    
    return dados
}

export async function BuscarCliente() {
    let comando = `select id_cliente   as Id,
                          nm_cliente   as Nome,
                          ds_email     as Email,
                          ds_telefone  as Telefone,
                          ds_cpf       as CPF,
                          ds_cnh       as CNH
                   from cliente_tb`;

    let [dados] = await conexao.query(comando, [])
    
    return dados
}

export async function AlterarCliente(cliente, id) {
    let comando = `update cliente_tb
                    set nm_cliente = ?,
                    ds_email = ?,
                    ds_telefone = ?,
                    ds_cpf = ?,
                    ds_cnh = ?
                    where id_cliente = ?`

    let [dados] = await conexao.query(comando, [cliente.nome, cliente.email, cliente.telefone, cliente.CPF, cliente.CNH, id])


    return dados.affectedRows
}

export async function DeletarCliente(id) {
    let comando = `delete from cliente_tb
                           where id_cliente = ? ;`

    let [dados] = await conexao.query(comando, [id])

    return dados.affectedRows
} 