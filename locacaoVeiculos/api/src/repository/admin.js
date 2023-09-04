import conexao from "./connection.js"



export async function InserirCliente(cliente) {
    let comando = ` insert into cliente_tb (nm_cliente, ds_email, ds_telefone, ds_cpf ,ds_cnh) 
                                    values ( ?,           ?,        ?,            ?,    ?) ;`

    let [dados] = await conexao.query(comando, [cliente.nome, cliente.email, cliente.telefone, cliente.cpf, cliente.cnh]);
    
    cliente.id = dados.insertId

    return cliente
}

export async function BuscarCliente(nome) {
    let comando = `select id_cliente   as ID,
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

export async function AlterarCliente(cliente, id) {
    let comando = `update cliente_tb
                    set nm_cliente = ?,
                    ds_email = ?,
                    ds_telefone = ?,
                    ds_cpf = ?,
                    ds_cnh = ?
                    where id_cliente = ?`

    let [dados] = await conexao.query(comando, [cliente.nome, cliente.email, cliente.telefone, cliente.cpf, cliente.cnh, id])


    return dados.affectedRows
}

export async function DeletarCliente(id) {
    let comando = `delete from cliente_tb
                           where id_cliente = ? ;`

    let [dados] = await conexao.query(comando, [id])

    return dados.affectedRows
} 

export async function InserirVeiculo(veiculo){
    let comando = ` insert into tb_veiculo ( nm_modelo, id_tipo_veiculo, nm_marca, dt_ano, ds_placa)
                                    values (?, ?, ?, ?, ?);`
    
    let [dados] = await conexao.query(comando, [veiculo.modelo, veiculo.tipo, veiculo.marca, veiculo.ano, veiculo.placa])

    veiculo.id = dados.insertId

    return veiculo
}

export async function BuscarVeiculo(nome){
    let comando = `select  id_veiculo      as ID,
                           id_tipo_veiculo as Tipo,
                           nm_modelo       as Modelo,
                           nm_marca        as Marca,
                           year(dt_ano)          as Ano,
                           ds_placa        as Placa
                           from 	       tb_veiculo
                           where           (nm_modelo like ?
                           or              nm_marca  like ?
                           or              ds_placa  like ? );`
    
    let [dados] = await conexao.query(comando, [`%${nome}%`, `%${nome}%`, `%${nome}%`])

    return dados;
}

export async function AlterarVeiculo(veiculo, id) {
    let comando = `update tb_veiculo
                   set id_tipo_veiculo = ?,
                   nm_modelo = ?,
                   nm_marca = ?,
                   dt_ano = ?,
                   ds_placa = ?
                   where id_veiculo = ?;`
    
    let [dados] = await conexao.query(comando, [veiculo.tipo, veiculo.modelo, veiculo.marca, veiculo.ano, veiculo.placa, id])

    return dados.affectedRows
}

export async function DeletarVeiculo(id){
    let comando = `delete from tb_veiculo
                   where id_veiculo = ? `

    let [dados] = await conexao.query(comando, [id])
    
    return dados.affectedRows
}