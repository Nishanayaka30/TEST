Feature: listing 

 Scenario: Successfully login using valid username, password and otp
      Given I'm on the login page
        When I enter the email address as "murali.r+admininst1234@7edge.com"
        * I enter the password as "Admin@123"
        Then I submit the "login" button
        And I should see the OTP verification page
        * I should see the message "OTP sent to registered email successfully!"
        When I enter the OTP as "512656"
        Then I submit the "verify otp" button
        And I should see the select branch page
        Then I select the branch 
        * I submit the "proceed" button
        Then I should see the institution profile page
        And I should see the message "Login successfull!"

    #unhappy 

    Scenario: Searching unknown name in the staff directory

        Given I'm on the staff directory page
        When I search the name as "Ahsin"
        And I should see the message "No matching records found."


    #happy
    Scenario: Checking the headers of the table
        Given I'm on the staff directory page
        Then I should see all the headers in the staff directory


    Scenario: Sorting by name
      Given I'm on the staff directory page
      When I click on sort button of Full name
      Then I should see the fullname in ascending order 
      When I click on sort button of Full name
      Then I should see the fullname in descending order

    Scenario: Sorting by date
      Given I'm on the staff directory page
      When I click on sort button of Created On
      Then I should see the date in ascending order 
      When I click on sort button of Created On
      Then I should see the date in descending order

    
    Scenario: Sorting by status
      Given I'm on the staff directory page
      When I click on sort button of Status
      Then I should see the status in ascending order 
      When I click on sort button of Status
      Then I should see the status in descending order
    
     

