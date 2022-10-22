// showEmail is funtion to return value in form
showEmail();

// define constants, locate id in html
let emailInput = document.getElementById("emailInput");
let saveEmailBtn = document.getElementById("saveEmailBtn");


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
    userEmail.forEach( (item, index) => {
   
        html += `<tr>
                    <th scope="row">${index+1}</th>
                    <td>${item.email}</td>
                    <td><button type="button" onclick="editEmail(${index})" class="btn btn-outline-info float-end"><i class="fa fa-edit"></i>Update</td>
                    <td><button type="button" onclick="deleteEmail(${index})" class="btn btn-outline-danger float-end"><i class="fa fa-trash"></i>Delete</td>
                </tr>`;        
    });
    emailList.innerHTML = html;
}


// delete email button for individual entries

function deleteEmail(index){
    let emailId = localStorage.getItem("localEmail");
    let userEmail = JSON.parse(emailId);
    // set our variables, ie for array in local storage, then splice (aka delete), update local storage and return output to our table
    userEmail.splice(index, 1);
    localStorage.setItem("localEmail", JSON.stringify(userEmail));
    showEmail();
}


// updateEmail function => upon pressing update, return value to entry form, activate/deactivate buttons
function editEmail(index){
    let updateEmail = document.getElementById("updateEmail");
    let saveEmailBtn = document.getElementById("saveEmailBtn");
    let updateEmailBtn = document.getElementById("updateEmailBtn");
    let emailId = localStorage.getItem("localEmail");
    let userEmail = JSON.parse(emailId);

    //in form return value stored, locates index and return value stored in the array
    updateEmail.value = index;
    emailInput.value = userEmail[index]['email'];

    saveEmailBtn.style.display="none";
    updateEmailBtn.style.display="inline-block";

}

// save Updated value, replaces old entry with the new one
let updateEmailBtn = document.getElementById("updateEmailBtn");
updateEmailBtn.addEventListener("click", function(e){
    let saveEmailBtn = document.getElementById("saveEmailBtn");
    let emailId = localStorage.getItem("localEmail");
    let userEmail = JSON.parse(emailId);


    let updateEmail = document.getElementById("updateEmail").value;

    for (keys in userEmail[updateEmail]) {
        if(keys == 'email'){
            userEmail[updateEmail].email = emailInput.value;
        }
    }
    
    updateEmailBtn.style.display="none";
    saveEmailBtn.style.display="inline-block";
    localStorage.setItem("localEmail", JSON.stringify(userEmail));
    emailInput.value = '';
    showEmail();
})