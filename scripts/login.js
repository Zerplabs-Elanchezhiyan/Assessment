function showPassword() {
    var button = document.getElementById("password")
    if (button.type == "password") {
        button.type = "text"
        document.getElementById("togglePassword").className = "far fa-eye"
    } else {
        button.type = "password"
        document.getElementById("togglePassword").className = "far fa-eye-slash"
    }
}

function validate() {
    return document.forms[0].checkValidity();
}