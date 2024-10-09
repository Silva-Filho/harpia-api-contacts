
# API Contatos
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

API Rest para gerenciar contatos do usuário cadastrado.


## Autores

- [@Silva-Filho](https://github.com/Silva-Filho)


## Arquitetura

A pasta `src` está divida em:

- `configs`: onde ficam as configurações, no caso apenas do Joi;
- `controllers`: onde se encontra controladores de usuário, login e contatos;
- `database`: onde se faz a conecção com o banco de dados;
- `env`: onde se encontra variáveis de ambiente;
- `middlewares`: onde fica os intermediários aplicando regras do negócio e tratamentos de erros;
- `models`: onde fica os modelos de tabelas do banco de dados;
- `router`: onde fica as rotas da API;
- `validations`: onde fica as estruturas de validações usados no projeto;


## Stack utilizada

Foi usado o [NodeJS](https://nodejs.org/) para gerar o projeto em [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript).

Usou-se o ORM [Sequelize](https://sequelize.org/) para conectar e gerenciar o banco de dados.

Para gerenciamento da API, usou-se o [ExpressJS](http://expressjs.com/).

Para a parte de segurança, usou-se [bcryptjs](https://www.npmjs.com/package/bcryptjs) e [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).

Para melhor acesar e usar as rotas, usou-se o [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express).


## Setup

 - Yarn: ^1.22.4;
 - Node: ^14.16.1;
 - PostgreSQL: ^14;
 - CORS: ^2.8.5;
 - bcrypt: ^5.0.1;
 - express: ^4.18.1,
 - express-jwt: ^7.7.5;
 - jsonwebtoken: ^8.5.1;
 - sequelize: ^6.23.1;
 - pg: ^8.8.0;
 - pg-hstore: ^2.3.4;
 - swagger-ui-express: ^4.5.0;


## Rodando localmente

Clone o projeto

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto

```bash
  cd my-project
```

Primeiro, deve-se instalar as dependências usando o comando abaixo:
```bash
    yarn install
```

Depois, deve rodá-lo usado o seguinte comando:
```bash
    yarn dev
```

Para verificar se está dentro das regras do Eslint:
```bash
    yarn lint
```


## Demonstração


![API Contacts 01](https://github.com/user-attachments/assets/51749c6a-7663-4c90-ab96-575c13f0c7d8)


Para testar todos as rotas basta o projeto estar rodando e acessar o seguinte link:
- http://localhost:8081/api-docs/

## Funcionalidades

- Cadastrar novo usuário;
- Fazer login de usuário cadastrado; e
- Ações possíveis do usuário logado:
    - Cadastrar novo contato;
    - Ler os contatos cadastrados;
    - Obter informações de um contato; 
    - atualizar um contato; e 
    - apagar um contato.


## Uso/Exemplos

```javascript
const { Contact, User } = require( "../models" );

const addNewContact = async ( req, res ) => {
    try {
        const { name, email, telephone, users_id } = req.body;
        const { name: userName } = req.user;

        // @ts-ignore
        const customAdded = await Contact.create( {
            name,
            email,
            telephone,
            users_id,
        } );

        const newUser = {
            id: customAdded.id,
            name: customAdded.name,
            email: customAdded.email,
            telephone: customAdded.telephone,
            user: {
                id: customAdded.users_id,
                name: userName,
            },
        };

        return res.status( 201 ).json( newUser );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.errors[ 0 ].message } );
    }
};
```


## Melhorias

- Verificar se BD já existe;
- Criar usuário administrador (adm);
- Verificar se usuário é adm para método de usuário listar todos;
- Configurar o apagar para ser 'leve';
