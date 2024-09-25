
const { BeforeAll, AfterAll, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { By, Key, Builder, until } = require('selenium-webdriver');
const assert = require('assert');
require('dotenv').config();


When("I search the name as {string}", async function(uname){
    await global.driver.wait(until.elementLocated(By.css("#search-value"))).sendKeys(Key.chord(Key.CONTROL,'a',Key.DELETE),uname);
    await new Promise(resolve => setTimeout(resolve, 2000));

});


Then("I should see all the headers in the staff directory", async function() {
    const expectedHeaders = [
        'Employee Number', 
        'Full Name', 
        'Email Address', 
        'Mobile Number', 
        'Type', 
        'Created On', 
        'Status', 
        'Actions'
    ]; 

    const header_row = await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="admin-table"]/thead/tr[1]`))); 
    const headerCells = await header_row.findElements(By.css('th')); 
    const headerTexts = await Promise.all(headerCells.map(cell => cell.getText()));

    // Compare each header from the page to the expected headers
    expectedHeaders.forEach((expectedHeader, index) => {
        assert.equal(headerTexts[index], expectedHeader, `Header mismatch at index ${index}`);
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
});



When("I click on sort button of Full name", async function(){
    await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="full_name"]/button[@class="pl-1.5"]`))).click();
    await new Promise(resolve => setTimeout(resolve, 2000));

});

Then("I should see the fullname in ascending order", async function(){

   const fname_column = await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="list-items"]/td[2]`)))
   const fnames=await Promise.all(fname_column.map(async element => await element.getText()));
   const sortedfnames = [...fnames].sort();
   assert.equal(fnames, sortedfnames );

});

Then("I should see the fullname in descending order", async function(){
   const fname_column = await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="list-items"]/td[2]`)))
   const fnames=await Promise.all(fname_column.map(async element => await element.getText()));
   const sortedfnames = [...fnames].sort().reverse();
   assert.equal(fnames, sortedfnames );
});

When("I click on sort button of Created On", async function(){
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="created_at"]/button[@class="pl-1.5"]`))).click();
    await new Promise(resolve => setTimeout(resolve, 2000));

});

Then('I should see the date in ascending order', async function(){
   const createdon_column = await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="list-items"]/td[6]`)))
    const createdon=await Promise.all(createdon_column.map(async element => await element.getText()));
    const sorteddate = [...createdon].sort();
    assert.equal(createdon, sorteddate); 
    

});

Then('I should see the date in descending order', async function(){
   const createdon_column = await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="list-items"]/td[6]`)))
    const createdon=await Promise.all(createdon_column.map(async element => await element.getText()));
    const sorteddate = [...createdon].sort().reverse();
    assert.equal(createdon, sorteddate); 
    
 
    
});

When("I click on sort button of Status", async function(){
    await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="status"]/button[@class="pl-1.5"]`))).click();
    await new Promise(resolve => setTimeout(resolve, 2000));

});

Then('I should see the status in ascending order', async function(){
    const status_column = await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="list-items"]/td[7]`)))
    const status=await Promise.all(status_column.map(async element => await element.getText()));
    const sortedstatus = [...status].sort();
    assert.equal(status,sortedstatus); 
});

Then('I should see the status in descending order', async function(){
    const status_column = await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="list-items"]/td[7]`)))
    const status=await Promise.all(status_column.map(async element => await element.getText()));
    const sortedstatus = [...status].sort().reverse();
    assert.equal(status,sortedstatus); 

});

