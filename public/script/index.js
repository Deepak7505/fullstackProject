function myfunc(){


  let number = document.getElementById("numberField");
  let fristName = document.getElementById("nameField");
  let pass = document.getElementById("passwordid");
  let conpass = document.getElementById("conpassid");


  if(!isNaN(fristName.value)){
    document.getElementById("Namerror").innerHTML = "number are not allowed"
    return false;
  }  
   if(number.value.length>10){
    document.getElementById("error").innerHTML="*10 digit only"
     return false;
  }
   if(number.value.length<10){
    document.getElementById("error").innerHTML="*10 digit only"
    return false;
  }

   
  if(pass.value.length <5 ){
    document.getElementById("passerror").innerHTML = "password must be in 5 to 20 char"
    return false;
  }
  if(pass.value.length >21 ){
    document.getElementById("passerror").innerHTML = "password must be in 5 to 20 char" 
    return false;
  }
  if(pass.value != conpass.value){
    document.getElementById("conpasserror").innerHTML = "must be same password"
    return false;
   } 
}

