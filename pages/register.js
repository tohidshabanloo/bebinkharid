import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

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
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

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
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-sm border p-10 rounded-2xl"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl text-gray-900 dark:text-gray-200">
          ساخت اکانت
        </h1>
        <div className="mb-4 text-gray-900 dark:text-gray-200">
          <label htmlFor="name">نام کاربری</label>
          <input
            type="text"
            className="w-full mt-2"
            id="name"
            autoFocus
            {...register("name", {
              required: "لطفا نام خود را وارد کنید",
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4 text-gray-900 dark:text-gray-200 ">
          <label htmlFor="email">ایمیل</label>
          <input
            dir="ltr"
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full mt-2"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 text-gray-900 dark:text-gray-200">
          <label htmlFor="password">رمز ورود</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
            dir="ltr"
            className="w-full mt-2"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 text-gray-900 dark:text-gray-200">
          <label htmlFor="confirmPassword">تکرار رمز ورود</label>
          <input
            dir="ltr"
            className="w-full mt-2"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please enter confirm password",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "confirm password is more than 5 chars",
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 ">Password do not match</div>
            )}
        </div>

        <div className="mb-4  ">
          <button className="primary-button">ثبت نام</button>
        </div>
        {/* <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || "/"}`}>Register</Link>
        </div> */}
        <div className="mb-4 text-gray-900 dark:text-gray-200">
          {" "}
          آیا اکانت دارید؟ &nbsp;
          <Link href="login">
            <a className="bg-green-400 p-2 rounded text-black">ورود</a>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
