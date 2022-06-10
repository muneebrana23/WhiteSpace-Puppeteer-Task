@training
Feature: Training feature

  Some scenarios to understand better how protractor and cucumber work

  @training_0
  Scenario: Test angular features button
    Given I navigate to angular website
    And I click the FEATURES button
      Then the text FEATURES & BENEFITS is displayed

  @training_01
  Scenario: Test angular features button 1
    Given I navigate to angular website
    And I click the FEATURES button
    Then the text FEATURES & BENEFITS is displayed
    And the section Cross Platform is displayed
    And the section Speed and Performance is displayed
    And the section Productivity is displayed

  @training_02
  Scenario: Test angular features button 2
    Given I navigate to angular website
    And I click the FEATURES button
    Then the text FEATURES & BENEFITS is displayed
    And the section texts are displayed
      | sectionText           |
      | Cross Platform        |
      | Speed and Performance |
      | Productivity          |


  @training_1
  Scenario: Test angular features button
    Given I navigate to angular website
    And I click the DOCS button
    Then the text Introduction to the Angular Docs is displayed

  @training_2
  Scenario Outline: Test angular tab buttons
    Given I navigate to angular website
    And I click the "<tabButton>" button
    Then the text "<title>" is displayed

    Examples:
      | tabButton | title                            |
      | Features  | Features & Benefits              |
      | Docs      | Introduction to the Angular Docs |

  @training_3
  Scenario: Test angular features button
    Given I navigate to angular website
    And I search for text "Nothing"
    Then No result found

  @training_4
  Scenario: Test angular features button
    Given I navigate to angular website
    And I search for text "Protractor"
    Then Some results are found

  @training_5
  Scenario Outline: Test angular features button
    Given I navigate to angular website
    And I search for text "<text>"
    Then "<resultString>" found

    Examples:
      | text       | resultString |
      | Nothing    | No result    |
      | Protractor | Some results |
      | Test       | Some results |
      | a          | Some results |
