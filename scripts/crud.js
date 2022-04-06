var url = "https://gorest.co.in/public/v2/users/"
document.cookie = "AccessToken=1a4ee54467c3e530f335aef9f14959e169524a63e9c9f28166a23d33c8db07f6"
var responseObject = new XMLHttpRequest();
var apiResponseJson;
var json;

function sidebar() {
    $("#sidebar").toggle();
}



function newTask(element) {
    $("#newTaskButton").toggle();
    $("#formContainer").toggle();
    if (element != undefined) {
        document.getElementById('createTask').value = 'Create'
        document.getElementsByClassName('form-heading')[0].innerText = "Create Data"
    }
    return
}

function loadData() {

    responseObject.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                apiResponseJson = JSON.parse(this.responseText);
                loadList()
                responseParse(apiResponseJson);
            } else {
                alert("Error Status code:" + this.status)
            }
        }
    };
    responseObject.open("GET", url, true);
    responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])
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

function loadFormdata(element) {
    newTask();
    var id = element.parentElement.parentElement.getElementsByTagName('span')[0].innerText
    responseObject.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                apiResponseJson = JSON.parse(this.responseText);
                responseParse(apiResponseJson);
            } else {
                alert("Error Status code:" + this.status)
            }
        }
    };

    responseObject.open("GET", url + id, true);
    responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])
    responseObject.send();

    function responseParse(response) {
        var formElements = document.forms[0].elements
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
                    apiResponseJson = JSON.parse(this.responseText);
                    newTask()
                    loadData()
                    alert("Data Created sucessfully!!! ID:" + apiResponseJson.id);
                    document.forms[0].reset()
                } else {
                    alert("Error Status code:" + this.status)
                }
            }
        };

        responseObject.open("POST", url);
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
        json = JSON.stringify(obj)
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
        responseObject.open("PATCH", url + document.forms[0].elements[0].value, true);
        responseObject.setRequestHeader("Accept", "application/json");
        responseObject.setRequestHeader("Content-Type", "application/json");
        responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])

        var val = document.getElementById('task-form').elements;
        var obj = {
            "name": val[1].value,
            "email": val[4].value,
            "status": val[5].value
        }
        json = JSON.stringify(obj)
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
            var urlNew = url + element.getElementsByClassName("task-id")[0].innerText
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
    loadList()

}

function loadList() {
    var gender = [
        { Name: "Male", Id: "male" },
        { Name: "Female", Id: "female" },
    ];
    var status = [
        { Name: "Active", Id: "active" },
        { Name: "Inactive", Id: "inactive" },
    ];


    $("#listView").jsGrid({
        width: "100%",
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,

        data: apiResponseJson,

        onItemInserting: function(args) {
            responseObject.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 201) {
                        apiResponseJson = JSON.parse(this.responseText);
                        loadData()
                        alert("Data Created sucessfully!!! ID:" + apiResponseJson.id);
                    } else {
                        var Error = JSON.parse(this.responseText);
                        alert("Error:" + this.status)
                        alert("Error:" + Error.feild + Error.message)
                    }
                }
            };

            responseObject.open("POST", url);
            responseObject.setRequestHeader("Accept", "application/json");
            responseObject.setRequestHeader("Content-Type", "application/json");
            responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])

            var val = document.getElementById('task-form').elements;
            var obj = {
                "name": args.item.name,
                "email": args.item.email,
                "gender": args.item.gender,
                "status": args.item.status
            }
            json = JSON.stringify(obj)
            responseObject.send(json);
        },

        onItemInserted: function() { $("#jsGrid").jsGrid(apiResponseJson); },

        onItemUpdating: function(args) {
            responseObject.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        alert("Data Patched sucessfully!!!");
                        loadData()

                    } else {
                        alert("Error Status code:" + this.status)
                    }
                }
            };
            var urlNew = url + args.item.id
            responseObject.open("PATCH", urlNew, true);
            responseObject.setRequestHeader("Accept", "application/json");
            responseObject.setRequestHeader("Content-Type", "application/json");
            responseObject.setRequestHeader("Authorization", "Bearer " + document.cookie.split('=')[1])

            var obj = {
                "name": args.item.name,
                "email": args.item.email,
                "status": args.item.status
            }
            json = JSON.stringify(obj)
            responseObject.send(json);
        },
        onItemUpdated: function() { $("#jsGrid").jsGrid(apiResponseJson); },
        fields: [
            { name: "id", type: "number", width: 50 },
            { name: "name", type: "text", width: 150, validate: "required" },
            { name: "gender", type: "select", items: gender, valueField: "Id", textField: "Name" },
            { name: "email", type: "text", width: 200 },
            { name: "status", type: "select", items: status, valueField: "Id", textField: "Name" },
            { type: "control" }
        ]

    });

}

function boardView() {
    document.getElementById("boardView").style.display = "flex"
    document.getElementById("listView").style.display = "none"
}