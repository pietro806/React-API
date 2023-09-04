create table cliente_tb (
id_cliente     int primary key auto_increment,
nm_cliente     varchar(200) not null,
ds_email       varchar(200) not null,
ds_telefone    varchar(200) not null,
ds_cpf         varchar(200) not null,
ds_cnh         varchar(200) not null
);


create table tb_veiculo (
id_veiculo     int primary key auto_increment,
id_tipo_veiculo int,
nm_modelo   varchar(200) not null,
nm_marca    varchar(200) not null,
dt_ano      int not null,
ds_tipo     varchar(200),
ds_placa	varchar(100) not null,
foreign key (id_tipo_veiculo) references tb_tipo_veiculo (id_tipo_veiculo)
);


create table tb_tipo_veiculo (
id_tipo_veiculo  int primary key auto_increment,
nm_tipo    varchar(200) not null
);
