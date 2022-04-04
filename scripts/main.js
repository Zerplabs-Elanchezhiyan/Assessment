function setMax(date) {
    if (date == 'start-date') {
        document.getElementById(date).setAttribute('min', new Date().toISOString().split("T")[0])
        document.getElementById('end-date').value = document.getElementById('start-date').value
    } else {
        document.getElementById(date).setAttribute('min', document.getElementById('start-date').value)
    }
}

function sidebar() {
    if (document.getElementsByClassName("sidebar")[0].style.display == "flex") {
        document.getElementsByClassName("sidebar")[0].style.display = "none"
    } else {
        document.getElementsByClassName("sidebar")[0].style.display = "flex"
    }
}

function dateValidation() {
    var dateVal = document.getElementById('start-date').value
    if (dateVal != '') {
        document.getElementById('end-date').disabled = false
    } else {
        document.getElementById('end-date').value = ''
        document.getElementById('end-date').disabled = true
    }
}

function validate(feildId) {
    var formElements = document.forms[0].elements
    var tag = document.createElement("p");
    var text;
    tag.className = 'error-feild'
    for (let index = 0; index < formElements.length; index++) {
        if (formElements[index].parentElement.getElementsByTagName('p')[0] == undefined && formElements[index].id == feildId) {
            if (formElements[index].validity.valueMissing) {
                text = document.createTextNode("Feild is required can't be empty");
                tag.appendChild(text);
                formElements[index].parentElement.appendChild(tag);
            } else if (formElements[index].validity.patternMismatch) {
                text = document.createTextNode("Invalid Input for email format 'abc@gmail.com'");
                tag.appendChild(text);
                formElements[index].parentElement.appendChild(tag);
            }


        } else if (formElements[index].id == feildId && formElements[index].parentElement.getElementsByTagName('p')[0] != undefined) {
            formElements[index].parentElement.getElementsByTagName('p')[0].remove()
        }

    }
    document.getElementById('createTask').disabled = !document.forms[0].checkValidity()
}

function newTask() {
    if (document.getElementsByClassName("new-task-form-container")[0].style.display == "flex") {
        document.getElementsByClassName("new-task-form-container")[0].style.display = "none"
        document.getElementsByClassName("button-text")[0].innerText = "New Task"
        document.getElementById("new-task-button").style.display = "flex"
    } else {
        document.getElementsByClassName("new-task-form-container")[0].style.display = "flex"
        document.getElementById("new-task-button").style.display = "none"
    }
}

function send() {
    var val = document.getElementById('task-form').elements;
    console.log(val)
    var obj = {}
    for (let i = 0; i < val.length; i++) {
        obj[val[i].id] = val[i].value;
    }
    console.log(obj)
    var string = JSON.stringify(obj)
    console.log(string)
    localStorage.setItem("tasks", string)
    newTask();
}

function addStatus() {
    var status = document.getElementsByClassName("ticket-holder")[0].cloneNode(true)
    var board = document.getElementsByClassName('board')[0]
    board.insertBefore(status, document.getElementById('addStatus'))
}