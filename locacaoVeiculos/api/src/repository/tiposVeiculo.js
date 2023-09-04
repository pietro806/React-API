import conexao from "./connection.js"


export async function BuscarTipoVeiculo() {
    let comando = `select id_tipo_veiculo as Id,
                          nm_tipo         as Tipo
                     from tb_tipo_veiculo;`

    let [dados] =  await conexao.query(comando, [])
    
    return dados
}

export async function BuscarTipoId(id) {
    let comando = `select id_tipo_veiculo as Id,
                          nm_tipo         as Tipo
                     from tb_tipo_veiculo
                    where id_tipo_veiculo = ?`

    let [dados] =  await conexao.query(comando, [id])
    return dados[0]
}