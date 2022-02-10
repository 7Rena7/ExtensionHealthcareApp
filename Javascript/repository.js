// Implementing the Repository design pattern
// This class is in charge of communicatin with the DB (for now, locally) and 
// abstracting the access methods from the program logic

export default class Repository {
    constructor() {
        this.arrayPatients =  new Array();
        this.arrayCaregivers = new Array();
        this.arrayBothRoles = new Array();
    }

    // Tries to add the pUserAcc to the respective array depending on the pAccType
    addUserAcc(pUserAcc, pAccType){
        switch (pAccType) {
            case 'patient':
                this.arrayPatients.push(pUserAcc);
                break;
            case 'caregiver':
                this.arrayCaregivers.push(pUserAcc);
                break;
            case 'both':
                this.arrayBothRoles.push(pUserAcc);
                break;
            default:
              console.log('Error while trying to add user');
          }
    }

    // Checks if the emailUserAcc is in any of the arrays, returns true if the user already exists
    checkForExistingUser(emailUserAcc) {
        let userExists = false;
        for(var i=0; i<this.arrayPatients.length; i++) {
            if (this.arrayPatients[i].email == emailUserAcc) userExists = true;
        }
    
        for(var i=0; i<this.arrayCaregivers.length; i++) {
            if (this.arrayCaregivers[i].email == emailUserAcc) userExists = true;
        }
    
        for(var i=0; i<this.arrayBothRoles.length; i++) {
            if (this.arrayBothRoles[i].email == emailUserAcc) userExists = true;
        }

        return userExists;
    }

}