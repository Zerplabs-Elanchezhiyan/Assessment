var url = "https://gorest.co.in/public/v2/users/"
document.cookie = "AccessToken=1a4ee54467c3e530f335aef9f14959e169524a63e9c9f28166a23d33c8db07f6"
var responseObject = new XMLHttpRequest();

function sidebar() {
    var sideBar = document.getElementsByClassName("sidebar")[0]
    if (sideBar.style.display == "flex") {
        sideBar.style.display = "none"
    } else {
        sideBar.style.display = "flex"
    }
}

function newTask(element) {
    var formContainer = document.getElementsByClassName("form-container")[0]
    var newtaskButton = document.getElementById("new-task-button")
    var formElements = document.forms[0].elements
    if (formContainer.style.display == "flex") {
        formContainer.style.display = "none"
        newtaskButton.innerText = "New Task"
        newtaskButton.style.display = "flex"
    } else {
        formContainer.style.display = "flex"
        newtaskButton.style.display = "none"
    }
    if (element != undefined) {
        document.getElementById('createTask').value = 'Create'
        document.getElementsByClassName('form-heading')[0].innerText = "Create Data"
        formElements[2].disabled = false;
        formElements[3].disabled = false;
        formElements[5].disabled = false;
        formElements[6].disabled = false;
    }
    return
}

function loadData() {

    responseObject.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                responseParse(response);
            } else {
                alert("Error Status code:" + this.status)
            }
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
    var id = element.parentElement.parentElement.getElementsByTagName('span')[0].innerText
    responseObject.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                responseParse(response);
            } else {
                alert("Error Status code:" + this.status)
            }
        }
    };
    var newUrl = url + id
    responseObject.open("GET", newUrl, true);
    responseObject.send();

    function responseParse(response) {
        var formElements = document.forms[0].elements
        console.log(formElements)
        formElements[0].value = response.id
        formElements[1].value = response.name

        if (response.gender == formElements[2].value) {
            formElements[2].checked = true;
        } else {
            formElements[3].checked = true;
        }

        formElements[4].value = response.email

        if (response.status == document.forms[0].elements[5].value) {
            formElements[5].checked = true;
        } else {
            formElements[6].checked = true;
        }
    }
    document.getElementById('createTask').value = 'Update'
    document.getElementsByClassName('form-heading')[0].innerText = "Update Data"
}

function crud(element) {
    var operation = document.getElementById('createTask').value
    if (operation == 'Create' && element == undefined) {

        responseObject.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 201) {
                    var response = JSON.parse(this.responseText);
                    newTask()
                    loadData()
                    alert("Data Created sucessfully!!! ID:" + response.id);
                    document.forms[0].reset()
                } else {
                    alert("Error Status code:" + this.status)
                }
            }
        };
        var urlNew = url
        responseObject.open("POST", urlNew);
        responseObject.setRequestHeader("Accept", "application/json");
        responseObject.setRequestHeader("Content-Type", "application/json");
        responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])

        var val = document.getElementById('task-form').elements;
        var obj = {
            "name": val[1].value,
            "email": val[4].value,
            "gender": val[2].checked == true ? "male" : "female",
            "status": val[5].checked == true ? "active" : 'inactive'
        }
        var json = JSON.stringify(obj)
        responseObject.send(json);
    } else if (operation == 'Update' && element == undefined) {

        responseObject.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    newTask()
                    loadData()
                    alert("Data Patched sucessfully!!!");
                    document.forms[0].reset()
                } else {
                    alert("Error Status code:" + this.status)
                }
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

            responseObject.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 204) {
                        alert("Data deleted sucessfully!!!");
                        loadData()
                    } else {
                        alert("Error Status code:" + this.status)
                    }
                }
            };
            var urlNew = url + element.parentElement.parentElement.getElementsByClassName("task-id")[0].innerText
            responseObject.open("DELETE", urlNew);
            responseObject.setRequestHeader("Accept", "application/json");
            responseObject.setRequestHeader("Content-Type", "application/json");
            responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])
            responseObject.send();
        }
    }

}

function listView() {
    document.getElementById("boardView").style.display = "none"
    document.getElementById("listView").style.display = "block"
    responseObject.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                responseParse(response);
            } else {
                alert("Error Status code:" + this.status)
            }
        }
    };
    responseObject.open("GET", url, true);
    responseObject.send();

    function responseParse(response) {

        var gender = [
            { Name: "", Id: null },
            { Name: "Male", Id: "male" },
            { Name: "Female", Id: "female" },
        ];
        var status = [
            { Name: "", Id: null },
            { Name: "Active", Id: "active" },
            { Name: "Inactive", Id: "inactive" },
        ];


        $("#listView").jsGrid({
            width: "100%",

            inserting: true,
            editing: true,
            sorting: true,
            paging: true,

            data: response,

            fields: [
                { name: "id", type: "number", width: 50, validate: "required" },
                { name: "name", type: "text", width: 150 },
                { name: "gender", type: "select", items: gender, valueField: "Id", textField: "Name" },
                { name: "email", type: "text", width: 200 },
                { name: "status", type: "select", items: status, valueField: "Id", textField: "Name" },
                { type: "control" }
            ]
        });


    }

}

function boardView() {
    document.getElementById("boardView").style.display = "flex"
    document.getElementById("listView").style.display = "none"
}