//from a medium article on making bootstrap dropdowns more accessible 
$(document).on('shown.bs.dropdown', function (event) {
  var dropdown = $(event.target);

  dropdown.find('.dropdown-menu').attr('aria-expanded', true);

  //slight change here from 10 mili sec to 100 mili sec since setTimeout is 
  //NEVER a good option but since this project is not built upon a reactive framework like vue/react
  //we can assume that 100 mili secs is enough for the dropdown to show up in the DOM
  
setTimeout(function () {
    dropdown.find('.dropdown-menu li:first-child a').focus();
    }, 100);
});

$(document).on('hidden.bs.dropdown', function (event) {
  var dropdown = $(event.target);

  dropdown.find('.dropdown-menu').attr('aria-expanded', false);

  // Set focus back to dropdown toggle
  dropdown.find('.dropdown-toggle').focus();
});

//for name input field only acceps letters
function alphaNumeric(event) {
  let keyCode = event.keyCode;

  if((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)){
    return true;
  }else{
    return false;
  }
}

function goToSuccessPage(event) {
  let alertNotifications = "";
  //clear all warnings
  document.getElementById('reason-for-ticket-input').classList.remove('invalid-input-border');
  document.getElementById('reason-for-ticket-input-warning').innerHTML = "*";
  document.getElementById('first-name-input').classList.remove('invalid-input-border');
  document.getElementById('first-name-input-warning').innerHTML = "*";
  document.getElementById('last-name-input').classList.remove('invalid-input-border');
  document.getElementById('last-name-input-warning').innerHTML = "*";
  document.getElementById('start-date-input').classList.remove('invalid-input-border');
  document.getElementById('start-date-input-warning').innerHTML = "*";
  document.getElementById('end-date-input').classList.remove('invalid-input-border');
  document.getElementById('end-date-input-warning').innerHTML = "*";

  //reason for ticket
  if(document.getElementById('reason-for-ticket-input').value == ""){
    alertNotifications += "Please select reason for ticket submission";
    document.getElementById("reason-for-ticket-input").classList.add('invalid-input-border');
    document.getElementById('reason-for-ticket-input-warning').innerHTML = "* <i>Reason cannot be blank</i>";
  }

  //check names
  let firstNameStr = document.getElementById('first-name-input').value;
  let lastNameStr = document.getElementById('last-name-input').value;
  
  if(!firstNameStr || firstNameStr.split(' ').join('').length == 0){
    alertNotifications += "First name cannot be blank";
    document.getElementById("first-name-input").classList.add('invalid-input-border');
    document.getElementById('first-name-input-warning').innerHTML = "* <i>First name cannot be blank</i>";
  }else if(/^\d+$/.test(firstNameStr)){
    alertNotifications += "First name cannot be all numbers";
    document.getElementById("first-name-input").classList.add('invalid-input-border');
    document.getElementById('first-name-input-warning').innerHTML = "* <i>First name cannot be all numbers</i>";
  }else if(/\d/.test(firstNameStr)){
    //maybe this should not be a criteria since Elons daughter is named R2D2 or something
    alertNotifications += "First name cannot contain numbers";
    document.getElementById("first-name-input").classList.add('invalid-input-border');
    document.getElementById('first-name-input-warning').innerHTML = "* <i>First name cannot contain numbers</i>";
  }else if(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(firstNameStr)){
    alertNotifications += "First name cannot contain special characters";
    document.getElementById("first-name-input").classList.add('invalid-input-border');
    document.getElementById('first-name-input-warning').innerHTML = "* <i>First name cannot contain special characters</i>";
  }
  
  if(!lastNameStr || lastNameStr.split(' ').join('').length == 0){
    alertNotifications += "Last name cannot be blank";
    document.getElementById("last-name-input").classList.add('invalid-input-border');
    document.getElementById('last-name-input-warning').innerHTML = "* <i>Last name cannot be blank</i>";
  }else if(/^\d+$/.test(lastNameStr)){
    alertNotifications += "Last name cannot be all numbers";
    document.getElementById("last-name-input").classList.add('invalid-input-border');
    document.getElementById('last-name-input-warning').innerHTML = "* <i>Last name cannot be all numbers</i>";
  }else if(/\d/.test(lastNameStr)){
    //maybe this should not be a criteria since Elons daughter is named R2D2 or something
    alertNotifications += "Last name cannot contain numbers";
    document.getElementById("last-name-input").classList.add('invalid-input-border');
    document.getElementById('last-name-input-warning').innerHTML = "* <i>Last name cannot contain numbers</i>";
  }else if(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(lastNameStr)){
    alertNotifications += "Last name cannot contain special characters";
    document.getElementById("last-name-input").classList.add('invalid-input-border');
    document.getElementById('last-name-input-warning').innerHTML = "* <i>Last name cannot contain special characters</i>";
  }
  
  //check dates
  let startDate = document.getElementById('start-date-input').value;
  let endDate = document.getElementById('end-date-input').value;

  //using strict mode in moment to validate 
  if(!moment(startDate, 'MM/DD/YYYY', true).isValid()){
    alertNotifications += "Start date needs to be in format DD/MM/YYYY";
    document.getElementById("start-date-input").classList.add('invalid-input-border');
    document.getElementById('start-date-input-warning').innerHTML = "* <i>Start date needs to be in format DD/MM/YYYY</i>";
  }
  if(!moment(endDate, 'MM/DD/YYYY', true).isValid()){
    alertNotifications += "End date needs to be in format DD/MM/YYYY";
    document.getElementById("end-date-input").classList.add('invalid-input-border');
    document.getElementById('end-date-input-warning').innerHTML = "* <i>End date needs to be in format DD/MM/YYYY</i>";
  }
  //comparing will give warning but its fine since start and end date are both validated
  if (moment(startDate) > moment(endDate) && moment(startDate, 'MM/DD/YYYY', true).isValid() && moment(startDate, 'MM/DD/YYYY', true).isValid()) {
    alertNotifications += "End date is before start date";
    document.getElementById("start-date-input").classList.add('invalid-input-border');
    document.getElementById('start-date-input-warning').innerHTML = "* <i>End date before start date</i>";
    document.getElementById("end-date-input").classList.add('invalid-input-border');
    document.getElementById('end-date-input-warning').innerHTML = "* <i>End date before start date</i>";
  }

  //read out the validation errors for the visually impaired
  screenReaderRead(alertNotifications);

  if(alertNotifications.length > 0){
    event.preventDefault();
  }else if(alertNotifications.length == 0){
    event.preventDefault();
    window.location.href = '/submission-success';
  }
}

//this solution can be improved without settimeouts 
function screenReaderRead(text) {
  let el = document.createElement("div");
  let id = "randomId" + Date.now();
  el.setAttribute("id", id);
  el.setAttribute("aria-live", "assertive");
  el.classList.add("sr-only");
  document.body.appendChild(el);

  window.setTimeout(function () {
    document.getElementById(id).innerHTML = text;
  }, 300);

  window.setTimeout(function () {
      document.body.removeChild(document.getElementById(id));
  }, 3000);
}

const form = document.getElementById('ticket-submission-form');
if(form){
    form.addEventListener('submit', goToSuccessPage);
}

//since we're not actually doing a POST request
if(window.location.pathname == '/submission-success'){
    setTimeout(function () {
        window.location.href = '/';
    }, 12000);
}
