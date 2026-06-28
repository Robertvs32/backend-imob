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
    '$2b$10$975h7q6E1gS5C/CBsAsaVOXG02FVkJP5HQN6YQB6H2C/tfZG8Im02', --osvaldo1234
    '(11) 94554-2223',
    '07124-555',
    34,
    'Guarulhos',
    'Sao Paulo',
    1
);

---------------------------------------------------------------------------------------------------------------------------