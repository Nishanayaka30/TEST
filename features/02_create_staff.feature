Feature: creating new staff and listing

     Scenario: Successfull login using valid username, password and otp
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


     Scenario Outline: Adding new staff with some empty fields and invalid data
          Given I'm on the staff directory page
          Then I click on add staff button
          When I enter first name as "<fname>"
          * I enter last name as "<lname>"
          * I enter employee number as "<empno>"
          * I enter mobile number as "<phno>"
          * I enter email address as "<email>"
          * I select type as "<type>"
          * I select Main Hub in Manage Roles as "<hub>"
          Then I submit Add button
          And I should see the message as "<msg>"

          Examples:
               | fname   | lname | empno | phno       | email                   | type     | hub     | msg                                         |
               |         |       |       |            |                         |          |         | Please fill in all the mandatory fields     |
               |         | D     | 456   | 8786789878 | bharath.shet@7edge.com  | Teaching | Classes | Please fill in all the mandatory fields     |
               | Bharath | D     |       | 8786789878 | bharath.shet@7edge.com  | Teaching | Classes | Please fill in all the mandatory fields     |
               | Bharath | D     | 456   |            | bharath.shet@7edge.com  | Teaching | Classes | Please fill in all the mandatory fields     |
               | Bharath | D     | 456   | 8786789878 |                         | Teaching | Classes | Please fill in all the mandatory fields     |
               | Bharath | D     | 456   | 8786789878 | bharath.shet@7edge.com  |          | Classes | Please fill in all the mandatory fields     |
               | Bharath | D     | 456   | 8786789878 | bharath.shet@7edge.com  | Teaching |         | Please fill in all the mandatory fields     |
               | Bharath | D     | 456   | 878678     | bharath.shet@7edge.com  | Teaching | Classes | Please enter valid details              |
               | Bharath | D     | 456   | 878678     | bharath.shet@7edge.     | Teaching | Classes | Please enter valid details              |
               | Bharath | D     | 456   | 8786789878 | bharath.shet@@7edge.com | Teaching | Classes | Please enter a valid Email Address      |
               | Bharath | D     | 456   | 8786789878 | .shet@7edge.com         | Teaching | Classes | Please enter a valid Email Address      |
               | Nisha   | M     | 666   | 7485784657 | nisha.nayaka@gmail.com  | Teaching | Classes |A user with the email address nisha.nayaka@gmail.com already exists|




     Scenario Outline: Successfully adding a new staff
          Given I'm on the staff directory page
          Then I click on add staff button
          When I enter first name as "Bharath"
          * I enter last name as "D"
          * I enter employee number as "456"
          * I enter mobile number as "8786789878 "
          * I enter email address as "bharath.shet@edge.com"
          * I select type as "Teaching"
          * I select Main Hub in Manage Roles as "Classes"
          Then I submit Add button
          And I should see the message as "Staff added successfully"
          And I should see the staff directory page
