
    function nameval() {
        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        var name = document.getElementById('fname').value;
        var emailform = document.getElementsByName('email')[0];
        var nameform = document.getElementsByName('Name')[0];
        var Check=0;
        if(!regName.test(name)){
            alert("Please enter your full name (first & last name).");
            Check=1;
        }
        if(Check==0)
        { 
        alert("Mr: "+nameform.value +" Your Request was submitted sucsesfully response will be sent to email: " +emailform.value );
        return true;
        }
        else
        return false;


    }  
    
   