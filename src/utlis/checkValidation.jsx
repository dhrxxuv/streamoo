const checkValidation = ({ email, password, mobile ,name}) => {
    let errors = {};
  
   
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }
  
    const nameRegex = /^[A-Za-z][A-Za-z ]{1,}$/;
    if (!nameRegex.test(name)) {
        errors.name = "Invalid name format";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.password = "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character";
    }
  
 
    const mobileRegex = /^[0-9]{10}$/;
    if (mobile !== undefined && !mobileRegex.test(mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }
  
    return errors; 
  };
  
  export default checkValidation;
  