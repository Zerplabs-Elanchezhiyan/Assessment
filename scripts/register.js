function showPassword(password, icon) {
    var button = document.getElementById(password)
    if (button.type == "password") {
        button.type = "text"
        document.getElementById(icon).className = "far fa-eye icon-color-change"
    } else {
        button.type = "password"
        document.getElementById(icon).className = "far fa-eye-slash icon-color-change"
    }
}

function passwordRequirement(password, container) {

    if (document.getElementById(password).value != '') {
        if (passwordValidity(document.getElementById(password).value, container)) {
            document.getElementById(container).style.display = "none";
            return passwordValidity(document.getElementById(password).value, container)
        }
    } else {
        document.getElementById(container).style.display = "block";
        return passwordValidity(document.getElementById(password).value, container)
    }
}

function passwordValidity(password, container) {
    var regEx = [/[A-z0-9@!$%()/.-_]{8,16}/g, /\d/g, /[@!$%()_]/g, /[A-Z]/g, /[a-z]/g]
    var validity = [];
    mainvalidity = true
    for (let i = 0; i < regEx.length; i++) {
        validity[i] = regEx[i].test(password)
    }

    for (let i = 0; i < validity.length; i++) {
        document.getElementById(container).getElementsByTagName("li")[i].style.color = validity[i] ? "green" : "white"
    }

    if (container == "confirm-password-requirement-container") {
        validity[5] = password == document.getElementById("password").value;
        console.log(password)
        console.log(document.getElementById("password").value)
        document.getElementById(container).getElementsByTagName("li")[5].style.color = validity[5] ? "green" : "white"
    }
    console.log(validity)
    for (let i = 0; i < validity.length; i++) {
        if (!validity[i]) {
            mainvalidity = false
            break
        }
    }
    if (mainvalidity) {
        document.getElementById(container).style.display = "none";
        return true
    } else {
        document.getElementById(container).style.display = "block";
        return false
    }
}
// function emailRequirement(email,container){

//     if(document.getElementById(email).value!=''){
//         if(emailvalidity(document.getElementById(email).value,container)){
//             document.getElementById(container).style.display="none";
//         }
//     } else {
//         console.log("password")
//         emailvalidity(document.getElementById(email).value,container)
//         document.getElementById(container).style.display="block";
//     }
// }
// function emailvalidity(email,container){
//     var regEx=[/(?= @){4,15}/,/[@]/g,/[a-z]{3,8}(?!@)/,/[.]/,/.$/]
//     var validity=[];
//     var mainvalidity=true
//     for (let i = 0; i < regEx.length; i++) {
//         validity[i]=regEx[i].test(email)
//     }

//     for (let i = 0; i < validity.length; i++) {
//         document.getElementById(container).getElementsByTagName("li")[i].style.color=validity[i]?"green":"white"
//     }

//     console.log(validity)
//     for (let i = 0; i < validity.length; i++) {
//         if(!validity[i]){
//             mainvalidity=false
//             break
//         }
//     }
//     if(mainvalidity){
//         document.getElementById(container).style.display="none";
//         return true
//     }
//     else{
//         document.getElementById(container).style.display="block";
//         return false
//     }
// }
function validate(val, container) {
    console.log(">>>")
    if (val == 'password' || val == 'confirm-password') {
        console.log(passwordRequirement(val, container))
        passwordRequirement(val, container)
    }
    if (passwordRequirement(val, container) && document.forms[0].checkValidity()) {
        document.getElementById('register').disabled = false
    } else {
        document.getElementById('register').disabled = true
    }

}