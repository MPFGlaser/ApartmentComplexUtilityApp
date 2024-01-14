Feature: homepage

  Scenario: a user visits the home page

    When any user visits the home page
    Then a welcome message will be shown

  Scenario: a user wants to get project information

    When any user visits the home page
    Then the user is shown a card with information about repair requests
