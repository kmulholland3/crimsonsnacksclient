function postEmployee(){
    //const postEmployeeApiUrl = "https://localhost:5001/api/accounts";
    const postEmployeeApiUrl = "https://crimsonsnacksapi.herokuapp.com/api/accounts";
    const EmployeeFName = document.getElementById("EmpName").value;
    console.log(EmployeeFName);
    const EmployeeLName = document.getElementById("EmpLName").value;
    console.log(EmployeeLName);
    const EmployeeDept = document.getElementById("Department").value;
    console.log(EmployeeDept);

    fetch(postEmployeeApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            EmpFName: EmployeeFName,
            EmpLName: EmployeeLName,
            Dept: EmployeeDept
        })
    })
    .then((response)=>{
        console.log(response);
        getEmployees();
    })
}
function getEmployees(){
    //const allEmployeesApiUrl = "https://localhost:5001/api/accounts";
    const allEmployeesApiUrl = "https://crimsonsnacksapi.herokuapp.com/api/accounts";
    fetch(allEmployeesApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul>";
        json.forEach((accounts)=>{
            html += "<li>" + accounts.empFName + " " + accounts.empLName + " " + accounts.dept + "</li>";
        });
        html += "</ul>";
        document.getElementById("employees").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}
function getEmployeesForDelete(){
    //const allEmployeesApiUrl = "https://localhost:5001/api/accounts";
    const allEmployeesApiUrl = "https://crimsonsnacksapi.herokuapp.com/api/accounts";

    fetch(allEmployeesApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul>";
        json.forEach((accounts)=>{
            console.log(accounts.empID);
            html += "<li>" + accounts.empFName + " " + accounts.empLName + " " + accounts.dept + "</li>" + "<button onclick=\"deleteEmployee("+accounts.empID+")\">Delete</button>";
        });
        html += "</ul>";
        document.getElementById("employees").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}
deleteEmployee = function(id){
    console.log(id);
    //const deleteEmployeeApiUrl = "https://localhost:5001/api/accounts/" + id;
    const deleteEmployeeApiUrl = "https://crimsonsnacksapi.herokuapp.com/api/accounts/" +id;

    fetch(deleteEmployeeApiUrl, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    })
    .then((response)=>{
        console.log(response);
        getEmployeesForDelete();
    })
}
function validateEmployee(EmpID){
    //const checkEmployeesApiUrl = "https://localhost:5001/api/accounts";
    const checkEmployeesApiUrl = "https://crimsonsnacksapi.herokuapp.com/api/accounts";
    console.log("validate employee");

    fetch(checkEmployeesApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let found = false;
        json.forEach((account)=>{
        console.log(account.empID);
        console.log(EmpID);
        if(account.empID == EmpID){
            
            found = true;
            //location.href='clock.html';
            //document.cookie = "EmpID="+EmpID+";";
            
        }

    });
    if(found){
        var clocksection = document.getElementById("clockinout");
        clocksection.style.display = "block";
    }
    else{
        location.href='employee.html';
    }
    }).catch(function(error){
        console.log(error);
    });
}

window.onclick = function(event){
    var modal = document.getElementById("clockinout");
    if(event.target == modal){
        modal.style.display = "none";
    }
}
