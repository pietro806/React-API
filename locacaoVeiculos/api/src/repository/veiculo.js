import conexao from "./connection.js"


export async function InserirVeiculo(veiculo){
    let comando = ` insert into tb_veiculo ( nm_modelo, id_tipo_veiculo, nm_marca, dt_ano, ds_tipo, ds_placa)
                                    values (?, ?, ?, ?, ?, ?);`
    
    let [dados] = await conexao.query(comando, [veiculo.modelo, veiculo.idTipo, veiculo.marca, veiculo.ano, veiculo.tipo, veiculo.placa])

    veiculo.Id = dados.insertId

    return veiculo
}

export async function BuscarVeiculoNome(nome){
    let comando = `select  id_veiculo      as Id,
                           id_tipo_veiculo as IdTipo,
                           nm_modelo       as Modelo,
                           nm_marca        as Marca,
                           dt_ano          as Ano,
                           ds_tipo         as Tipo,
                           ds_placa        as Placa
                           from 	       tb_Veiculo
                           where           (nm_modelo like ?
                           or              nm_marca  like ?
                           or              ds_placa  like ? );`
    
    let [dados] = await conexao.query(comando, [`%${nome}%`, `%${nome}%`, `%${nome}%`])

    return dados;
}

export async function BuscarVeiculo(){
    let comando = `select  id_veiculo      as Id,
                           id_tipo_veiculo as IdTipo,
                           nm_modelo       as Modelo,
                           nm_marca        as Marca,
                           dt_ano          as Ano,
                           ds_tipo         as Tipo,
                           ds_placa        as Placa
                           from 	       tb_veiculo`
    
    let [dados] = await conexao.query(comando, [])

    return dados;
}

export async function AlterarVeiculo(veiculo, id) {
    let comando = `update tb_veiculo
                   set id_tipo_veiculo = ?,
                   nm_modelo = ?,
                   nm_marca = ?,
                   dt_ano = ?,
                   ds_tipo = ?,
                   ds_placa = ?
                   where id_veiculo = ?;`
    
    let [dados] = await conexao.query(comando, [veiculo.idTipo, veiculo.modelo, veiculo.marca, veiculo.ano, veiculo.tipo, veiculo.placa, id])

    return dados.affectedRows
}

export async function DeletarVeiculo(id){
    let comando = `delete from tb_veiculo
                   where id_veiculo = ? `

    let [dados] = await conexao.query(comando, [id])
    
    return dados.affectedRows
}