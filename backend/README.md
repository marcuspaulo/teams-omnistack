# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

# OmniStack - Criação de um Projeto Backend Multitentand

## 1 - Criação do backend

```bash
Adonis new backend —api-only
```

# Criando os modelos

## Projeto

```bash
adonis make:model Project -m -c
```

# Team

```bash
adonis make:model Team -m -c
```

#UserTeam (Tabela Pivot)

```bash
adonis make:model UserTeam -m -c
```

# Invite (Um membro convidar outros)

```bash
adonis make:model Invite -m -c
```

---

# Criando os relacionamentos

### Model Team

```js
class Team extends Model {
  users() {
    return this.belongsToMany("App/Models/User").pivotModel("App/Models/UserTeam");
  }
}
```

### Model Invite

```js
class Invite extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  team() {
    return this.belongsTo("App/Models/Team");
  }
}
```

### Model UserTeam

```js
class UserTeam extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
}
```

### Model User

#### Foi adicionado uma função de relacionamento teams, depois do tokens

```js
teams() {
    return this.belongsToMany("App/Models/Team").pivotModel(
      "App/Models/UserTeam"
    );
  }
```

---

# Instalando o ESlint (dev)

```bash
npm install eslint --dev
```

# Configurando o ESlint (dev)

```bash
npx eslint --init
```

#####

#Criando a rede do Docker

```sh
docker network create --driver bridge postgres-network
```

#Instalando o Postgres no Docker

docker run --name adonis -e "POSTGRES_PASSWORD=admin" -p 5432:5432 -v /Users/marcus/DESENVOLVIMENTO/PostgreSQL:/var/lib/postgresql/data -d postgres

docker run --name adonis --network=postgres-network -e "POSTGRES_PASSWORD=admin" -p 5432:5432 -v /Users/marcus/DESENVOLVIMENTO/PostgreSQL:/var/lib/postgresql/data -d postgres

MacBook-Air-de-MARCUS:~ marcus\$ docker run --name adonis --network=postgres-network -e "POSTGRES_PASSWORD=admin" -p 5432:5432 -v /Users/marcus/DESENVOLVIMENTO/PostgreSQL:/var/lib/postgresql/data -d postgres

docker run --name adonis -e "POSTGRES_PASSWORD=admin" -p 5432:5432 -v /Users/marcus/DESENVOLVIMENTO/PostgreSQL:/var/lib/postgresql/data -d postgres

5488634f1b778bc4248ed6adf608809408cc758a0e5e494309bfd48afb19328c
MacBook-Air-de-MARCUS:~ marcus\$ docker exec -it adonis /bin/bash

#Instalando o PGAdmin

```sh
root@localhost:~# docker pull fenglc/pgadmin4
root@localhost:~# docker run --name my_pgadmin4 -p 5050:5050 -d fenglc/pgadmin4
```

root@localhost:~# echo "host all all 172.17.0.0/24 md5" >> /var/lib/postgresql/data/pg_hba.conf
root@localhost:~# su postgres
postgres@localhost:~# psql -c "alter user postgres with password 'postgres';"
postgres@localhost:~# psql -c 'select pg_reload_conf();'

IP: 172.17.0.1

```sh
docker run --name postgres-gonode3 --network=postgres-network -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=mpaulobr@gmail.com” -e "PGADMIN_DEFAULT_PASSWORD=admin” -d dpage/pgadmin4
```

Acessando a URL http://localhost:15432 aparecerá a tela para login no pgAdmin 4:

# Dependência para o Postgres

```bash
npm i --save pg
```

# Iniciando o PostgreSQL

```bash
docker start adonis
```

# Executando as Migrations

```bash
adonis migration:run
```

# Criando dados para o Banco de Dados (Seed)

## Defina quais os modelos que serão preenchidos

```bash
adonis make:seed
```

# Executando o Seed

```bash
adonis seed
```

# Instalando o plugin Slugigy - Cria nomes similares a de uma URL minha-url-teste

```bash
adonis install @adonisjs/lucid-slugify
```

Link: https://github.com/adonisjs/adonis-lucid-slugify

### Como fica o Slugify, após sua configuração

```js
class Team extends Model {
  static boot() {
    super.boot();

    this.addTrait("@provider:Lucid/Slugify", {
      fields: {
        slug: "name"
      },
      strategy: "dbIncrement",
      disableUpdates: false
    });
  }

  users() {
    return this.belongsToMany("App/Models/User").pivotModel("App/Models/UserTeam");
  }
}

module.exports = Team;
```

# Criando a autenticação da aplicação

```bash
adonis make:controller Session
```

# Executando o projeto

```bash
adonis serve --dev
```

# Criando um Middleware Team

```bash
$ adonis make:middleware Team
```

# Criando um Hook para efetuar alguma ação

```bash
$ adonis make:hook Invite
```

# Adonis Kue Provider (Envio de e-mail)

```bash
$ npm install --save adonis-kue
```

Link Adonis-kue[!https://www.npmjs.com/package/adonis-kue]

# Configuração Adonis-kue

```bash
Configure
Register the kue provider in start/app.js:

const providers = [
  ...
  'adonis-kue/providers/KueProvider'
]
Register the commands provider in start/app.js:

const aceProviders = [
  ...
  'adonis-kue/providers/CommandsProvider'
]
Register the jobs in start/app.js:

const jobs = [
  ...
  'App/Jobs/Example'
]
```

# Criando um Job para o Adonis-kue

```bash
$ adonis make:job InvitationEmail
```

- No App, basta adicionar a seguinte linha:

```js
const jobs = ["App/Jobs/InvitationEmail"];
```

#Instalando o módulo do Redis-Adonis

```bash
$ adonis install @adonisjs/redis
```

### Configuração do Redis

```js
Setup instructions for @adonisjs/redis

Registering provider

Make sure you register the provider inside start/app.js file before making use redis.

const providers = [
'@adonisjs/redis/providers/RedisProvider'
]
Once that done you can make use of Redis anywhere by importing the redis provider.

const Redis = use('Redis')
await Redis.get()
Pub Sub

In order to make use of pub/sub you can subscribe to channels inside start/redis.js file.

const Redis = use('Redis')
Redis.subscribe('news', async () => {
})

// or bind listeners from `app/Listeners` directory
Redis.subcribe('news', 'News.onMessage')
Config

The config file config/redis.js contains all the configuration. Feel free to tweak it as per your needs.

Environment variables

The configuration file makes use of Environment variables, make sure to define them for development and in production too

REDIS_CONNECTION=local
```

## Docker - Executando o Redis

```bash
$ docker run --name redis -p 6379:6379 -d redis:alpine
```

## Testar conexão com o Adonis

```bash
$ adonis kue:listen
```

## Instalação do módulo de envio de e-mail

### [!https://adonisjs.com/docs/4.1/mail]

```bash
$ adonis install @adonisjs/mail
```

---

# Instalando as validações

### [!https://adonisjs.com/docs/4.1/validator]

```bash
$ adonis install @adonisjs/validator
```

## Then, register the validator provider inside the start/app.js file:

```bash
start/app.js
const providers = [
  '@adonisjs/validator/providers/ValidatorProvider'
]
```

# Criando validação User

```bash
$ adonis make:validator User
```

# Criando validação Team

```bash
$ adonis make:validator Team
```

# Criando validação Session

```bash
$ adonis make:validator Session
```

# Criando validação Project

```bash
$ adonis make:validator Project
```

# Criando validação Invite

```bash
$ adonis make:validator Invite
```

---

<hr/>

# Setup Autorização

Adonis ACL - [!https://github.com/enniel/adonis-acl] (Seguir instruições da página)

```bash
$ npm i adonis-acl --save
```

Executar a migration.

```bash
$ adonis acl:setup
```

## Limpar o banco de dados - Comando Refresh

```bash
$ adonis migration:refresh
```

## Executando o Seed com perfil de acesso.

```bash
$ adonis seed
```
