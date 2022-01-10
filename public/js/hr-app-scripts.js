
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


function goToSuccessPage(event) {
  window.location.href = '/submission-success';
  event.preventDefault();
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
