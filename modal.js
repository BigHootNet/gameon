function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close")
const submitBtn = document.querySelectorAll(".btn-submit");
const fieldTest = document.getElementById("fieldtest");
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const form = document.getElementById('main-form');
const modalBody = document.getElementById("modal-body");
const successBody = document.getElementById("success-body");



// form elements
const firsNameDiv = document.getElementById('first');
const lastNameDiv = document.getElementById('last');
const emailDiv = document.getElementById('email');
const birthDateDiv = document.getElementById('birthdate');
const quantityDiv = document.getElementById('quantity');
const TOS = document.getElementById("checkbox1");


// email regex events
function validateEmail(email) {
  return emailRegex.test(email);
}

// date regex 
function DDMMYYY_Validation(input) {
  var reg = /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;
  return !!input?.match(reg);
}


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";

  // reseters
  modalBody.style.display = "block";
  successBody.style.display = "none";
}

// data-error reseter
function dataErrorReset() {
  for (i = 0; i < formData.length; i++) {
    formData[i].setAttribute('data-error', "");
  }
}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// submit modal form
form.addEventListener('submit', function (event) {
  event.preventDefault();
  getEntries();
});

// entries checkers
function getEntries() {
  const locationDiv = document.querySelectorAll('.locCheckbox:checked');
  console.log(locationDiv);

  entries = {
    name: firsNameDiv,
    surname: lastNameDiv,
    mail: emailDiv,
    birthdate: birthDateDiv,
    tnParticipation: quantityDiv,
    checkboxes: locationDiv,
    TOS: TOS,
  }


  validator();


  // entries validator
  function validator() {

    dataErrorReset();

    if (entries.name.value.length <= 2) {
      formData[0].setAttribute('data-error', "Le prénom marche pas");
    } else if (entries.surname.value.length <= 2) {
      formData[1].setAttribute('data-error', "Le nom marche pas");
    } else if (validateEmail(entries.mail.value) == false) {
      formData[2].setAttribute('data-error', "L\'email marche pas");
    } else if (DDMMYYY_Validation(entries.birthdate.value) == false) {
      formData[3].setAttribute('data-error', "La date de naissance marche pas");
    } else if (entries.tnParticipation.checkValidity() == false) {
      formData[4].setAttribute('data-error', "La date du TN marche pas");
    } else if (entries.checkboxes.length == 0) {
      formData[5].setAttribute('data-error', "Le lieu marche pas");
    } else if (entries.TOS.checked == false) {
      formData[6].setAttribute('data-error', "Accepte les TOS stp");
    } else {
      modalBody.style.display = "none";
      successBody.style.display = "flex";
      setInterval(function () {
        form.submit();
      }, 2000)
      // location.reload();

    }
  }
}