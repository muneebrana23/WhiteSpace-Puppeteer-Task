import {AfterAll, BeforeAll, Given, setDefaultTimeout, Then } from "@cucumber/cucumber";
import * as puppeteer from "puppeteer";
const expect = require("chai").expect;

setDefaultTimeout(40000); 

let browser, page;

BeforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      '--start-maximized',
      '--no-sandbox'
    ]
  });
  page = await browser.pages().then(e => e[0]);
});

AfterAll(async function() {
  await page.waitFor(2000)
  await browser.close()
});

Given("I navigate to angular website", async function() {
  page.goto("https://angular.io/", { waitUntil: 'networkidle0' })
});

Given("I click the LEARN MORE button", async function() {
  await page.waitForXPath("//a[text()='Learn more']", { visible: true}).then(button => button.click());
});

Then("the text ANGULAR FEATURES is displayed", async function() {
  const CssSelector="#angular-features";
  const Expectedtitle="Angular features";
  const Actualtitle= await getCssSelectorText(CssSelector)
  expect(Actualtitle).to.equal(Expectedtitle.toLowerCase())
});

Then("the section texts are displayed", async function(dataTable) {
  const sectionTextElements = await page.$$('.text-headline')
  const AllsectionTexts = [];  
  for (let i = 0; i < sectionTextElements.length; i++) {
    const text = await sectionTextElements[i].evaluate(element => element.textContent.toLowerCase());
    AllsectionTexts.push(text)
  }

  dataTable.hashes().forEach((element,index) => {
    expect(AllsectionTexts[index]).to.equal(element.sectionText.toLowerCase())
  })
});

Given("I click the {string} button", async function(tabButton) {
  if(tabButton=="Learn More"){
    await page.waitForXPath("//a[text()='Learn more']", { visible: true}).then(button => button.click());
  } else if(tabButton=="Docs"){
    await page.waitForXPath("//span[text()='Docs']", { visible: true}).then(button => button.click());
  }
});

Then("the text {string} is displayed", async function(title) {
  if(title=="Angular Features"){
    const CssSelector="#angular-features";
    const Expectedtitle=title.toLowerCase();
    const Actualtitle= await getCssSelectorText(CssSelector)
    expect(Actualtitle).to.equal(Expectedtitle);
  } else if(title=="Introduction to the Angular Docs"){
    const CssSelector="h1#introduction-to-the-angular-docs";
    const Expectedtitle=title.toLowerCase()
    const Actualtitle= await getCssSelectorText(CssSelector)
    expect(Actualtitle).to.equal(Expectedtitle)
  }
});

Given("I search for text {string}", async function(searchTerm) {
  await page.waitForSelector("[aria-label='search']")
  await page.type("[aria-label='search']", searchTerm)
});

Then("{string} found", async function(searchResult) {
  if(searchResult=="No result"){
    const xpathSelector="//p[@class='no-results'][contains(text(),'No results found')]";
    const ActualResult= await getXpathText(xpathSelector)
    expect(ActualResult).to.include(searchResult)
  } else if(searchResult=="Some results"){
    const expectedResult="api";
    const xpathSelector="(//h3[@class='search-section-header'])[1]";
    const ActualResult= await getXpathText(xpathSelector)
    expect(ActualResult).to.include(expectedResult);
  }
});

async function getXpathText(xpathSelector) {
  await page.waitForXPath(xpathSelector)
  const [element] = await page.$x(xpathSelector)
  const ActualResult = await page.evaluate(element => element.textContent, element)
  return ActualResult;
};

async function getCssSelectorText(CssSelector) {
  await page.waitForSelector(CssSelector)
  const ActualResult = await page.$eval(CssSelector, el => el.innerText.toLowerCase())
  return ActualResult;
};
