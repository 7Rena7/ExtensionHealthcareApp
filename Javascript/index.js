import UserAccount from "./domain.js";
import Repository from "./repository.js"

//It doesn't run any JS until all the HTML has been loaded 
document.addEventListener('DOMContentLoaded', function () { 

    const submitBtn = document.getElementById('submitBtn');
    let repository = new Repository();

    // Adds a user to the respective array in the repository
    function addUser (){
        // Variable declaration
        let firstName = document.getElementById('firstName');
        let lastName = document.getElementById('lastName');
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let passwordConfirm = document.getElementById('passwordConfirm');
        let accountType = document.getElementById('accountType');
        let accountTypeValue = accountType.options[accountType.selectedIndex].value;    

        // Checks if any of the input fields are empty
        if (firstName.value === '' || lastName.value === '' 
        || email.value === '' || password.value === '' || passwordConfirm.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'At least one of the fields is empty'
                })
        } 
        // Checks if the fisrtName or lastName have invalid characters
        else if (containsSpecialChars(firstName.value) || containsSpecialChars(lastName.value))  {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The first name or last name fields have invalid characters'
                })
            firstName.value = '';
            lastName.value = '';
        }

        // Checks if the passwords match
        else if (password.value !== passwordConfirm.value) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The password do not match'
                })
            password.value = '';
            passwordConfirm.value = '';
        }
        // Checks if the email is already in another user account
        else if (!repository.checkForExistingUser(email.value.trim(), accountTypeValue)) {
            // Creates a new UserAccount with the entered values
            let currentUser = new UserAccount(firstName.value.trim(), lastName.value.trim(), email.value.trim());

            // Here we can call a method to insert the new user in the DB
            // Here we can call a method to send an email to the newly created user

            // Tries to add the newly created user to the respective array 
            repository.addUserAcc(currentUser, accountTypeValue);
            Swal.fire(
                'Success!',
                'The user has been added succesfully',
                'success'
                );
            render();
            }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The user already exists'
                });
            render();
        }

        // Prints the current state of the arrays in the console
        console.clear();
        console.log('ArrayPatients: ' , repository.arrayPatients);
        console.log('ArrayCaregivers: ' , repository.arrayCaregivers);
        console.log('ArrayBothRoles: ' , repository.arrayBothRoles);
    }
    
    // Assigns all the input fields to their defaults
    function render() {
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        password.value = '';
        passwordConfirm.value = '';
    }

    // returns true if the string has invalid characters
    function containsSpecialChars(string) {
        const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
        return specialChars.test(string);
      }

    submitBtn.onclick = addUser;

});
