import { useState } from "react";

// hooks
import { useAppSelector, useAppDispatch } from "../hooks";
// icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiUser6Line } from "react-icons/ri";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
// utils
// schema
import { FormFieldSchema } from "../utils/schema";
// slices
// users
import {
  formIdSelector,
  setFormId,
  resetErrors,
  errorsSelector,
  setErrors,
} from "../features/users/usersSlice";
export default function Authentication() {
  // states
  // local states
  // focus
  const [focus, setFocus] = useState("");
  // username
  const [username, setUsername] = useState("");
  // email
  const [email, setEmail] = useState("");
  // password
  const [password, setPassword] = useState("");
  // is password hide
  const [isPasswordHide, setIsPasswordHide] = useState(true);

  //   slices state
  // users
  const formId = useAppSelector(formIdSelector);
  const errors = useAppSelector(errorsSelector);

  // hooks
  const dispatch = useAppDispatch();

  //   handlers
  // form id toggler
  const formIdToggler = (id: "login" | "signup" | "forget") => {
    setUsername("");
    setEmail("");
    setPassword("");
    setIsPasswordHide(true);
    dispatch(resetErrors());
    dispatch(setFormId(id));
  };
  // form submit handler
  const formSubmitHandler = () => {
    const validatedFields = FormFieldSchema.safeParse({
      username,
      email,
      password,
    });
    if (!validatedFields.success) {
      dispatch(setErrors(validatedFields.error.flatten().fieldErrors));
      if (
        formId === "login" &&
        !validatedFields.error.flatten().fieldErrors?.username &&
        !validatedFields.error.flatten().fieldErrors?.password
      ) {
        console.log("You can Login", { username, password });
      }
      if (
        formId === "forget" &&
        !validatedFields.error.flatten().fieldErrors?.email
      ) {
        console.log("You can Reset", { email });
      }
    } else {
      if (formId === "signup") {
        console.log("You can signup", { username, email, password });
      }
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* form */}
      <div className="w-72 sm:w-80 lg:w-96 shrink-0 bg-white shadow-2xl p-5">
        {/* header */}
        <header className="flex items-center justify-between">
          <h3 className="text-neutral-600">
            {formId === "login"
              ? "Login"
              : formId === "signup"
              ? "Create an account"
              : formId === "forget"
              ? "Reset password"
              : ""}
          </h3>
          <div className="flex items-center gap-0.5 cursor-pointer text-neutral-400 transition-colors ease-in-out duration-150 hover:text-green-500 text-sm">
            <span>Language(US)</span>
            <MdKeyboardArrowDown className="text-xl" />
          </div>
        </header>
        {/* inputs */}
        <div className="mt-5">
          {/* username */}
          {formId !== "forget" && (
            <div className="mb-3.5">
              <div
                className={`flex items-center gap-x-1.5 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-neutral-300 before:absolute before:left-0 before:bottom-0  before:h-[1px] before:bg-green-500 before:z-10 pb-0.5 before:transition-all before:ease-in-out before:duration-500 ${
                  errors.username?.length
                    ? "before:w-full before:bg-red-500"
                    : focus === "username" || username
                    ? "before:w-full before:bg-green-500"
                    : "before:w-0"
                }`}
              >
                {/* icon */}
                <RiUser6Line
                  className={`transition-colors ease-in-out duration-200 ${
                    errors.username?.length
                      ? "text-red-500"
                      : focus === "username" || username
                      ? "text-green-500"
                      : "text-neutral-500"
                  }`}
                />
                {/* input */}
                <div className="flex-1">
                  <input
                    className="w-full focus:ring-0 focus:outline-none border-none bg-transparent text-sm"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      dispatch(
                        setErrors({
                          username: undefined,
                          email: errors.email,
                          password: errors.password,
                        })
                      );
                    }}
                    onFocus={() => {
                      setFocus("username");
                    }}
                    onBlur={() => {
                      setFocus("");
                    }}
                  />
                </div>
              </div>
              {/* error */}
              {errors.username?.length && (
                <div className="text-sm text-red-500">
                  {errors.username?.map((err) => (
                    <p key={err}>{err}</p>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* email */}
          {formId !== "login" && (
            <div className="mb-3.5">
              <div
                className={`flex items-center gap-x-1.5 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-neutral-300 before:absolute before:left-0 before:bottom-0  before:h-[1px] before:bg-green-500 before:z-10 pb-0.5 before:transition-all before:ease-in-out before:duration-500 ${
                  errors.email?.length
                    ? "before:w-full before:bg-red-500"
                    : focus === "email" || email
                    ? "before:w-full before:bg-green-500"
                    : "before:w-0"
                }`}
              >
                {/* icon */}
                <MdOutlineMarkEmailRead
                  className={`transition-colors ease-in-out duration-200 ${
                    errors.email?.length
                      ? "text-red-500"
                      : focus === "email" || email
                      ? "text-green-500"
                      : "text-neutral-500"
                  }`}
                />
                {/* input */}
                <div className="flex-1">
                  <input
                    className="w-full focus:ring-0 focus:outline-none border-none bg-transparent text-sm"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      dispatch(
                        setErrors({
                          username: errors.username,
                          email: undefined,
                          password: errors.password,
                        })
                      );
                    }}
                    onFocus={() => {
                      setFocus("email");
                    }}
                    onBlur={() => {
                      setFocus("");
                    }}
                  />
                </div>
              </div>
              {/* error */}
              {errors.email?.length && (
                <div className="text-sm text-red-500">
                  {errors.email.map((err) => (
                    <p key={err}>{err}</p>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* password */}
          {formId !== "forget" && (
            <div className="mb-3.5">
              <div
                className={`flex items-center gap-x-1.5 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-neutral-300 before:absolute before:left-0 before:bottom-0  before:h-[1px] before:bg-green-500 before:z-10 pb-0.5 before:transition-all before:ease-in-out before:duration-500 ${
                  errors.password?.length
                    ? "before:w-full before:bg-red-500"
                    : focus === "password" || password
                    ? "before:w-full before:bg-green-500"
                    : "before:w-0"
                }`}
              >
                {/* icon */}
                <MdLockOutline
                  className={`transition-colors ease-in-out duration-200 ${
                    errors.password?.length
                      ? "text-red-500"
                      : focus === "password" || password
                      ? "text-green-500"
                      : "text-neutral-500"
                  }`}
                />
                {/* input */}
                <div className="flex-1">
                  <input
                    className="w-full focus:ring-0 focus:outline-none border-none bg-transparent text-sm"
                    type={isPasswordHide ? "password" : "text"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      dispatch(
                        setErrors({
                          username: errors.username,
                          email: errors.email,
                          password: undefined,
                        })
                      );
                    }}
                    onFocus={() => {
                      setFocus("password");
                    }}
                    onBlur={() => {
                      setFocus("");
                    }}
                  />
                </div>
                <button
                  className={`cursor-pointer transition-colors ease-in-out duration-300 text-xl ${
                    errors.password?.length
                      ? "text-red-500"
                      : focus === "password" || password
                      ? "text-green-500"
                      : "text-neutral-500"
                  }`}
                  onClick={() => {
                    setIsPasswordHide(!isPasswordHide);
                  }}
                >
                  {isPasswordHide ? <VscEyeClosed /> : <VscEye />}
                </button>
              </div>
              {/* error */}
              {errors.password?.length && (
                <div className="text-sm text-red-500">
                  {errors.password.map((err) => (
                    <p key={err}>{err}</p>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* button and link */}
          <div className="flex items-center justify-between">
            <button
              onClick={formSubmitHandler}
              className="px-3 py-1 text-sm bg-green-500 text-white cursor-pointer rounded-xs transition-colors ease-in-out duration-150 hover:bg-green-600"
            >
              {formId === "login"
                ? "Login"
                : formId === "signup"
                ? "Signup"
                : formId === "forget"
                ? "Reset"
                : ""}
            </button>
            {formId === "login" && (
              <button
                onClick={() => {
                  formIdToggler("forget");
                }}
                className="text-xs text-neutral-500 transition-colors ease-in-out duration-150 hover:text-green-500 cursor-pointer"
              >
                Forget password
              </button>
            )}
          </div>
          {/* link text */}
          <div className="mt-3 text-sm flex items-center gap-x-1.5 text-neutral-400">
            <p>
              {formId === "login"
                ? "Don't have an account?"
                : formId === "signup"
                ? "Already have an account?"
                : formId === "forget"
                ? "Do you remember your password?"
                : ""}
            </p>
            <button
              onClick={() => {
                formIdToggler(
                  formId === "login"
                    ? "signup"
                    : formId === "signup"
                    ? "login"
                    : formId === "forget"
                    ? "login"
                    : "login"
                );
              }}
              className="transition-colors ease-in-out duration-150 hover:text-green-600 cursor-pointer relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:transition-all after:ease-in-out after:duration-300 hover:after:w-full after:bg-green-500"
            >
              {formId === "login"
                ? "Signup"
                : formId === "signup"
                ? "Login"
                : formId === "forget"
                ? "Login"
                : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
