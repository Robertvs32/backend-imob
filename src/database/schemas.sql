-- INSERIR SCHEMAS DO MYSQL

-- TABELA EMPRESAS --------------------------------------------------------------------------------------------------------
CREATE TABLE empresas(
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(100) NOT NULL,
    cnpj VARCHAR(25) UNIQUE NOT NULL,
    telefone1 VARCHAR(18) NOT NULL,
    telefone2 VARCHAR(18),
    created_at DATETIME DEFAULT (NOW())
);

INSERT INTO empresas(razao_social, cnpj, telefone1) VALUES('Zuccaro Imoveis', '111.222.333/0001-22', '(11) 94433-1234');
---------------------------------------------------------------------------------------------------------------------------

-- TABELA ROLES -----------------------------------------------------------------------------------------------------------
CREATE TABLE roles(
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,  
    created_at DATETIME DEFAULT (NOW())
);

INSERT INTO roles(nome) 
VALUES
('diretor geral'),
('adm'),
('financeiro'),
('diretor comercial'),
('gerente'),
('corretor'),
('cliente'),
('proprietario');
---------------------------------------------------------------------------------------------------------------------------

-- TABELA USUARIOS --------------------------------------------------------------------------------------------------------
CREATE TABLE usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    hash_senha VARCHAR(100) NOT NULL,
    telefone VARCHAR(18),
    cep VARCHAR(14),
    numero INT NOT NULL,
    cidade VARCHAR(50),
    estado VARCHAR(50),
    id_role INT NOT NULL,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_EMPRESA_USUARIO FOREIGN KEY(id_empresa) REFERENCES empresas(id_empresa),
    CONSTRAINT FK_ID_ROLES_USUARIO FOREIGN KEY(id_role) REFERENCES roles(id_role)
);

INSERT INTO usuarios(id_empresa, nome, email, hash_senha, telefone, cep, numero, cidade, estado, id_role)
VALUES(
    1, 
    'Osvaldo Zuccaro',
    'osvaldozuccaro@gmail.com', 
    '$2b$10$975h7q6E1gS5C/CBsAsaVOXG02FVkJP5HQN6YQB6H2C/tfZG8Im02',
    '(11) 94554-2223',
    '07124-555',
    34,
    'Guarulhos',
    'Sao Paulo',
    1
);
-- senha: osvaldo1234
---------------------------------------------------------------------------------------------------------------------------

-- TABELA DADOS CORRETORES ------------------------------------------------------------------------------------------------
CREATE TABLE dados_corretores(
   id_dados_corretor INT NOT NULL AUTO_INCREMENT,
   id_corretor INT NOT NULL,
   creci VARCHAR(12),

   CONSTRAINT PK_ID_DADOS_CORRETOR PRIMARY KEY(id_dados_corretor),
   CONSTRAINT FK_ID_CORRETOR FOREIGN KEY(id_corretor) REFERENCES usuarios(id_usuario)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA DADOS CLIENTES --------------------------------------------------------------------------------------------------
CREATE TABLE dados_clientes(
   id_dados_cliente INT NOT NULL AUTO_INCREMENT,
   id_cliente INT NOT NULL,
   rg VARCHAR(20),
   cpf VARCHAR(20),
   renda_bruta DECIMAL(12,2) DEFAULT(0) NOT NULL,
   estado_civil ENUM('Solteiro(a)', 'Casado(a)', 'Viuvo(a)', 'Divorciado(a)') NOT NULL,
   profissao VARCHAR(80),
   link_doc VARCHAR(512) DEFAULT NULL,
   link_holerite VARCHAR(512) DEFAULT NULL,
   link_irpf VARCHAR(512) DEFAULT NULL,
   link_residencia VARCHAR(512) DEFAULT NULL,
   link_certidao VARCHAR(512) DEFAULT NULL,

   CONSTRAINT PK_ID_DADOS_CLIENTE PRIMARY KEY(id_dados_cliente),
   CONSTRAINT FK_ID_CLIENTE FOREIGN KEY(id_cliente) REFERENCES usuarios(id_usuario)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA DADOS PROPRIETARIOS ---------------------------------------------------------------------------------------------
CREATE TABLE dados_corretores(
   id_dados_corretor INT NOT NULL AUTO_INCREMENT,
   id_corretor INT NOT NULL,
   creci VARCHAR(12),

   CONSTRAINT PK_ID_DADOS_CORRETOR PRIMARY KEY(id_dados_corretor),
   CONSTRAINT FK_ID_CORRETOR FOREIGN KEY(id_corretor) REFERENCES usuarios(id_usuario)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA IMOVEIS ---------------------------------------------------------------------------------------------------------
CREATE TABLE imoveis(
   id_imovel INT NOT NULL AUTO_INCREMENT,
   id_empresa INT NOT NULL,
   endereco VARCHAR(100) NOT NULL,
   numero VARCHAR(12) NOT NULL,
   cep VARCHAR(9) NOT NULL,
  
   CONSTRAINT PK_ID_IMOVEL PRIMARY KEY(id_imovel),
   CONSTRAINT FK_ID_EMPRESA_IMOVEL FOREIGN KEY(id_empresa) REFERENCES empresas(id_empresa)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA EQUIPES ---------------------------------------------------------------------------------------------------------
CREATE TABLE equipes(
    id_equipe INT NOT NULL AUTO_INCREMENT,
    id_gerente INT NOT NULL,
    created_id_user INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT PK_ID_EQUIPE PRIMARY KEY(id_equipe),
    CONSTRAINT FK_ID_GERENTE_EQUIPE FOREIGN KEY(id_gerente) REFERENCES usuarios(id_usuario),
    CONSTRAINT FK_ID_CREATED_ID_USER FOREIGN KEY(created_id_user) REFERENCES usuarios(id_usuario)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA LINK - CORRETOR / EQUIPE ----------------------------------------------------------------------------------------
CREATE TABLE corretores_equipe(
    id_link_corretor_equipe INT NOT NULL AUTO_INCREMENT,
    id_corretor INT UNIQUE NOT NULL,
    id_equipe INT NOT NULL,

    CONSTRAINT PK_ID_LINK_CORRETOR_EQUIPE PRIMARY KEY(id_link_corretor_equipe),
    CONSTRAINT FK_ID_CORRETOR_EQUIPE FOREIGN KEY(id_corretor) REFERENCES usuarios(id_usuario),
    CONSTRAINT FK_ID_EQUIPE FOREIGN KEY(id_equipe) REFERENCES equipes(id_equipe)  
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA LINK - PROPRIETARIO / IMOVEIS -----------------------------------------------------------------------------------
CREATE TABLE proprietarios_imoveis(
   id_link_proprietario_imovel INT NOT NULL AUTO_INCREMENT,
   id_proprietario INT NOT NULL,
   id_imovel INT NOT NULL,

   CONSTRAINT PK_ID_LINK_PROPRIETARIO_IMOVEL PRIMARY KEY(id_link_proprietario_imovel),
   CONSTRAINT FK_ID_PROPRIETARIO FOREIGN KEY(id_proprietario) REFERENCES usuarios(id_usuario),
   CONSTRAINT FK_ID_IMOVEL_LINK_PROPRIETARIO_IMOVEL FOREIGN KEY(id_imovel) REFERENCES imoveis(id_imovel),
   CONSTRAINT UQ_PROPRIETARIO_IMOVEL UNIQUE (id_proprietario, id_imovel)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA TIPOS PROPOSTAS -------------------------------------------------------------------------------------------------
CREATE TABLE tipos_proposta(
   id_tipo_proposta INT NOT NULL AUTO_INCREMENT,
   nome VARCHAR(50) UNIQUE NOT NULL,

   CONSTRAINT PK_ID_TIPO_PROPOSTA PRIMARY KEY(id_tipo_proposta)
);

INSERT INTO tipos_proposta(nome)
VALUE
('venda'),
('locacao');
---------------------------------------------------------------------------------------------------------------------------

-- TABELA STATUS PROPOSTAS ------------------------------------------------------------------------------------------------
CREATE TABLE status_proposta(
   id_status_proposta INT NOT NULL AUTO_INCREMENT,
   id_tipo_proposta INT NOT NULL,
   nome VARCHAR(50) NOT NULL,

   CONSTRAINT PK_ID_STATUS_PROPOSTA PRIMARY KEY(id_status_proposta),
   CONSTRAINT FK_ID_TIPO_PROPOSTA_STATUS_PROPOSTA FOREIGN KEY(id_tipo_proposta) REFERENCES tipos_proposta(id_tipo_proposta)
);

INSERT INTO status_proposta(id_tipo_proposta, nome)
VALUES
(1, "Pendente documentos"),
(1, "Pendente pagamentos"),
(1, "Aguardando assinatura do contrato"),
(1, "Cancelada"),
(1, "Concluída"),
(2, "Pendente análise de crédito"),
(2, "Pendente pagamentos"),
(2, "Aguardando assinatura do contrato"),
(2, "Cancelada"),
(2, "Concluída");
---------------------------------------------------------------------------------------------------------------------------

-- TABELA PROPOSTAS -------------------------------------------------------------------------------------------------------
CREATE TABLE propostas(
   id_proposta INT NOT NULL AUTO_INCREMENT,
   id_empresa INT NOT NULL,
   id_imovel INT NOT NULL,
   id_equipe INT NOT NULL,
   id_tipo_proposta INT NOT NULL,
   id_status_proposta INT NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   valor DECIMAL(12,2),   

   CONSTRAINT PK_ID_PROPOSTA PRIMARY KEY(id_proposta),
   CONSTRAINT FK_ID_EMPRESA_PROPOSTA FOREIGN KEY(id_empresa) REFERENCES empresas(id_empresa),
   CONSTRAINT FK_ID_IMOVEL_PROPOSTA FOREIGN KEY(id_imovel) REFERENCES imoveis(id_imovel),
   CONSTRAINT FK_ID_EQUIPE_PROPOSTA FOREIGN KEY(id_equipe) REFERENCES equipes(id_equipe),
   CONSTRAINT FK_ID_TIPO_PROPOSTA FOREIGN KEY(id_tipo_proposta) REFERENCES tipos_proposta(id_tipo_proposta),
   CONSTRAINT FK_ID_STATUS_PROPOSTA FOREIGN KEY(id_status_proposta) REFERENCES status_proposta(id_status_proposta)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA PAPEIS CORRETOR / PROPOSTA --------------------------------------------------------------------------------------
CREATE TABLE papeis_corretor(
   id_papel_corretor INT NOT NULL AUTO_INCREMENT,
   nome VARCHAR(50) NOT NULL,

   CONSTRAINT PK_ID_PAPEL_CORRETOR PRIMARY KEY(id_papel_corretor)
);

INSERT INTO papeis_corretor(nome)
VALUES
('captador'),
('vendedor');
---------------------------------------------------------------------------------------------------------------------------

-- TABELA LINK - CORRETOR / PROPOSTA --------------------------------------------------------------------------------------
CREATE TABLE corretores_propostas(
   id_link_corretor_proposta INT NOT NULL AUTO_INCREMENT,
   id_corretor INT NOT NULL,
   id_papel_corretor INT NOT NULL,
   id_proposta INT NOT NULL,

   CONSTRAINT PK_ID_LINK_CORRETOR_PROPOSTA PRIMARY KEY(id_link_corretor_proposta),
   CONSTRAINT FK_ID_CORRETOR_PROPOSTA FOREIGN KEY(id_corretor) REFERENCES usuarios(id_usuario),
   CONSTRAINT FK_ID_PAPEL_CORRETOR_PROPOSTA FOREIGN KEY(id_papel_corretor) REFERENCES papeis_corretor(id_papel_corretor),
   CONSTRAINT FK_ID_PROPOSTA_PROPOSTA FOREIGN KEY(id_proposta) REFERENCES propostas(id_proposta),
   CONSTRAINT UQ_CORRETORES_PROPOSTAS UNIQUE(id_corretor, id_proposta, id_papel_corretor)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA FORMAS DE PAGAMENTO / PROPOSTAS ---------------------------------------------------------------------------------
CREATE TABLE formas_pagamento(
   id_forma_pagamento INT NOT NULL AUTO_INCREMENT,
   id_tipo_proposta INT NOT NULL,
   nome VARCHAR(50) NOT NULL,

   CONSTRAINT PK_ID_FORMA_PAGAMENTO PRIMARY KEY(id_forma_pagamento),
   CONSTRAINT FK_ID_TIPO_PROPOSTA_FORMAS_PAGAMENTO FOREIGN KEY(id_tipo_proposta) REFERENCES tipos_proposta(id_tipo_proposta)
);

INSERT INTO formas_pagamento(id_tipo_proposta, nome)
VALUES
(1, 'Fgts'),
(1, 'Pix'),
(1, 'Transferência'),
(1, 'Permuta'),
(1, 'Financiamento'),
(1, 'Boleto bancário'),
(2, 'Pix'),
(2, 'Boleto bancário'),
(2, 'Transferência');
---------------------------------------------------------------------------------------------------------------------------

-- TABELA STATUS PAGAMENTOS -----------------------------------------------------------------------------------------------
CREATE TABLE status_pagamentos(
   id_status_pagamento INT NOT NULL AUTO_INCREMENT,
   nome VARCHAR(50) NOT NULL,

   CONSTRAINT PK_ID_STATUS_PAGAMENTO PRIMARY KEY(id_status_pagamento)
);

INSERT INTO status_pagamentos(nome)
VALUES
('pendente'),
('pago');
---------------------------------------------------------------------------------------------------------------------------

-- TABELA PAGAMENTOS / PROPOSTAS ------------------------------------------------------------------------------------------
CREATE TABLE pagamentos(
   id_pagamento INT NOT NULL AUTO_INCREMENT,
   id_proposta INT NOT NULL,
   id_forma_pagamento INT NOT NULL,
   id_cliente INT NOT NULL,
   id_status INT NOT NULL,
   valor DECIMAL(12,2),

   CONSTRAINT PK_ID_PAGAMENTO PRIMARY KEY(id_pagamento),
   CONSTRAINT PK_ID_CLIENTE_PAGAMENTO FOREIGN KEY(id_cliente) REFERENCES usuarios(id_usuario),
   CONSTRAINT FK_ID_PROPOSTA_PAGAMENTO FOREIGN KEY(id_proposta) REFERENCES propostas(id_proposta),
   CONSTRAINT FK_ID_FORMA_PAGAMENTO FOREIGN KEY(id_forma_pagamento) REFERENCES formas_pagamento(id_forma_pagamento),
   CONSTRAINT FK_ID_STATUS_PAGAMENTO FOREIGN KEY(id_status) REFERENCES status_pagamentos(id_status_pagamento)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA STATUS COMISSOES ------------------------------------------------------------------------------------------------
CREATE TABLE status_comissoes(
   id_status_comissao INT NOT NULL AUTO_INCREMENT,
   nome VARCHAR(50) UNIQUE NOT NULL,

   CONSTRAINT PK_STATUS_COMISSAO PRIMARY KEY(id_status_comissao)
);

INSERT INTO status_comissoes(nome)
VALUES
('pendente'),
('paga');
---------------------------------------------------------------------------------------------------------------------------

-- TABELAS COMISSOES -------------------------------------------------------------------------------------------------------
CREATE TABLE comissoes(
   id_comissao INT NOT NULL AUTO_INCREMENT,
   id_proposta INT NOT NULL,
   id_corretor INT NOT NULL,
   valor DECIMAL(10,2),
   id_status_comissao INT NOT NULL,


   CONSTRAINT PK_ID_COMISSAO PRIMARY KEY(id_comissao),
   CONSTRAINT FK_ID_PROPOSTA_COMISSAO FOREIGN KEY(id_proposta) REFERENCES propostas(id_proposta),
   CONSTRAINT FK_ID_STATUS_COMISSAO FOREIGN KEY(id_status_comissao) REFERENCES status_comissoes(id_status_comissao),
   CONSTRAINT FK_ID_CORRETOR_COMISSAO FOREIGN KEY(id_corretor) REFERENCES usuarios(id_usuario)
);
---------------------------------------------------------------------------------------------------------------------------

-- TABELA DESPESAS --------------------------------------------------------------------------------------------------------
CREATE TABLE despesas(
   id_despesa INT NOT NULL AUTO_INCREMENT,
   id_proposta INT NOT NULL,
   id_corretor INT NOT NULL,
   valor DECIMAL(10,2),


   CONSTRAINT PK_ID_DESPESA PRIMARY KEY(id_despesa),
   CONSTRAINT FK_ID_PROPOSTA_DESPESA FOREIGN KEY(id_proposta) REFERENCES propostas(id_proposta),
   CONSTRAINT FK_ID_CORRETOR_DESPESA FOREIGN KEY(id_corretor) REFERENCES usuarios(id_usuario)
);
---------------------------------------------------------------------------------------------------------------------------