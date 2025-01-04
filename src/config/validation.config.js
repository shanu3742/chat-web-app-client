import Validator from 'validatorjs'
//validation rule and validation error message
const loginInfoRules = {
    email: 'required|email',
    password: 'required',
  };
  
const loginInfoMessages = {
    'required.email': 'Please enter your email address.',
    'email.email': 'Enter a valid email address.',
    'required.password': 'Please enter your password.',
  };

  const validate = (data, rules, messages) => {
    const validation = new Validator(data, rules, messages);
    if (validation.fails()) {
      return {
        isValid: false,
        errors: Object.values(validation.errors.all()).flat()
                                                      .map((msg, index) => `${index + 1}. ${msg}`)
                                                      .join('\n')
      };
    }
    return { isValid: true, errors: '' };
  };
  
let loginValidationConfig= {loginInfoRules,loginInfoMessages}
export {Validator,validate,loginValidationConfig}

