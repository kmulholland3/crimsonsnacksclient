function getEmployers(){
    //const allEmployersApiUrl = "https://localhost:5001/api/employers";
    const allEmployersApiUrl = "https://crimsonsnacksapi.herokuapp.com/api/employers";

    fetch(allEmployersApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul>";
        json.forEach((employer)=>{
            html += "<li>" + employer.userName + employer.password + "</li>" + "<button onclick=\"deleteEmployer("+employer.employerID+")\">Delete</button>";
        });
        html += "</ul>";
        document.getElementById("employers").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}

function postEmployer(){
  //const postEmployerApiUrl = "https://localhost:5001/api/employers";
  const postEmployerApiUrl = "https://crimsonsnacksapi.herokuapp.com/api/employers";
    const EmployerUserName = document.getElementById("UserName").value;
    console.log(EmployerUserName);
    const EmployerPassword = document.getElementById("Password").value;
    console.log(EmployerPassword);

    fetch(postEmployerApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            UserName: EmployerUserName,
            Password: EmployerPassword
        })
    })
    .then((response)=>{
        console.log(response);
        getEmployers();
    })
}

function validate(UserName, Password){
   //const checkEmployersApiUrl = "https://localhost:5001/api/employers";
   const checkEmployersApiUrl = "https://crimsonsnacksapi.herokuapp.com/api/employers";

    fetch(checkEmployersApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        json.forEach((employer)=>{
            console.log(employer.userName);
            console.log(employer.password);
            console.log(UserName);
            console.log(Password);
        if(employer.userName == UserName && employer.password == Password){
           location.href='employerchoice.html';
           throw BreakException;
        }
        else{
           location.href='employerloginpage.html';
        }
    });
    }).catch(function(error){
        console.log(error);
    });
}

deleteEmployer = function(id){
    console.log(id);
    //const deleteEmployerApiUrl = "https://localhost:5001/api/employers/" + id;
    const deleteEmployerApiUrl = "https://crimsonsnacksapi.herokuapp.com/api/employers" + id;

    fetch(deleteEmployerApiUrl, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    })
    .then((response)=>{
        console.log(response);
        getEmployers();
    })
}