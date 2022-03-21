function showPassword(){
    var button=document.getElementById("password")
    if(button.type=="password"){
        button.type="text"
    } else {
        button.type="password"
    }
}