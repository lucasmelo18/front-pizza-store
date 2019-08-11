# Pizza Store
### Loja Virtual
[Clique aqui](https://pizzastorelucas.herokuapp.com/) para ver a aplicação publicada.

### Aplicação para cadastro de funcionários, e sabores de pizza.
---

Para o desenvolvimento foi utilizado:
* Angular 7
* NodeJS
* Express
* Mongodb
* Material Design

---

Na **primeira coluna** da aplicação, o usuário pode: `adicionar`, `remover` e `editar` o nome de funcionários.

Na **segunda coluna** da aplicação, o usuário pode `adicionar, remover e editar` dados para o cadastro de uma pizza:
- Nome do sabor
- Valor da Pizza
- Quantidade em estoque
- Qual é o funcionário responsável por esse sabor, já adicionado na primeira coluna 

### Para executar o projeto local:
~~~
Baixe o repositório do front-end
1 - git clone https://github.com/lucasmelo18/front-pizza-store
2 - cd front-pizza-store
3 - npm install
4 - ng serve 
5 - Acesse no seu navegador no endereço http://localhost:4200

Baixe o repositório do back-end
1 - git clone https://github.com/lucasmelo18/api-pizza-store
2 - cd api-pizza-store
3 - npm install
Inicie seu banco MONGODB 
 - sudo systemctl start mongodb
4 - Você pode visualizar os dados salvos em http://localhost:3000/funcionarios e http://localhost:3000/sabores

~~~
Para visualizar o código da API em nodeJS [clique aqui](https://github.com/lucasmelo18/api-pizza-store)