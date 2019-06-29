
    function validateForm() {
        var matchPass = document.getElementById("psw").value;
        var matchEmail = document.getElementById("usrname").value;
        var check = /(?=.*[^a-zA-Z0-9])(?!.*\s)/;
        var emailStart = document.getElementsByName('usrname')[0];
          var passStart = document.getElementsByName('psw')[0];
         var checkError=0;
        if(!(matchPass.match(/[a-z]/g)))
        {
            alert("Must Contain atleast 1 lowerCase Character");
            checkError=1;
        }
        if(!(matchPass.match(/[A-Z]/g)))
        {
            alert("Must Contain atleast 1 upperCase Character");
            checkError=1;
        }
  
        if ((matchPass.length < 6)){
            alert("invalid length must be over 6 characters");
            checkError=1;
        }
        if(!(matchPass.match(/[0-9]/g)))
         {
            alert("Password must contain atleast one number");
            checkError=1; 
	  
        }
        if(!(matchPass.match(check)))
        {
	        alert("Must contain at least one special character");
            checkError=1;
        }
         if(checkError==0)
         {
             alert("Your email is: " +emailStart.value + " & " +"Your password is: " +passStart.value);
            return true;
         }
        else
        {
            alert("Password field: Must inclode atleast one uppercase and lowercase character,number,special character at minimum password length of 6"); 
            return false;
        }     
    }
    function myFunction() {
        var x = document.getElementById("psw");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
      function showPassModal() {
        var x = document.getElementById("signuppsw");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
        var y = document.getElementById("signupcpsw");
        if (y.type === "password") {
          y.type = "text";
        } else {
          y.type = "password";
        }
      }
      function validateSignup() {
          alert("hello");
        var SignupmatchPass = document.getElementById("signuppsw").value;
        var SignupmatchEmail = document.getElementById("signupusrname").value;
        var SignupmatchConfirmation = document.getElementById("signupcpsw").value;
        var check = /(?=.*[^a-zA-Z0-9])(?!.*\s)/;
        var SignupemailStart = document.getElementsByName('signupusrname')[0];
          var SignuppassStart = document.getElementsByName('signuppsw')[0];
         var checkError=0;
         if(SignupmatchPass != SignupmatchConfirmation) {
            alert("Passwords Don't Match");
            return false;
         }
         if(!(SignupmatchPass.match(/[a-z]/g)))
        {
            alert("Must Contain atleast 1 lowerCase Character");
            checkError=1;
        }
        if(!(SignupmatchPass.match(/[a-z]/g)))
        {
            alert("Must Contain atleast 1 lowerCase Character");
            checkError=1;
        }
        if(!(SignupmatchPass.match(/[A-Z]/g)))
        {
            alert("Must Contain atleast 1 upperCase Character");
            checkError=1;
        }
  
        if ((SignupmatchPass.length < 6)){
            alert("invalid length must be over 6 characters");
            checkError=1;
        }
        if(!(SignupmatchPass.match(/[0-9]/g)))
         {
            alert("Password must contain atleast one number");
            checkError=1; 
	  
        }
        if(!(SignupmatchPass.match(check)))
        {
	        alert("Must contain at least one special character");
            checkError=1;
        }
         if(checkError==0)
         {
             alert("Your email is: " +SignupemailStart.value + " & " +"Your password is: " +SignuppassStart.value);
            return true;
         }
        else
        {
            alert("Password field: Must inclode atleast one uppercase and lowercase character,number,special character at minimum password length of 6"); 
            return false;
        }     
    }
    