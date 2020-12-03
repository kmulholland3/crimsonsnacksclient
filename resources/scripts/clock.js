function postTimeIn(){
    const postClocksApiUrl = "https://localhost:5001/api/clocks";
    //const empid = getCookie("EmpID");
    //console.log(empid);
    var TimeIn = new Date();
    console.log(TimeIn);
    var TimeOut = new Date();
    console.log(TimeOut);
    var TimeWorked = 0;
    console.log(TimeWorked);
    var empId = document.getElementById("EmpID").value;
    var employeeid = parseInt(empId, 10);
    console.log(employeeid);

    fetch(postClocksApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            timeIn: TimeIn,
            timeOut: TimeOut,
            timeWorked: TimeWorked,
            empID: employeeid
        })
    })
    .then((response)=>{
        console.log(response);
        //getClocks();
    })
}

function getClocks(){
    const allClocksApiUrl = "https://localhost:5001/api/clocks";

    fetch(allClocksApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul>";
        json.forEach((clocks)=>{
            console.log(clocks.timeIn);
            html += "<li>" + clocks.timeIn + " " + clocks.timeOut + " " + clocks.timeWorked + "</li>";
        });
        html += "</ul>";
        document.getElementById("clocks").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}

function getClocksForUpdate(empid){
    const allClocksApiUrl = "https://localhost:5001/api/clocks";
    var empId = document.getElementById("EmpID").value;
    var employeeid = parseInt(empId, 10);

    fetch(allClocksApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        json.forEach((clock)=>{
            console.log(clock.timeIn);
            console.log(clock.timeOut);
            var timeIn = clock.timeIn.slice(11, 16);
            var timeOut = clock.timeOut.slice(11, 16);
            if(clock.empID == employeeid && timeIn == timeOut){
                let timein = clock.timeIn;
                console.log("made it here" + timein);
                console.log(clock.timeOut);
                let id = clock.empID;
                console.log(id);
                putClockOut(clock.timeID, id, timein);
                }
        });

    }).catch(function(error){
        console.log(error);
    });
}
putClockOut = function(id, empid, timein){
    console.log(empid);
    console.log(timein);
    const putClockApiUrl = "https://localhost:5001/api/clocks/" + id;
    console.log(putClockApiUrl);
    const TimeOut = new Date();
    console.log(TimeOut);
    fetch(putClockApiUrl, {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            timeID: id,
            timeIn: timein,
            timeOut: TimeOut
        })
    })
    .then((response)=>{
        console.log(response);
    })
}

function getClocksReport(){
    const allEmployeesApiUrl = "https://localhost:5001/api/accounts";
    var arr = [];


    fetch(allEmployeesApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        json.forEach((accounts)=>{
            arr.push(accounts);
            // lName.push(accounts.empLName);
            // accID.push(accounts.id);
            
        });
    }).catch(function(error){
        console.log(error);
    });

    const allClocksApiUrl = "https://localhost:5001/api/clocks";
    var daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - 14);
    console.log(daysAgo);

    var dateString = daysAgo.getFullYear() + "-" + (daysAgo.getMonth()+1) + "-" + ("0" + daysAgo.getDate()).slice(-2) +"T" + ("0" + daysAgo.getHours()).slice(-2) + ":" + ("0" + daysAgo.getMinutes()).slice(-2) + ":" + daysAgo.getSeconds();
    console.log(dateString); 
    var count = 0;

    fetch(allClocksApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<table class=\"table table-dark\"><thead><tr><th scope=\"col\">ID</th><th scope=\"col\">First Name</th><th scope=\"col\">Last Name</th><th scope=\"col\">Clock In</th><th scope=\"col\">Clock Out</th><th scope=\"col\">Hours Worked</th><th scope=\"col\">Date</th></tr></thead><tbody>";
        json.forEach((clock)=>{
            console.log(clock.timeIn);
            var timeIn = clock.timeIn.slice(11, 16);
            var timeOut = clock.timeOut.slice(11, 16);
            var date = clock.timeIn.slice(0,10);
            //console.log(arr[count].empFName);
            if(clock.timeIn >= dateString){
                html += "<tr><th scope=\"row\">"+clock.empID+"<td>";
                for(i = 0; i<arr.length;i++){
                    if(arr[i].empID == clock.empID){
                    html += arr[i].empFName +"</td><td>" +arr[i].empLName+"</td><td>";
                    }
                }
                html += timeIn + "</td><td>" + timeOut + "</td><td>" + clock.timeWorked + "</td><td>" + date + "</td></tr>";
            }
            count++;
        });
        html += "</tbody></table>";
        document.getElementById("reports").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}
