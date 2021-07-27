const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("Password2");

let errors = {
  username: false,
  email: false,
  password: false,
  password2: false,
};
//SHOW INPUT ERROR MESSSAGE

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
//SHOW SUCCESS OUTLINE
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
//CHECK REQUIRED FIELDS
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      errors[input.id] = true;
    } else {
      showSuccess(input);
      errors[input.id] = false;
    }
  });
}
//CHECK EMAIL IS VALID
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email not valid");
  }
}

//CHECK PASSWORD MATCH
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "passwords do not match");
  }
}

//CHECK LENGTH
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} should be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//GET FIELD NAME
function getFieldName(input) {
  return input.id.toUpperCase().charAt(0) + input.id.slice(1);
}
//EVENT LISTENERS
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  if (!errors.username) {
    checkLength(username, 3, 15);
  }
  if (!errors.password) {
    checkLength(password, 6, 25);
  }
  if (!errors.email) {
    checkEmail(email);
  }
  if (!errors.password && !errors.password2) {
    checkPasswordsMatch(password, password2);
  }
});
