Feature: login

  Background:
    Given the user visits the home page

  Scenario Outline: a user wants to login
    Given the user has found the login page
    When the user enters the email <email>
    And the user enters the password <password>
    And the user clicks on the login button
    Then the user is redirected to the <redirect_page> page
    And the user is <login_status>
    And the user is shown a toast with the message <message>

    Examples:
      | email                 | password        | redirect_page | login_status  | message                  |
      | 'tenant@mpfglaser.nl' | 'password'      | 'profile'  | 'logged in'     | 'Login successful'       |
      | 'tenant@mpfglaser.nl' | 'wrongpassword' | 'login'    | 'not logged in' | 'Incorrect password.'    |
      | 'tenantmpfglaser.nl'  | 'password'      | 'login'    | 'not logged in' | 'Invalid email address.' |
