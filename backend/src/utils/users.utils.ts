import jwt from 'jsonwebtoken'

// secret
const secret = process.env.SECRET as string
// max age
const MAX_AGE = 60 * 60 * 24
// error handler
const errorHandler = (err: any) => {
  const errors = { username: "", email: "", password: "" };

  // user validation failed
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((errorItem: any) => {
      if (errorItem?.properties?.path === "username") {
        errors.username = errorItem?.properties?.message;
      }
      if (errorItem?.properties?.path === "email") {
        errors.email = errorItem?.properties?.message;
      }

      if (errorItem?.properties?.path === "password") {
        errors.password = errorItem?.properties?.message;
      }
    });
  }

  // duplicated key
  if (err.code === 11000) {
    if (err.message.includes("username")) {
      errors.username = "Username already exist";
    }
    if (err.message.includes("email")) {
      errors.email = "Email address already exist";
    }
  }

  return errors;
};

// generate toke
const generateToken = (_id: any) => {
    return jwt.sign({_id},secret,{expiresIn: MAX_AGE})
}

// exports
// users
export { MAX_AGE,errorHandler, generateToken };
