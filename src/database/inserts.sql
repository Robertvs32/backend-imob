-- INSERIR ROLES
INSERT INTO roles(nome)
VALUES
('Diretor geral'),
('Adm'),
('Diretor comercial'),
('Corretor'),
('Financeiro'),
('Cliente')

-- INSERIR EMPRESA
INSERT INTO empresas(razao_social, cnpj, telefone1)
VALUE('Zuccaro Imoveis', 'XX.XXX.XXX/XXXX-XX', '(11) 94654-2344');

-- INSERIR DIRETOR GERAL
INSERT INTO usuarios (id_empresa, nome, email, hash_senha, telefone, cep, numero, cidade, estado, id_role)
VALUE
(
    1, 
    'Osvaldo Zuccaro', 
    'osvaldo@zuccaro.com', 
    '$2b$10$b5PKAgTOFkeRj.Zg8mvZeu2DYfFVrMZ2h.9wYLRMIn.cjszxSyTH6',
    '(11) 94432-2345',
    '07124-000',
    123,
    'Guarulhos',
    'São Paulo',
    1
)