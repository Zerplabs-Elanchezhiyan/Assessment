function urlConstruct(){

  var formObj={
    name:document.getElementById("name").value,
    number:document.getElementById("phoneNumber").value,
    date : document.getElementById("dob").value,
    email : document.getElementById("email").value,
    maritalStatus:document.getElementById("Married").checked?"Married":"Single",
    file : document.getElementById("img").value,
    url : new URL("http://127.0.0.1:5501/Views/result.html")
  }
  // sessionStorage.setItem("formObj",formObj)
  // var Values=Object.values(formObj)
  // var Keys=Object.keys(formObj)
  // console.log(Values)
  // for (let i = 0; i < Values.length; i++) {
  //   sessionStorage.setItem(Keys[i],Values[i])
  // }
  formObj.url.searchParams.append("name",formObj.name)
  formObj.url.searchParams.append("phoneNumber",formObj.number);
  formObj.url.searchParams.append("dob",formObj.date);
  formObj.url.searchParams.append("email",formObj.email);
  formObj.url.searchParams.append("maritalStatus",formObj.maritalStatus);
  formObj.url.searchParams.append("file",formObj.file);
  window.location.href=formObj.url;
    // var myWindow=window.open(url,"","width:100px","height:100px");  
    // setTimeout(function() {myWindow.close()}, 3000);
}


// function validate () {
//   var validation=true;
//   var Values=[document.getElementById("name"),document.getElementById("dob"),
//   document.getElementById("phoneNumber"),document.getElementById("email"),document.getElementById("country")];
//   Values.forEach (element => {
//     console.log(element.value);
//     if(element.value==null||element.value=="") {
//       validation=false;
//     }
//   });
//   if(validation){
//     document.getElementById("submit").disabled=false;
//     return true;
//   } else {
//     document.getElementById("submit").disabled=true;
//   }
// }

function validate(){
  var validation=true;
    if(!document.forms[0].checkValidity()){
      validation = false;
    }
  if(validation){
    document.getElementById("submit").disabled=false;
    return true;
  } else {
    document.getElementById("submit").disabled=true;
  }
  console.log(validation);
}

function submitFunction(){
  if(validate()){
    urlConstruct();
  }
}

// function display () {

//   const urlParams = new URLSearchParams(window.location.search);
//   const name = urlParams.get('name');
//   document.write("<br>Name:");
//   document.write(name);
//   console.log(name);

//   const phoneNumber = urlParams.get('phoneNumber');
//   document.write("<br>Phone Number:");
//   document.write(phoneNumber);
//   console.log(phoneNumber);

//   const dob = urlParams.get('dob');
//   document.write("<br>Date of Birth:");
//   document.write(dob);     
//   console.log(dob);   
        
//   const email = urlParams.get('email');
//   document.write("<br>Email:");
//   document.write(email);        
//   console.log(email);

//   const maritalStatus=urlParams.get('maritalStatus');
//   document.write("<br>Marital Status:");
//   document.write(maritalStatus=="on"?"Married":"Single");
//   console.log(maritalStatus);

//   console.log("success");
//   document.write("<br><br>Values sumbmitted sucessfully!!!!")
// }
result = () => {
	parameters=new URLSearchParams(window.location.search)
  // console.log(parameters.key)
  var formObj=JSON.stringify(sessionStorage.getItem("formObj"))
  var Keys=Object.keys(formObj)
  var Values=Object.values(formObj)
  console.log(Keys)
  console.log(Values)

  // console.log(formObj.name)
  // parameters.forEach((val,key) => {
  //   // if (key=="maritalStatus") {
  //   //   document.write("Marital Status:")
  //   //   document.write(value!="on"?"Married<br>":"Single<br>");
  //   // } else {
  //   // document.write(key +":" +value + "<br>");
  //   // }
  //   console.log(val)
  //   document.getElementById(key).value=val
  //   console.log(document.getElementById(key));
  // });

//   var load = document.getElementById('img');
//   var file    = document.querySelector('input[type=file]').files[0];
//   var reader  = new FileReader();
//   console.log(load)
//   reader.onloadend = function () {
//     load.src = reader.result;
//   }

//   if (file) {
//     reader.readAsDataURL(file);
//   } else {
//     load.src = "";
//   }
}
