const firstName = (firstName) => {
  console.log('inside firstname validator');
  if (!firstName || firstName.trim().length < 3) {
    return {
      status: 'error',
      errorMessage: 'Firstname should be more than 3 characters',
    };
  }
};

const lastName = (lastName) => {
  console.log('inside lastname validator');
  if (!lastName || lastName.trim().length < 1) {
    return {
      status: 'error',
      errorMessage: 'Lastname should be atleast 1 characters',
    };
  }
};

const email = (email) => {
  console.log('inside email validator', email);
  if (!email || !email.includes('@')) {
    return {
      status: 'error',
      errorMessage: 'Please enter proper email (Ex. john@gmail.com)',
    };
  }
};

// Password length and truthy validation
const password = (password) => {
  console.log('inside password validator');
  if (!password || password.trim().length < 5) {
    return {
      status: 'error',
      errorMessage: 'Password length should be more than 5 characters',
    };
  }
};

// Passwords match validation
const cPassword = (password, cPassword) => {
  console.log('inside passwords matching validator');
  if (password !== cPassword) {
    return { status: 'error', errorMessage: "Entered passwords don't match" };
  }
};

const validate = { email, password, firstName, lastName, cPassword };

export default validate;
