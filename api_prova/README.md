# API Tests

## Como rodar os testes

Altere `<SEU TOKEN AQUI>` para o token de acesso da API.

```bash
mvn test -Dtest=GoRestRunner -e
```

## Obtendo relatório

Basta encontrar o arquivo `/target/karate-reports/prova_karate.gorest.gorest.html` e abri-lo no navegador

## Observações

É necessário alterar os emails de cadastro a cada execução, pois o sistema não permite cadastro de emails repetidos.
