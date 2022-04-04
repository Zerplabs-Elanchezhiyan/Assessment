var url = "https://gorest.co.in/public/v2/users/"
document.cookie = "AccessToken=1a4ee54467c3e530f335aef9f14959e169524a63e9c9f28166a23d33c8db07f6"


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

function newTask(element) {
    if (document.getElementsByClassName("new-task-form-container")[0].style.display == "flex") {
        document.getElementsByClassName("new-task-form-container")[0].style.display = "none"
        document.getElementsByClassName("button-text")[0].innerText = "New Task"
        document.getElementById("new-task-button").style.display = "flex"
    } else {
        document.getElementsByClassName("new-task-form-container")[0].style.display = "flex"
        document.getElementById("new-task-button").style.display = "none"
    }
    if (element != undefined) {
        document.getElementById('createTask').value = 'Create'
        document.getElementsByClassName('form-heading').innerText = "Create Data"
        document.forms[0].elements[2].disabled = false;
        document.forms[0].elements[3].disabled = false;
        document.forms[0].elements[5].disabled = false;
        document.forms[0].elements[6].disabled = false;
    }
    return
}

function addStatus() {
    var status = document.getElementsByClassName("ticket-holder")[0].cloneNode(true)
    document.getElementsByClassName("ticket-holder")[0].parentElement.appendChild(status)
}

function loadData() {
    var responseObject = new XMLHttpRequest();
    responseObject.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            responseParse(response);
        }
    };
    responseObject.open("GET", url, true);
    responseObject.send();

    function responseParse(response) {
        var i;
        for (i = 0; i < response.length; i++) {
            var ticket = document.getElementsByClassName('ticket')[0].cloneNode(true);
            var formElements = document.getElementsByClassName('ticket')[i].getElementsByTagName('span')
            var itr;
            for (itr = 0; itr < formElements.length; itr++) {
                var idValue = formElements[itr].id
                formElements[itr].innerText = response[i][idValue]
            }
            document.getElementsByClassName('board')[0].appendChild(ticket)
        }
    }
}

function editData(element) {
    newTask();
    var responseObject = new XMLHttpRequest();
    responseObject.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            responseParse(response);
        }
    };
    var newUrl = url + element.parentElement.parentElement.getElementsByTagName('span')[0].innerText
    responseObject.open("GET", newUrl, true);
    responseObject.send();

    function responseParse(response) {
        var formElements = document.forms[0].elements
        formElements[0].value = response.id
        formElements[1].value = response.name

        if (response.gender == document.forms[0].elements[2].value) {
            formElements[3].disabled = true;
            formElements[2].disabled = false;
        } else {
            formElements[2].disabled = true;
            formElements[3].disabled = false;
        }

        formElements[4].value = response.email

        if (response.status == document.forms[0].elements[6].value) {
            formElements[6].checked = true;
        } else {
            formElements[5].checked = true;
        }
    }
    element.parentElement.parentElement.getElementsByTagName('span')[3].innerText == document.forms[0].elements[2].value ? document.forms[0].elements[2].checked = true : document.forms[0].elements[3].checked = true;
    document.getElementById('createTask').value = 'Update'
    document.getElementsByClassName('form-heading').innerText = "Update Data"
}

function crud(element) {
    if (document.getElementById('createTask').value == 'Create' && element == undefined) {
        var responseObject = new XMLHttpRequest();
        responseObject.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
                var response = JSON.parse(this.responseText);
                newTask()
                loadData()
                alert("Data Created sucessfully!!! ID:" + response.id);
                document.forms[0].reset()
            }
        };
        var urlNew = url
        responseObject.open("POST", urlNew);
        responseObject.setRequestHeader("Accept", "application/json");
        responseObject.setRequestHeader("Content-Type", "application/json");
        responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])

        var val = document.getElementById('task-form').elements;
        var obj = {}
        for (let i = 1; i < val.length - 1; i++) {
            obj[val[i].id] = val[i].value;
        }
        var json = JSON.stringify(obj)
        responseObject.send(json);
    } else if (document.getElementById('createTask').value == 'Update' && element == undefined) {
        var responseObject = new XMLHttpRequest();
        responseObject.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                newTask()
                loadData()
                alert("Data Patched sucessfully!!!");
            }
        };
        var urlNew = url + document.forms[0].elements[0].value
        responseObject.open("PATCH", urlNew, true);
        responseObject.setRequestHeader("Accept", "application/json");
        responseObject.setRequestHeader("Content-Type", "application/json");
        responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])

        var val = document.getElementById('task-form').elements;
        var obj = {
            "name": val[1].value,
            "email": val[4].value,
            "status": val[5].value
        }
        var json = JSON.stringify(obj)
        responseObject.send(json);
    } else if (element != undefined) {
        if (confirm("Are you sure you wanna delete this data?")) {
            var responseObject = new XMLHttpRequest();
            responseObject.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 204) {
                    alert("Data deleted sucessfully!!!");
                    loadData()
                }
            };
            var urlNew = url + element.parentElement.parentElement.getElementsByClassName("task-id")[0].innerText
            responseObject.open("DELETE", urlNew);
            responseObject.setRequestHeader("Accept", "application/json");
            responseObject.setRequestHeader("Access-Control-Allow-Origin", "*")
            responseObject.setRequestHeader("Content-Type", "application/json");
            responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])
            responseObject.send();
        }
    }

}