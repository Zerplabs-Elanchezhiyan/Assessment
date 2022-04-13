document.cookie = "AccessToken=eyJraWQiOiJhZm5VVTd6STJzdk1ISEcydkl3eE44enlxU0NXck1NNSttUDUxYTZcL0Uydz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNzRjYjg0OS0xNDQ5LTQ0YWUtYmU3YS0wNGU0OTRhNDczYmIiLCJhdWQiOiI3dDgwNzYzN3Q5bmdwYmI1ZHZrOWIwbXV0NSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjBkMTg4M2RlLTMyMDctNDhmMi1iMjM5LTk4ZGZiMDNiZjBkNSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQ5MzkxNDgxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xXzZzMGFMblZFRSIsImNvZ25pdG86dXNlcm5hbWUiOiJjNzRjYjg0OS0xNDQ5LTQ0YWUtYmU3YS0wNGU0OTRhNDczYmIiLCJleHAiOjE2NDk0MTYxNzUsImlhdCI6MTY0OTQxMjU3NSwiZW1haWwiOiJnb3V0aGFtQHppcml1cy5pbiJ9.OiIutGSkdrOxJ6kCD1ZUChUzzdRouY8cWns5V967NsGmX-IKbQkzxe7lGBimQICkJLG4X4BgBeht2g3-VieMg-ifUCyUCXyIUgExNaSTKzuRp_SCyoJpkkqlyJO3-sUEeeD5BgX9MmbTL5e3x__m7o-wqGpe3y0tyfJUGfkyEohAkJYrWi7pGhccO1Scoi8l1isOPhb7Btqipx6Mkzw2JZni4kNih2XsZR5_H4cM-QiF9H-CjzLkfB8ci-op9PPKuEClxebQzVFhyiWB_LZf4vmZmz2cQKsRWc1WhPIXZkcKjsqv29x5HbCsrPMsaEAWDa3VvbKilOeR3FwJGXwZJA"

var paymymentType = {
    "ledgerTemplates": [{
        "id": 170,
        "code": "1",
        "name": "Faktura",
        "value": "1 - Faktura"
    }]
}

function loadData(url, position, listName, valueName, idValue) {
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                json = JSON.parse(this.responseText)
                var feild = document.getElementById(position)
                var itr
                for (itr = 0; itr < json[listName].length; itr++) {
                    feild.innerHTML += "<option value=" + json[listName][itr][idValue] + ">" + json[listName][itr][valueName] + "</option>"
                }
                console.log(json)
            }
        }
    };
    httpRequest.open("GET", url, true)
    httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*")
    httpRequest.setRequestHeader("authorization", "Bearer " + document.cookie.split("=")[1])
    httpRequest.setRequestHeader("companyid", "14")
    httpRequest.send()
}

function postData() {
    var url = new URL("http://localhost/ec/expense")
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4) {
            json = JSON.parse(this.responseText)
            if (this.status == 200) {
                alert("Data created sucessfully!!!")
                document.forms[0].reset()
            }
        }
    };
    httpRequest.open("POST", url, true)
    httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*")
    httpRequest.setRequestHeader("Content-Type", "application/json")
    httpRequest.setRequestHeader("authorization", "Bearer " + document.cookie.split("=")[1])
    httpRequest.setRequestHeader("companyid", "14")
    var formElements = document.getElementById('expenseClaimForm').getElementsByClassName('input');
    var obj = {
        "attachments": [],
        "amount": formElements[7].value,
        "currency": {
            "currencyCode": formElements[8].value
        },
        "employee": { "userId": parseInt(formElements[0].value) },
        "paymentType": {
            "id": parseInt(formElements[2].value)
        },
        "paymentMethod": {
            "id": parseInt(formElements[3].value)
        },
        "invoiceDate": formElements[4].value,
        "name": formElements[1].value,
        "notes": formElements[6].value,
        "payoutWithSalary": formElements[5].checked,
        "lineItems": [],
        "dimensions": []
    }
    json = JSON.stringify(obj)
    httpRequest.send(json);

}
loadData("http://localhost/ec/employees", "employee", "dropdownList", "value", "id")
loadData("http://localhost/ec/paymentMethod", "paymentMethod", "dropdownList", "value", "id")
loadData("http://localhost/ec/currencies", "currencies", "currencyList", "currencyName", "currencyCode")

function paymentType() {
    document.getElementById("paymentType").innerHTML += "<option value=" + paymymentType["ledgerTemplates"][0]["id"] + ">" + paymymentType["ledgerTemplates"][0]["value"] + "</option>"
}

function cardData() {
    document.getElementById("expenseClaimFormContainer").style.display = "none"
    document.getElementById("viewData").style.display = "flex"

    var url = new URL("http://localhost/ec/expenses/stage/Inbox?count=10&offset=0")
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.getElementById("cardHolder").innerHTML = ""
                var response = JSON.parse(this.responseText)
                for (var cards = 0; cards < response.expenses.length; cards++) {
                    var card = document.getElementById("card").cloneNode(true);
                    var spanElements = card.getElementsByTagName("span")
                    spanElements[0].innerHTML += response["expenses"][cards]["name"]
                    spanElements[1].innerHTML += response["expenses"][cards]["employee"]["name"]
                    spanElements[2].innerHTML += response["expenses"][cards]["invoiceDate"].split("T")[0]
                    spanElements[3].innerHTML += response["expenses"][cards]["notes"] == "" ? "-----" : response["expenses"][cards]["notes"]
                    spanElements[4].innerHTML += response["expenses"][cards]["amount"]
                    spanElements[4].innerHTML += "&emsp;" + response["expenses"][cards]["currency"]["currencyCode"]
                    card.style.display = "flex"
                    card.id = response["expenses"][cards]["id"]
                    document.getElementById("cardHolder").append(card)
                }
                console.log(response);
            }
        }
    };
    httpRequest.open("POST", url, true)
    httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*")
    httpRequest.setRequestHeader("Content-Type", "application/json")
    httpRequest.setRequestHeader("authorization", "Bearer " + document.cookie.split("=")[1])
    httpRequest.setRequestHeader("companyid", "14")
    var obj = {}
    json = JSON.stringify(obj)
    httpRequest.send(json);
}

function deleteData(elementId) {
    if (confirm("Are you sure you want to delete this?")) {
        var httpRequest = new XMLHttpRequest()
        httpRequest.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert("Deleted Sucessfully")
                    cardData()
                }
            }
        };
        url = "http://localhost/ec/expense/" + elementId
        httpRequest.open("DELETE", url, true)
        httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*")
        httpRequest.setRequestHeader("authorization", "Bearer " + document.cookie.split("=")[1])
        httpRequest.setRequestHeader("companyid", "14")
        httpRequest.send()
    }
}

function editData() {
    var elementId = document.getElementById("id").innerText
    var url = new URL("http://localhost/ec/expense?id=")
    var httpPostRequest = new XMLHttpRequest()
    httpPostRequest.onreadystatechange = function() {
        if (this.readyState == 4) {
            json = JSON.parse(this.responseText)
            if (this.status == 200) {
                var response = JSON.parse(this.responseText)
                cardData()
                alert("Data updated successfully")
                document.forms[0].reset()
                console.log(response);
            }
        }
    };
    url = url + elementId
    httpPostRequest.open("PUT", url, true)
    httpPostRequest.setRequestHeader("Access-Control-Allow-Origin", "*")
    httpPostRequest.setRequestHeader("Content-Type", "application/json")
    httpPostRequest.setRequestHeader("authorization", "Bearer " + document.cookie.split("=")[1])
    httpPostRequest.setRequestHeader("companyid", "14")
    var formElements = document.getElementById('expenseClaimForm').getElementsByClassName('input');
    var obj = {
        "attachments": [],
        "amount": formElements[7].value,
        "currency": {
            "currencyCode": formElements[8].value
        },
        "employee": { "userId": parseInt(formElements[0].value) },
        "paymentType": {
            "id": parseInt(formElements[2].value)
        },
        "paymentMethod": {
            "id": parseInt(formElements[3].value)
        },
        "invoiceDate": formElements[4].value,
        "name": formElements[1].value,
        "notes": formElements[6].value,
        "payoutWithSalary": formElements[5].checked,
        "lineItems": [],
        "dimensions": []
    }
    json = JSON.stringify(obj)
    httpPostRequest.send(json);
}

function getSetInduvidualData(elementId) {
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                json = JSON.parse(this.responseText)
                var formElements = document.getElementById('expenseClaimForm').getElementsByClassName('input');
                formElements[0].value = json["expense"]["employee"]["userId"]
                formElements[1].value = json["expense"]["name"]
                formElements[2].value = json["expense"]["paymentType"]["id"]
                formElements[3].value = json["expense"]["paymentMethod"]["id"]
                formElements[4].value = json["expense"]["invoiceDate"].split("T")[0]
                formElements[5].checked = json["expense"]["payoutWithSalary"]
                formElements[6].value = json["expense"]["notes"]
                formElements[7].value = parseInt(json["expense"]["amount"])
                formElements[8].value = json["expense"]["currency"]["currencyCode"]
                document.getElementById("id").innerText = elementId
            }
        }
    };
    url = "http://localhost/ec/expenses/" + elementId
    httpRequest.open("GET", url, true)
    httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*")
        // httpRequest.setRequestHeader("authorization", "Bearer " + document.cookie.split("=")[1])
    httpRequest.setRequestHeader("companyid", "14")
    httpRequest.send()
}

function showForm(elementId) {
    document.getElementById("edit").style.display = "block"
    document.getElementById("create").style.display = "none"
    document.getElementById("expenseClaimFormContainer").style.display = "flex"
    document.getElementById("viewData").style.display = "none"
    getSetInduvidualData(elementId)

}

function createData() {
    document.getElementById("create").style.display = "block"
    document.getElementById("edit").style.display = "none"
    document.getElementById("expenseClaimFormContainer").style.display = "flex"
    document.getElementById("viewData").style.display = "none"
    document.forms[0].reset()
}

function formValidate(feildId, elementId) {
    if (!document.forms[0].checkValidity()) {
        if (feildId == "all") {
            var formElements = document.forms[0].elements
            for (let index = 0; index < formElements.length; index++) {
                var tag = document.createElement("p");
                tag.className = 'error-feild'
                var text;
                feildId == "all" ? feildIdCheck = formElements[index].id : feildIdCheck = elementId;
                if (formElements[index].parentElement.getElementsByTagName('p')[0] == undefined && formElements[index].id == feildIdCheck) {
                    formElements[index].validity.customError = formElements[index].value == "" ? true : false
                    if (formElements[index].validity.valueMissing) {
                        text = document.createTextNode("Feild is required can't be empty");
                        tag.appendChild(text);
                        formElements[index].parentElement.appendChild(tag);
                    } else if (formElements[index].validity.customError) {
                        text = document.createTextNode("Feild is required can't be empty");
                        tag.appendChild(text);
                        formElements[index].parentElement.appendChild(tag);
                    } else if (formElements[index].validity.patternMismatch) {
                        text = document.createTextNode("Invalid Input for email format 'abc@gmail.com'");
                        tag.appendChild(text);
                        formElements[index].parentElement.appendChild(tag);
                    }


                } else if (formElements[index].id == feildIdCheck && formElements[index].parentElement.getElementsByTagName('p')[0] != undefined) {
                    formElements[index].parentElement.getElementsByTagName('p')[0].remove()
                }

            }
            document.getElementById('create').disabled = !document.forms[0].checkValidity()
            document.getElementById('edit').disabled = !document.forms[0].checkValidity()
        }
    } else {
        document.getElementById('create').disabled = !document.forms[0].checkValidity()
        document.getElementById('edit').disabled = !document.forms[0].checkValidity()
        if (elementId != undefined) {
            if (elementId == "create") {
                postData()
            } else if (elementId == "edit") {
                editData()
            }
        }

    }
}