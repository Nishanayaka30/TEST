Feature: Login and OTP verification

    Scenario Outline: unsuccessfull login invalid credentials
        Given I'm on the login page
        When I enter the email address as "<email>"
        * I enter the password as "<pwd>"
        Then I submit the "login" button
        And I should see the message "Incorrect email address or password"

        Examples:
        |email                               |    pwd      |                                 
        | murali.r+admininst1234@7edge.com   | Admin@      | 
        | murali.r+admininst1234@7edge       | Admin@123   | 
        | murali.r+admininst1234@gmail.com   | Admin@123   |

    
    Scenario Outline: unsuccessfull login using empty fields
        Given I'm on the login page
        When I enter the email address as "<email>"
        * I enter the password as "<pwd>"

        Examples:
        |email                               |    pwd      | 
        |                                    |             |                                
        | murali.r+admininst1234@7edge.com   |             | 
        |                                    | Admin@123   | 


    Scenario: unsuccessfull login using invalid otp number
       Given I'm on the login page
        When I enter the email address as "murali.r+admininst1234@7edge.com"
        * I enter the password as "Admin@123"
        Then I submit the "login" button
        And I should see the OTP verification page
        * I should see the message "OTP sent to registered email successfully!"
        When I enter the OTP as "787989"
        Then I submit the "verify otp" button
        And I should see the message "Invalid OTP. Please try again or request a new OTP"


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
    





        


  





    

    
       


