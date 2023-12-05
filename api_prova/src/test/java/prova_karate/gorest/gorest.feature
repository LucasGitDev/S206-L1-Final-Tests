Feature: Testando resources da API GoRest

  Background:
    * def url_base = 'https://gorest.co.in/public/v2'
    * def new_user1_request = read('create_user1.json')
    * def new_user2_request = read('create_user2.json')
    * def bearer_token = 'Bearer <SEU TOKEN AQUI>'
    * def edit_user1_request = read('edit_user1.json')
    * def edit_user2_request = read('edit_user2.json')
    * def id1 = '5710542'
    * def id2 = '5710541'

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

  Scenario Outline: Editando um usuário
    Given header Authorization = bearer_token
    And header Content-Type = 'application/json'
    Given url url_base
    And path '/users/', id
    And request <update_user_request>
    When method put
    Then status 200
    And match $.id == '#number'
    And match $.name == '#string'

    Examples:
      | id | update_user_request |
      | 5710542 | edit_user1_request |
      | 5710541 | edit_user2_request |


  Scenario: Deletando um usuário
    Given header Authorization = bearer_token
    Given url url_base
    And path '/users/', id1
    When method delete
    Then status 204




