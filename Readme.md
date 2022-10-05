# Trabalho Construcão de Software 2022-2 Grupo 6

Para rodar o projeto, clone este [repositório](git@github.com:pucrs-poli/constr-sw-2022-2-g6.git) e execute o comando:

```bash
docker-compose up
```

Acesso ao [keycloak](http://localhost:8080)
Acesso ao [swagger](http://localhost:3000/api-docs)

**É necessário criar um realm, idealmente importando o arquivo fornecido pelo professor que já vem pronto. Existe uma cópia do arquivo json para importar lá na interface do keycloak na pasta utils deste repositório.**

Feito isso, deve ser criado um client e um usuário administrador e alterar o *CLIENT_SECRET* no arquivo /backend/config.ts e trocar pelo secret gerado na criação do usuário no keycloak.

