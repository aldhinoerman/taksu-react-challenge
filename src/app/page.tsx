"use client";

import { Button } from "@/components";
import { setUser } from "@/store";
import { ILoginInput } from "@/utils";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters"),
});

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (values: ILoginInput) => {
    dispatch(setUser(values.username));
    router.push("/todos");
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center px-8">
        <Formik
          initialValues={{ username: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <Field
                  name="username"
                  placeholder="Enter your name"
                  className={`input input-bordered w-full !outline-none ${
                    errors.username && touched.username ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </label>

              <Button
                variant="success"
                icon={<ArrowRightIcon className="size-4 my-auto" />}
                iconPosition="right"
                type="submit"
                size="large"
                className="mt-4"
              >
                Next
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
