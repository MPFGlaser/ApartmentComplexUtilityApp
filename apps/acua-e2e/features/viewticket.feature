Feature: viewing repair requests

  Scenario: viewing all repair requests
    Given the user is logged in as a tenant
    When the user clicks on the repair requests link in the navigation bar
    Then the user should see a list of repair requests
    And the user should see a button to create a new repair request

  Scenario Outline: viewing a specific repair request
    Given the user is logged in as <role>
    And the user clicks on the repair requests link in the navigation bar
    And the user sees the repair request with title <title>
    When the user clicks on the repair request with title <title>
    Then the user should see the repair request details
    And the title of the repair request should be <title>

    Examples:
      | role      | title             |
      | a tenant  | "Tenant's Ticket" |
      | an admin  | "Tenant's Ticket" |
