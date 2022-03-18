//Utility functions
//1. Utility function to get Dom element from string 
 function getElementFromString(string) {
     let div = document.createElement('div');
     div.innerHTML = string;
     return div.firstElementChild;
 }



// Initialize no of parameters
let addedParamCount = 0;

// Hide parameters Box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//if the user clicks on params box, hide the JSON box 
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';
})


//if the user clicks on JSON box, hide the params box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// if the user clicks + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let string = `<div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                        </div>
                        <button id="addParam" class="btn btn-primary deleteParam">-</button>
                 </div>`;
    //Convert the element string to Dom node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Add an event listener to remove the parameter on clicking '-' button 
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        // TODO: add a confirmation box to confirm parameter deletion 
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    }
    addedParamCount ++;
})


//if the user clicks on submit button 
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    // Show please wait in the response box to request patience from the users
    //  document.getElementById('responseJsonText').value = "Please wait..... fetching responce...."
     document.getElementById('responsePrism').innerHTML = "Please wait..... fetching responce...."

    // fetch all the values user has entered 
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    

    // if the user has used params option instead of JSON, collect all the parameters in an object
  if(contentType == 'params'){
  
    data = {};
    for(i=0;i<addedParamCount+1; i++){
        if(document.getElementById('parameterKey' +(i+1)) != undefined){
        let key = document.getElementById('parameterKey' +(i+1)).value;
        let value = document.getElementById('parameterValue' +(i+1)).value;
    }
    data = JSON.stringify(data);
    }
  }  
  else{
      data =  document.getElementById('requestJsonText').value;
  }
  // log all the values in the console for debugging
  console.log("url is ", url);
  console.log("rerequestType is ",requestType);
  console.log("contentType is ", contentType);
  console.log("data is ", data);

  //if the request type is get , invoke fetch API to create a post request
  if(requestType == 'GET'){
      
      fetch(url,{
          method :'GET',
        })
        .then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;   //url - randomuser.me/api/
            document.getElementById('responsePrism').innerHTML = text;
        });
    }//if the request type is post 
    else{
        fetch(url,{
            method : 'POST',
            body : data,
            headers : {
                "Contant-type": "application/json; charset=UTF-8"
            }
        })
        .then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
        });
    }
})