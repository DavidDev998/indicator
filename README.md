# Indicator
## Mapa com cadastro de empresas onde é mostrado a localização da empresa cadastrada e suas respectivas informações.

>Foi utilizando no desenvolvimento
 - NodeJS para o back;
 - EJS para o front;
 - Postgres como banco de dados;
 
>Eu queria ter utilizado react no front, mas para não separar os projetos e manter algo mais compácto, fácil de rodar e entender resolvi utilizar ejs para montar o front em tempo de execiçõa.

##Para rodar o projeto basta:

###rodar a query no banco de dados:
```
CREATE TABLE empresa (
    id SERIAL PRIMARY KEY,
    nome text NOT NULL,
    latitude text,
    longitude text
);

ALTER TABLE empresa
ADD FOREIGN KEY (id) REFERENCES empresa(id);

CREATE TABLE indicacao (
    id SERIAL PRIMARY KEY,
    empresa int NOT NULL,
    empresaIndicadora int NOT NULL
);

ALTER TABLE indicacao
ADD FOREIGN KEY (empresa) REFERENCES empresa(id),
ADD FOREIGN KEY (empresaIndicadora) REFERENCES empresa(id);
```

Após isso configure a conexão com o database no arquivo /src/db/main.js .

Depois é só rodar index.js;

#### note que é necessário configurar a porta no arquivo index.js

Qualquer dúvida [meu insta está aqui](https://www.instagram.com/daviddev.jr/)
