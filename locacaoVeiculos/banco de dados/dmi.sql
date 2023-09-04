-- Insercão de dados na tabela cliente
insert into cliente_tb (nm_cliente, ds_email, ds_telefone, ds_cpf ,ds_cnh) 
				values ( 'Walderson', 'wal@gmail.com', '(11) 98460-2892', '333.222.111-09', '12345678910123');

select * from cliente_tb;


-- Select buscando o cliente pelo nome
select  nm_cliente  as Nome,
		ds_emailm   as Email,
        ds_telefone as Telefone,
        ds_cpf      as CPF,
        ds_cnh      as CNH
 from    cliente_tb
where   ds_nome     like '%?%';

-- Alterar cliente

update cliente_tb
   set nm_cliente = ?,
       ds_email = ?,
       ds_telefone = ?,
       ds_cpf = ?,
       ds_cnh = ?
 where id_cliente = ?;


-- Deletando cliente 

delete 
  from cliente_tb
 where id_cliente = ? ;


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


-- Insercão de dados na tabela veiculo
insert into tb_veiculo ( id_tipo_veiculo, nm_modelo, nm_marca, dt_ano,  ds_tipo,  ds_placa)
				values (   1,               'Fox', 'Volkswagen', 2000, 'Carro', 'abc-123');

select * from tb_veiculo;



-- Select buscando o veiculo pela marca, modelo ou placa
select  id_tipo_veiculo  as Tipo,
		nm_modelo   as Modelo,
        nm_marca    as Marca,
        dt_ano      as Ano,
        ds_placa    as Placa
 from 	tb_veiculo
where   (nm_modelo like '%?%'
   or   nm_marca  like '%?%'
   or   ds_placa  like '%?%');
	
-- Alterar Veiculo

update tb_veiculo
   set id_tipo_veiculo = ?,
       nm_modelo = ?,
       nm_marca = ?,
       dt_ano = ?,
       ds_placa = ?
 where id_veiculo = ?;

-- Deletando Veiculo

delete 
  from tb_veiculo
 where id_veiculo = ?;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------


-- Insercão de dados na tabela tipo veiculo
insert into tb_tipo_veiculo (nm_tipo)
					  values ('Carro');
insert into tb_tipo_veiculo (nm_tipo)
					  values ('Moto');	

select * from tb_tipo_veiculo;


select nm_tipo
  from tb_tipo_veiculo
 where id_tipo_veiculo = ?;
  