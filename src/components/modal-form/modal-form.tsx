import React from "react";
import Modal from "../modal/modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTodo } from "@/store";
import DatePicker from "react-datepicker";
import { Button } from "../button";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  dueDate: Yup.date().required("Due Date is required"),
});

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        isOpen={isOpen}
        title="New Todo"
        closeText="Cancel"
        onClose={onClose}
      >
        <Formik
          initialValues={{ title: "", dueDate: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const newTodo = {
              id: uuidv4(),
              title: values.title,
              dueDate: values.dueDate,
              completed: false,
            };
            dispatch(addTodo(newTodo));
            onClose();
          }}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="space-y-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <Field
                  name="title"
                  placeholder="Please input title"
                  className={`input input-bordered w-full !outline-none ${
                    errors.title && touched.title ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Due Date</span>
                </div>
                <DatePicker
                  selected={values.dueDate as any}
                  onChange={(date) => setFieldValue("dueDate", date)}
                  showTimeSelect
                  timeFormat="HH:mm:ss"
                  timeIntervals={15}
                  dateFormat="dd MMMM YYYY HH:mm:ss"
                  className={`input input-bordered w-full !outline-none ${
                    errors.dueDate && touched.dueDate ? "input-error" : ""
                  }`}
                  popperClassName={"z-50"}
                  portalId="datepicker-portal"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </label>

              <div className="text-center">
                <Button
                  variant="info"
                  type="submit"
                  size="large"
                  className="my-4 w-[180px]"
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalForm;
