function sidebar() {
    if (document.getElementsByClassName("sidebar")[0].style.display == "flex") {
        document.getElementsByClassName("sidebar")[0].style.display = "none"
    } else {
        document.getElementsByClassName("sidebar")[0].style.display = "flex"
    }
}

function dateValidation(date) {
    var dateVal = document.getElementById(date).value
    if (date == 'start-date' && dateVal != null) {
        document.getElementById('end-date').disabled = false
    } else if (new Date(dateVal).getTime() < new Date(document.getElementById('start-date').value).getTime()) {
        console.log("Hiii");
        document.getElementById('end-date').focus();
        document.getElementById('createTask').disabled = true
    } else {
        document.getElementById('createTask').disabled = false
    }
}

function validate() {
    if (document.forms[0].checkValidity()) {
        document.getElementById('createTask').disabled = false
    } else {
        document.getElementById('createTask').disabled = true
        var array = document.forms[0].getElementsByTagName('input')
        console.log(array);
    }
}

function newTask() {
    if (document.getElementsByClassName("task-form-container")[0].style.display == "flex") {
        document.getElementsByClassName("task-form-container")[0].style.display = "none"
        document.getElementsByClassName("new-task-button")[0].value = "New Task"
    } else {
        document.getElementsByClassName("task-form-container")[0].style.display = "flex"
        document.getElementsByClassName("new-task-button")[0].value = "Cancel  X"
    }
}

function send() {
    var data = new FormData(document.forms[0])
    console.log(data)
}