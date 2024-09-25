
const { BeforeAll, AfterAll, Given, When, Then} = require('@cucumber/cucumber');
const { By, Key, Builder, until } = require('selenium-webdriver');
require('dotenv').config();

Given("I'm on the staff directory page", async function(){
    await new Promise(resolve => setTimeout(resolve, 3000));
    await global.driver.get(`https://${process.env.URL}`);
    await new Promise(resolve => setTimeout(resolve, 3000));

    
});


Then("I click on add staff button", async function(){
    await new Promise(resolve => setTimeout(resolve, 5000));
    await global.driver.wait(until.elementLocated(By.css('#addAdmin_user'))).click();
    await new Promise(resolve => setTimeout(resolve, 5000));

});



When("I enter first name as {string}", async function(fname){
    await global.driver.wait(until.elementLocated(By.id('first_name'))).sendKeys(Key.chord(Key.CONTROL,'a',Key.DELETE),fname);
    await new Promise(resolve => setTimeout(resolve, 2000));

});


When("I enter last name as {string}",async function(lname){
    
    await global.driver.wait(until.elementLocated(By.id('last_name'))).sendKeys(Key.chord(Key.CONTROL,'a',Key.DELETE),lname);
    await new Promise(resolve => setTimeout(resolve, 2000));

});


When("I enter employee number as {string}", async function(empno){
    await global.driver.wait(until.elementLocated(By.id('employee_number'))).sendKeys(Key.chord(Key.CONTROL,'a',Key.DELETE),empno);
    await new Promise(resolve => setTimeout(resolve, 2000));

});

When("I enter mobile number as {string}",async function(phno){
    await global.driver.wait(until.elementLocated(By.id('mobile_number'))).sendKeys(Key.chord(Key.CONTROL,'a',Key.DELETE),phno);
    await new Promise(resolve => setTimeout(resolve, 2000));
});


When("I enter email address as {string}", async function(email){
    await global.driver.wait(until.elementLocated(By.id('email_address'))).sendKeys(Key.chord(Key.CONTROL,'a',Key.DELETE),email);
    await new Promise(resolve => setTimeout(resolve, 2000));

});

When("I select type as {string}", async function(type){
    await new Promise(resolve => setTimeout(resolve, 2000));
    await global.driver.wait(until.elementLocated(By.id('dropdownMenu_acdemic_year'))).click();

    const first_option = await driver.wait(until.elementLocated(By.id('staff_type')));

        let text = await first_option.getText();
        if (text === type) {
          await first_option.click(); 
    
        }
        await new Promise(resolve => setTimeout(resolve, 2000));


});

When("I select Main Hub in Manage Roles as {string}", async function(hub){
    const class_hub= await global.driver.wait(until.elementLocated(By.className(`relative checkbox custom-checkBoxBlueBranch1 mb-1 flex`)));
    let text= await class_hub.getText();
    if(text == hub){

        await global.driver.wait(until.elementLocated(By.className("text-f7 font-normal text-[#031624] pl-2.5 w-full cursor-pointer"))).click();
    }
    await new Promise(resolve => setTimeout(resolve, 2000));


});

Then("I submit Add button", async function(){
    await global.driver.wait(until.elementLocated(By.id("add_admin"))).click();
    await new Promise(resolve => setTimeout(resolve, 2000));

});


Then("I should see the staff directory page", async function(){
   
    await global.driver.wait(until.elementLocated(By.xpath(`//*[contains(text(),'Staff Directory')]`)));
    await new Promise(resolve => setTimeout(resolve, 2000));

});



Then("I should see the message as {string}", async function(message){
   
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

AfterAll(async function () {
    await driver.sleep(5000);
    await driver.quit();
});