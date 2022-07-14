# code-test

### Requirements:
Java 11 <= 16

Eclipse IDE / Jetbrains Intellij IDEA

Maven 3.6.2 or greater

NodeJs and npm installed

### Install packages:
npm -ig appium

mvn compile

mvn compiler:testCompile

### Run:
mvn test -Dcucumber.options="src/main/resources/features --tags @QATeam"

