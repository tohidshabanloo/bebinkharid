import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getError } from "../utils/error";
import { useRouter } from "next/router";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={"ورود"}>
      <form
        className="mx-auto max-w-screen-sm pr-15 border p-10 rounded-2xl "
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl text-gray-900 dark:text-gray-200">
          فرم ورود
        </h1>
        <div className="mb-4 text-gray-900 dark:text-gray-200">
          <lable htmlFor="email"> ایمیل</lable>
          <input
            dir="ltr"
            type="email"
            {...register("email", {
              required: "لطفا ایمیل خود را وارد کنید",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "لطفا یک ایمیل صحیح وارد کنید",
              },
            })}
            className="w-full mt-2 "
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500 pt-2">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 text-gray-900 dark:text-gray-200">
          <lable htmlFor="password"> رمز ورود</lable>
          <input
            dir="ltr"
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
        <div className="mb-4 mt-20 text-gray-900 dark:text-gray-200">
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
