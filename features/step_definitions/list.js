
const { BeforeAll, AfterAll, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { By, Key, Builder, until } = require('selenium-webdriver');
const assert = require('assert');
require('dotenv').config();


When("I search the name as {string}", async function(uname){
    await new Promise(resolve => setTimeout(resolve, 2000));
    await global.driver.wait(until.elementLocated(By.css("#search-value"))).sendKeys(Key.chord(Key.CONTROL,'a',Key.DELETE),uname);
    await new Promise(resolve => setTimeout(resolve, 1000));

});


Then("I should see all the headers in the staff directory", async function() {
    await new Promise(resolve => setTimeout(resolve, 3000));
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

    
    expectedHeaders.forEach((expectedHeader, index) => {
        assert.equal(headerTexts[index], expectedHeader);
    });

    await new Promise(resolve => setTimeout(resolve, 3000));
});



When("I click on sort button of Full name", async function(){
    await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="full_name"]/button[@class="pl-1.5"]`))).click();
    await new Promise(resolve => setTimeout(resolve, 3000));

});


Then("I should see the fullname in ascending order", async function() {
    const fname_columns = await global.driver.wait(until.elementsLocated(By.xpath(`//*[@id="list-items"]/td[2]`)));
    const fnames = [];

    for (let i = 0; i < fname_columns.length; i++) {
        const element = fname_columns[i];
        const text = await element.getText();
        fnames.push(text.trim()); 
    }

    const sortedFnames = [...fnames].sort((a, b) => a.localeCompare(b));

    assert.deepEqual(fnames, sortedFnames, 'The full names are not in ascending order');
});

Then("I should see the fullname in descending order", async function() {
    const fname_columns = await global.driver.wait(until.elementsLocated(By.xpath(`//*[@id="list-items"]/td[2]`)));
    const fnames = [];

    for (let i = 0; i < fname_columns.length; i++) {
        const element = fname_columns[i];
        const text = await element.getText();
        fnames.push(text.trim()); 
    }

    const sortedFnames = [...fnames].sort((a, b) => b.localeCompare(a));

    assert.deepEqual(fnames, sortedFnames, 'The full names are not in descending order');
});
    
   


When("I click on sort button of Created On", async function(){
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="created_at"]/button[@class="pl-1.5"]`))).click();
    await new Promise(resolve => setTimeout(resolve, 2000));

});


Then('I should see the date in ascending order', async function() {
    const createdon_columns = await global.driver.wait(until.elementsLocated(By.xpath(`//*[@id="list-items"]/td[6]`)));
    const createdon = [];

    for (let i = 0; i < createdon_columns.length; i++) {
        const element = createdon_columns[i];
        const text = await element.getText();
        createdon.push(text.trim());
    }

    const sortedDate = [...createdon].sort((a, b) => new Date(a) - new Date(b));

    assert.deepEqual(createdon, sortedDate, 'The dates are not in ascending order');
});

Then('I should see the date in descending order', async function() {
    const createdon_columns = await global.driver.wait(until.elementsLocated(By.xpath(`//*[@id="list-items"]/td[6]`)));
    const createdon = [];

    for (let i = 0; i < createdon_columns.length; i++) {
        const element = createdon_columns[i];
        const text = await element.getText();
        createdon.push(text.trim());
    }

    const sortedDate = [...createdon].sort((a, b) => new Date(b) - new Date(a));

    assert.deepEqual(createdon, sortedDate, 'The dates are not in descending order');
});


When("I click on sort button of Status", async function(){
    await global.driver.wait(until.elementLocated(By.xpath(`//*[@id="status"]/button[@class="pl-1.5"]`))).click();
    await new Promise(resolve => setTimeout(resolve, 2000));

});

Then('I should see the status in ascending order', async function() {
    const status_columns = await global.driver.wait(until.elementsLocated(By.xpath(`//*[@id="list-items"]/td[7]`)));
    const status = [];

    for (let i = 0; i < status_columns.length; i++) {
        const element = status_columns[i];
        const text = await element.getText();
        status.push(text.trim());
    }

    const sortedStatus = [...status].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    console.log('Actual Statuses:', status);
    console.log('Expected Sorted Statuses:', sortedStatus);

    assert.deepEqual(status, sortedStatus, 'The statuses are not in ascending order');
});

Then('I should see the status in descending order', async function() {
    const status_columns = await global.driver.wait(until.elementsLocated(By.xpath(`//*[@id="list-items"]/td[7]`)));
    const status = [];

    for (let i = 0; i < status_columns.length; i++) {
        const element = status_columns[i];
        const text = await element.getText();
        status.push(text.trim());
    }

    const sortedStatus = [...status].sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));


    assert.deepEqual(status, sortedStatus, 'The statuses are not in descending order');
});



