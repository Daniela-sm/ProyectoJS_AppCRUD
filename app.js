// showEmail is funtion to return value in form
showEmail();

// define constants, locate id in html
const emailInput = document.getElementById("emailInput");
const saveEmailBtn = document.getElementById("saveEmailBtn");


// make it save input when clicking on Save button
saveEmailBtn.addEventListener("click", function(){
    const emailInputValue = emailInput.value;
    if(emailInputValue){
        let emailId = localStorage.getItem("localEmail");
        if(emailId == null){
            userEmail = [];
        }
        else{
            userEmail = JSON.parse(emailId);
        }
        userEmail.push ({
            'email':emailInputValue
        });
        localStorage.setItem("localEmail", JSON.stringify(userEmail));
        emailInput.value = ' ';
    }
    showEmail();
})

// showEmail function coded:

function showEmail(){
    let emailId = localStorage.getItem("localEmail");
    if(emailId == null){
        userEmail = [];
    }
    else{
        userEmail = JSON.parse(emailId)
    }
    let html = '';
    let emailList = document.getElementById("emailList")
    userEmail.forEach((item, index) => {
        html += `<tr>
                    <th scope="row">${index+1}</th>
                    <td>${item.email}</td>
                    <td><button type="button" onclick="editEmail(${index})" class="btn btn-outline-info float-end"><i class="fa fa-edit"></i>Update</td>
                    <td><button type="button" onclick="deleteEmail(${index})" class="btn btn-outline-danger float-end"><i class="fa fa-trash"></i>Delete</td>
                </tr>`;        
    });
    emailList.innerHTML = html;
}