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

function validate(feildId) {
    // if (document.forms[0].checkValidity()) {
    //     document.getElementById('createTask').disabled = false
    // } else {
    //     document.getElementById('createTask').disabled = true
    // }
    var formElements = document.forms[0].elements
    for (let index = 0; index < formElements.length; index++) {

        var tag = document.createElement("p");
        tag.className = 'error-feild'
        if (formElements[index].validity.valueMissing) {
            if (formElements[index].parentElement.getElementsByTagName('p')[0] == undefined && formElements[index].id == feildId) {

                var text = document.createTextNode("Feild is required can't be empty");
                tag.appendChild(text);
                formElements[index].parentElement.appendChild(tag);
                break;
            }
        } else {
            if (formElements[index].id == feildId && formElements[index].parentElement.getElementsByTagName('p')[0] != undefined) {
                formElements[index].parentElement.getElementsByTagName('p')[0].remove()
            }
        }

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
    // var data = new FormData(document.forms[0])
    // console.log(data)
    var val = document.getElementById('task-form').elements;
    console.log(val)
    var obj = {}
    for (let i = 0; i < val.length; i++) {
        obj.val[i].id = val[i].value;
    }
    console.log(obj)
}