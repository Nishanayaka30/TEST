
const { BeforeAll, AfterAll, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { By, Key, Builder, until } = require('selenium-webdriver');
require('dotenv').config();

setDefaultTimeout(60 * 1000);

let driver;

BeforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    global.driver = driver;
});




Given("I\'m on the login page", async function(){
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.get(`https://${process.env.URL_LOGIN}`);
    await new Promise(resolve => setTimeout(resolve, 5000));
});

When("I enter the email address as {string}", async function(email){
    await driver.wait(until.elementLocated(By.id('emailAddress'))).sendKeys(Key.chord(Key.CONTROL,'a',Key.DELETE),email);
    await new Promise(resolve => setTimeout(resolve, 2000));

});

When("I enter the password as {string}",async function(pwd){
    await driver.wait(until.elementLocated(By.id('passWord'))).sendKeys(Key.chord(Key.CONTROL,'a',Key.DELETE),pwd);
    await new Promise(resolve => setTimeout(resolve, 2000));

});

Then("I submit the {string} button", async function(button){
    let btn;
    switch(button){
        case 'login':
            btn=await driver.wait(until.elementLocated(By.id('login-form')));
            await new Promise(resolve => setTimeout(resolve, 2000));
            break;
        case 'verify otp': 
            btn=await driver.wait(until.elementLocated(By.id('otp-form')));
            await new Promise(resolve => setTimeout(resolve, 2000));
            break;
        case 'proceed':
            btn = await driver.wait(until.elementLocated(By.id('proceed')));
            await new Promise(resolve=> setTimeout(resolve,2000));
            break;  
        default:
            throw new Error('Button with name ${button} not found');          
    }
    await btn.click();
  
});

Then("I should see the message {string}", async function(message){
   
    let check = false;
    let counter = 100;
        
    while (counter > 0) {
        let pageSource = await driver.getPageSource();
        check = pageSource.includes(message);
        
        if (check) {
            console.log("checked");
        return "passed";
        } else {
            console.log("else block");
            await new Promise((resolve) => setTimeout(resolve,1000));
            counter--;
        }
    }
    throw new Error("Failed");
    
});

Then("I should see the OTP verification page", async function(){
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(),'Resend OTP')]`)));
    await new Promise(resolve => setTimeout(resolve, 2000));

});

When("I enter the OTP as {string}", async function(otp){

    for(let i=0;i<6;i++){
    const eachnumber = await driver.wait(until.elementLocated(By.id(`digit-${i+1}`))).sendKeys(Key.chord(Key.CONTROL, 'a', Key.DELETE),otp[i])
    }
    await new Promise(resolve => setTimeout(resolve, 2000));

});

Then("I should see the select branch page", async function(){
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.elementLocated(By.xpath('//p[text()="Select Branch"]')));
        
});

Then("I select the branch", async function(){
    await driver.wait(until.elementLocated(By.xpath('//label[text()="BDD Eugenia.Johns68"]'))).click();
   
    await new Promise(resolve => setTimeout(resolve, 2000));

});

Then("I should see the institution profile page", async function(){

    await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(),'Institution') and contains(text(),' Profile')]`)));
    await new Promise(resolve => setTimeout(resolve, 2000));

});




