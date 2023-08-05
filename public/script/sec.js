// // import axios from "axios";

// window.onload = () => {
//   let formData = new FormData();
//   const inputs = document.querySelectorAll(".fetchData");
//   const submitRider = document.getElementById('registrationSubmit');
//   submitRider.addEventListener("click", submitFunc);
//   inputs.forEach(input => { input.addEventListener("keyup", handleInputChange) })

//   let errors = {
//     nameField :{
//       id : 'Namerror',
//       text: "number are not allowed",
//       condition: ()=>{}
//     } ,
//     numberField :{
//       id : 'error',
//       text: "invalid number"
//     } ,
//     EmailField :{
//       id : 'Emailerror',
//       text: "number are not allowed"
//     } ,
//     passwordid :{
//       id : 'passerror',
//       text: "make a strong password"
//     } ,
//     conpassid :{
//       id : 'conpasserror',
//       text: "must be same password"
//     } 
//   }


//   function submitFunc(e) {
//     e.preventDefault();
//     for (const [key, value] of formData) {
//       console.log({
//         key, value
//       })
//     }
 

//     // if (!isNaN(formData.get.value)) {
//     //   document.getElementById("Namerror").innerHTML = "number are not allowed"
//     //   return false;
//     // }
//     // if (number.value.length > 10) {
//     //   document.getElementById("error").innerHTML = "invalid number"
//     //   return false;
//     // }
//     // if (number.value.length < 10) {
//     //   document.getElementById("error").innerHTML = "invalid number"
//     //   return false;
//     // }


//     // if (pass.value.length < 5) {
//     //   document.getElementById("passerror").innerHTML = "password must be in 5 to 20 char"
//     //   return false;
//     // }
//     // if (pass.value.length > 21) {
//     //   document.getElementById("passerror").innerHTML = "password must be in 5 to 20 char"
//     //   return false;
//     // }
//     // if (pass.value != conpass.value) {
//     //   document.getElementById("conpasserror").innerHTML = "must be same password"
//     //   return false;
//     // }

//    let hasError = false;

//     Object.keys(errors).forEach((name)=>{
//       if(!formData.get(name)){
//         document.getElementById(errors[name].id).innerHTML = errors[name].text;
//         hasError = true;
//       }
      
    
//     }) 
//     if(!hasError){
//        axios.post("/riderregistration", {
//       Name: formData.get('Name'),
//       Email: formData.get('Email'),
//       number: formData.get('number'),
//       password: formData.get('password'),
//       confirmPassword: formData.get('confirmPassword'),
//     })
//       .then(function (response) {
//         if (response.data.success) {
//           // window.location = '/Riderlogin';
//         }
//         console.log(response);
//       })
//       .catch(function (error) {
          
//       });
    
//     }}

//   function handleInputChange(e) {


//     let input = e.target;

//     formData.set(input.name, input.value);


//   }
// }

