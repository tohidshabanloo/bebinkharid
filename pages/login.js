import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = () => {};
  return (
    <Layout title={"ورود"}>
      <form
        className="mx-auto max-w-screen-md pr-20 border p-10 "
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">فرم ورود</h1>
        <div className="mb-4">
          <lable htmlFor="email"> ایمیل</lable>
          <input
            type="email"
            {...register("email", {
              required: "لطفا ایمیل خود را وارد کنید",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "لطفا یک ایمیل صحیح وارد کنید",
              },
            })}
            className="w-full mt-2"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500 pt-2">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <lable htmlFor="password"> پسورد</lable>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
            className="w-full mt-2"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button text-black"> ورود</button>
        </div>
        <div className="mb-4">
          {" "}
          آیا ثبت نام نکرده اید؟ &nbsp;
          <Link href="register">
            <a className="bg-green-400 p-2 rounded text-black">ثبت نام</a>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
