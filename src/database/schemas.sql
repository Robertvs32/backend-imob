-- TABELA EMPRESAS
CREATE TABLE empresas(
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(100) NOT NULL,
    cnpj VARCHAR(25) UNIQUE NOT NULL,
    telefone1 VARCHAR(18) NOT NULL,
    telefone2 VARCHAR(18),
    created_at DATETIME DEFAULT (NOW())
);

-- TABELA ROLES
CREATE TABLE roles(
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,  
    created_at DATETIME DEFAULT (NOW())
);

-- TABELA USUARIOS, QUE ENGLOBA TODAS AS ROLES
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

-- TABELA EQUIPES
CREATE TABLE equipes(
    id_equipe INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30),
    id_empresa INT NOT NULL,
    id_diretor_comercial INT NOT NULL,
    id_gerente INT NOT NULL,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_DIRETOR_EQUIPE FOREIGN KEY(id_diretor_comercial) REFERENCES usuarios(id_usuario),
    CONSTRAINT FK_ID_GERENTE_EQUIPE FOREIGN KEY(id_gerente) REFERENCES usuarios(id_usuario),
    CONSTRAINT FK_ID_EMPRESA_EQUIPE FOREIGN KEY(id_empresa) REFERENCES empresas(id_empresa)
);

-- TABELA DADOS CLIENTES, PRA NAO COLOCAR TUDO NA USUARIOS, QUE TERA MAIS ROLES, DEIXANDO CAMPOS VAZIOS
CREATE TABLE dados_clientes(
    id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    rg VARCHAR(20) UNIQUE,
    cpf VARCHAR(20) UNIQUE,
    renda_bruta DECIMAL(12,2) DEFAULT(0),
    estado_civil ENUM('Solteiro(a)', 'Casado(a)', 'Viuvo(a)', 'Divorciado(a)') NOT NULL,
    profissao VARCHAR(80),
    link_doc VARCHAR(512) DEFAULT NULL,
    link_holerite VARCHAR(512) DEFAULT NULL,
    link_irpf VARCHAR(512) DEFAULT NULL,
    link_residencia VARCHAR(512) DEFAULT NULL,
    link_certidao VARCHAR(512) DEFAULT NULL,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_CLIENTE_DADOS FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario)
);

-- TABELA DADOS CORRETORES, PRA NAO COLOCAR TUDO NA USUARIOS QUE TERA MAIS ROLES
CREATE TABLE dados_corretores(
    id_corretor INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_equipe INT NOT NULL,
    creci VARCHAR(20),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_CORRETOR_DADOS FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT DK_ID_EQUIPE_DADOS FOREIGN KEY(id_equipe) REFERENCES equipes(id_equipe)
);

-- TABELA DADOS PROPRIETARIOS, PRA NAO COLOCAR TUDO NA USUARIOS QUE TERA MAIS ROLES
CREATE TABLE dados_proprietarios(
    id_proprietario INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_PROPRIETARIO_DADOS FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario)
);

-- TABELA FORMAS PAGAMENTO VENDA
CREATE TABLE formas_pagamento_venda(
    id_forma_pagamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30),
    descricao VARCHAR(100),
    created_at DATETIME DEFAULT (NOW())
);

-- TABELA FORMAS PAGAMENTO LOCACAO
CREATE TABLE formas_pagamento_locacao(
    id_forma_pagamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30),
    descricao VARCHAR(100),
    created_at DATETIME DEFAULT (NOW())
);

-- TABELA IMOVEIS
CREATE TABLE imoveis(
    id_imovel INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(12) NOT NULL,
    numero INT NOT NULL,
    id_empresa INT NOT NULL,
    complemento VARCHAR(255) DEFAULT(''),
    codigo_imovel VARCHAR(20),
    valor_iptu DECIMAL(10,2),
    valor_condominio DECIMAL(10,2),
    link_matricula VARCHAR(150),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FOREIGN KEY(id_empresa) REFERENCES empresas(id_empresa)
);

-- TABELA PARA ASSOCIAR PROPRIETARIO AO IMÓVEL, E NÃO COLOCAR NA TABELA IMÓVEIS, PODE TER MAIS DE UM PROPRIETÁRIO
CREATE TABLE imovel_proprietario(
    id_imovel_proprietario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_proprietario INT NOT NULL,
    id_imovel INT NOT NULL,
    created_at DATETIME DEFAULT (NOW()),
    
    CONSTRAINT FK_ID_PROPRIETARIO_IMOVEL FOREIGN KEY(id_proprietario) REFERENCES dados_proprietarios(id_proprietario),
    CONSTRAINT FK_ID_IMOVEL_PROPRIETARIO FOREIGN KEY(id_imovel) REFERENCES imoveis(id_imovel)
);

-- TABELA PROPOSTAS DE VENDAS, SEPARAR RESPONSABILIDADES UNICAS
CREATE TABLE propostas_venda(
    id_proposta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    id_equipe INT NOT NULL,
    id_usuario INT NOT NULL,
    id_imovel INT NOT NULL,
    comissao DECIMAL(12, 2),
    link_contrato VARCHAR(150),
    valor_proposta DECIMAL(16, 2),
    situacao ENUM('Aguardando documentos', 'Enviado para analise financiamento', 'Aguardando assinatura de contrato', 'Finalizado'),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_EMPRESA_PROPOSTA_VENDA FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa),
    CONSTRAINT FK_ID_IMOVEL_PROPOSTA_VENDA FOREIGN KEY (id_imovel) REFERENCES imoveis(id_imovel),
    CONSTRAINT FK_ID_USUARIO_PROPOSTA_VENDA FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- TABELA DE COMISSOES, PRA SEPARAR AS RESPONSABILIDADES
CREATE TABLE comissoes_venda(
    id_comissao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_corretor INT NOT NULL,
    id_proposta INT NOT NULL,
    id_empresa INT NOT NULL,
    valor DECIMAL (10,2),
    situacao ENUM('pendente', 'paga', 'cancelada'),
    data_pagamento DATE,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT ID_CORRETOR_COMISSOES_VENDA FOREIGN KEY(id_corretor) REFERENCES dados_corretores(id_corretor),
    CONSTRAINT ID_PROPOSTA_COMISSOES_VENDA FOREIGN KEY(id_proposta) REFERENCES propostas_venda(id_proposta),
    CONSTRAINT FK_ID_EMPRESA_COMISSOES_VENDA FOREIGN KEY(id_empresa) REFERENCES empresas(id_empresa)
);

-- TABELA PAGAMENTOS, PRA NAO INSERIR TUDO DENTRO DA TABELA DE PROPOSTAS DE VENDA
CREATE TABLE pagamentos_venda(
    id_pagamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_proposta INT NOT NULL,
    id_empresa INT NOT NULL,
    valor DECIMAL(16,2) NOT NULL,
    id_forma_pagamento INT NOT NULL,
    data_pagamento DATE,
    situacao ENUM('concluido', 'pendente', 'cancelado'),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_PROPOSTA_PAGAMENTO_VENDA FOREIGN KEY(id_proposta) REFERENCES propostas_venda(id_proposta),
    CONSTRAINT FK_ID_FORMA_PAGAMENTO_VENDA FOREIGN KEY(id_forma_pagamento) REFERENCES formas_pagamento_venda(id_forma_pagamento),
    CONSTRAINT FK_ID_EMPRESA_PAGAMENTO_VENDA FOREIGN KEY(id_empresa) REFERENCES empresas(id_empresa)
);

-- TABELA CLIENTES VENDAS - LINKA O CLIENTE A PROPOSTA E ATRIBUI O SEU PAPEL NA COMPRA DO IMOVEL
CREATE TABLE clientes_vendas(
    id_cliente_venda INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_proposta INT NOT NULL,
    id_cliente INT NOT NULL,
    papel ENUM('comprador', 'co-comprador'),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_PROPOSTA_CLIENTE_VENDA FOREIGN KEY(id_proposta) REFERENCES propostas_venda(id_proposta),
    CONSTRAINT FK_ID_CLIENTE_VENDA FOREIGN KEY(id_cliente) REFERENCES dados_clientes(id_cliente)
);

-- TABELA LOCACAO, SEPARAR RESPONSABILIDADES DE VENDA E LOCACAO, QUE POSSUEM INFORMACOES DIFERENTES
CREATE TABLE propostas_locacao(
    id_proposta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    id_equipe INT NOT NULL,
    id_imovel INT NOT NULL,
    quantidade_moradores INT NOT NULL,
    data_admissao DATE,
    valor_proposta DECIMAL(16,2),
    status ENUM('Aguardando documentos', 'Enviado para analise de credito', 'Aguardando assinatura de contrato', 'Finalizado'),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_EMPRESA_PROPOSTA_LOCACAO FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa),
    CONSTRAINT FK_ID_IMOVEL_PROPOSTA_LOCACAO FOREIGN KEY (id_imovel) REFERENCES imoveis(id_imovel)
);

-- TABELA DE COMISSOES DE LOCACAO
CREATE TABLE comissoes_locacao(
    id_comissao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_corretor INT NOT NULL,
    id_proposta INT NOT NULL,
    id_empresa INT NOT NULL,
    valor DECIMAL (10,2),
    situacao ENUM('pendente', 'paga', 'cancelada'),
    data_pagamento DATE,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT ID_CORRETOR_COMISSOES_LOCACAO FOREIGN KEY(id_corretor) REFERENCES dados_corretores(id_corretor),
    CONSTRAINT ID_PROPOSTA_COMISSOES_LOCACAO FOREIGN KEY(id_proposta) REFERENCES propostas_locacao(id_proposta),
    CONSTRAINT FK_ID_EMPRESA_COMISSOES_LOCACAO FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);

-- TABELA DE PAGAMENTOS DE LOCACAO, NAO MISTURAR RESPONSABILIDADES
CREATE TABLE pagamentos_locacao(
    id_pagamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_proposta INT NOT NULL,
    id_empresa INT NOT NULL,
    id_forma_pagamento INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_pagamento DATE,
    situacao ENUM('concluido', 'pendente', 'cancelado'),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_PROPOSTA_PAGAMENTO_LOCACAO FOREIGN KEY(id_proposta) REFERENCES propostas_locacao(id_proposta),
    CONSTRAINT FK_ID_FORMA_PAGAMENTO_LOCACAO FOREIGN KEY(id_forma_pagamento) REFERENCES formas_pagamento_locacao(id_forma_pagamento),
    CONSTRAINT FK_ID_EMPRESA_PAGAMENTOS_LOCACAO FOREIGN KEY(id_empresa) REFERENCES empresas(id_empresa)
);

-- TABELA DE DESPESAS, QUE O CORRETOR IRÁ SOLICITAR A IMOBILIÁRIA
-- PODERÁ SER ABATIDO NO MOMENTO DO PAGAMENTO DAS COMISSÕES
CREATE TABLE despesas(
    id_despesa INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_corretor INT NOT NULL,
    id_empresa INT NOT NULL,
    id_proposta_venda INT DEFAULT NULL,
    id_proposta_locacao INT DEFAULT NULL,
    titulo VARCHAR(50),
    descricao VARCHAR(150),
    valor DECIMAL(10, 2),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT ID_CORRETOR_DESPESAS FOREIGN KEY(id_corretor) REFERENCES dados_corretores(id_corretor),
    CONSTRAINT ID_PROPOSTA_VENDA_DESPESAS FOREIGN KEY(id_proposta_venda) REFERENCES propostas_venda(id_proposta),
    CONSTRAINT ID_PROPOSTA_LOCACAO_DESPESAS FOREIGN KEY(id_proposta_locacao) REFERENCES propostas_locacao(id_proposta),
    CONSTRAINT FK_ID_EMPRESA_DESPESAS FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);

-- TABELA DE CLIENTES LOCACAO - LINKA O CLIENTE A LOCACAO E ATRIBUI O SEU PAPEL
CREATE TABLE clientes_locacao(
    id_cliente_locacao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_proposta INT NOT NULL,
    papel ENUM('locatario', 'co-locatario'),
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT FK_ID_PROPOSTA_CLIENTE_LOCACAO FOREIGN KEY(id_proposta) REFERENCES propostas_locacao(id_proposta),
    CONSTRAINT FK_ID_CLIENTE_LOCACAO FOREIGN KEY(id_cliente) REFERENCES dados_clientes(id_cliente)
);