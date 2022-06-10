@QATeam
Feature: MapsTest
  Scenario: Check how far is London
    Given I open the app Maps
    When I search for London
    Then I see it is more than 0 kilometers away
