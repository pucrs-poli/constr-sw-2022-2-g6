# Trabalho Construcão de Software 2022-2 Grupo 6

Para rodar o projeto, clone este [repositório](git@github.com:pucrs-poli/constr-sw-2022-2-g6.git) e execute o comando:

```bash
docker-compose up
```

Acesso ao [keycloak](http://localhost:8080)
Pra rodar o swagger executar o comando ```npm start``` na raiz do projeto e acessar o [endereço](http://localhost:3000/api-docs).


**É necessário criar um realm, idealmente importando o arquivo fornecido pelo professor que já vem pronto. Existe uma cópia do arquivo json para importar lá na interface do keycloak na pasta utils deste repositório.**

**Também é preciso criar os seguintes volumes usando o docker:**
```bash 
    docker volume create keycloak-data
```
```bash 
    docker volume create mongodb-data
```

Feito isso, deve ser criado um client e um usuário administrador e alterar o *CLIENT_SECRET* no arquivo /src/keycloak/config.ts e trocar pelo secret gerado na criação do usuário no keycloak.

