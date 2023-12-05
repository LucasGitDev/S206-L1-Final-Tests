Feature: Testando resources da API GoRest

Background:
  * def url_base = 'https://gorest.co.in/public/v2'
  * def new_user1_request = read('create_user1.json')
  * def new_user2_request = read('create_user2.json')
  * def bearer_token = 'Bearer d385427e8e17c50a766a0815a2546864cd5e54342bb234d2dc60556a5237a7da'
  
Scenario: Listando todos os usuários
  Given url url_base
  And path '/users'
  When method get
  Then status 200
  And match $ == '#[]'
  And match $ == '#[10]'
  And match each $ contains {id: '#number', name: '#string', email: '#string', gender: '#string', status: '#string'}

Scenario: Listando um usuário específico
  Given url url_base
  And path '/users/5710543'
  When method get
  Then status 200
  And match $.name == 'Karthik Sethi'

Scenario Outline: Criando um usuário
  Given header Authorization = bearer_token
  And header Content-Type = 'application/json'
  Given url url_base
  And path '/users'
  And request <create_user_request>
  When method post
  Then status 201
  And match $.id == '#number'
  And match $.name == '#string'

  Examples:
  | create_user_request |
  | new_user1_request |
  | new_user2_request |






