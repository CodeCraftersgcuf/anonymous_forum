import React, { useEffect } from "react";

import { usePostBoardMutation } from "../../services/api/BoardApi";
import { ErrorMessage, Formik } from "formik";
import { toast } from "react-toastify";

const CreateBoardModal = ({ closeModal }) => {
  const [postBoard, { isLoading, isError, isSuccess }] = usePostBoardMutation();

  const initialValues = {
    name: "",
    description: "",
    tags: "",
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success("Board Created Successfully");
    }

    if (isError && !isLoading) {
      toast.error("Failed to create Board");
    }
  }, [isError, isLoading, isSuccess]);

  const postBoardHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        tags: values.tags.split(","),
      };
      resetForm();
      await postBoard(payload).unwrap();
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      resetForm();
      closeModal();
    }
  };

  return (
    <>
      <div className="md:w-[40vw] w-[80vw] shadow-lg p-3 rounded-xl absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#fff] dark:bg-[#1E283A] dark:text-gray-400">
        <div
          className="close_btn ml-auto w-min mr-2  mt-2 p-1 text-2xl text-red-400 hover:text-red-900 cursor-pointer"
          onClick={() => closeModal(false)}
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Board Name is required";
            } else if (!values.description) {
              errors.description = "Short Board description is required";
            } else if (!values.tags) {
              errors.tags = "At least one tag is required";
            }

            return errors;
          }}
          onSubmit={postBoardHandler}
        >
          {({
            isSubmitting,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="board_name flex flex-col mb-6">
                <label
                  htmlFor="name"
                  className="name_label w-full block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Board Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Enter the board Name"
                  className="text-sm shadow-sm py-2 px-3 text-gray-900 rounded-md border bg-gray-50 outline-none  focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
                />
                <ErrorMessage name="name">
                  {(msg) => (
                    <p className="text-sm text-red-400 mt-1">{`*${msg}`}</p>
                  )}
                </ErrorMessage>
              </div>
              <div className="board_description flex flex-col mb-6">
                <label
                  htmlFor="description"
                  className="description_label w-full block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Enter the board description"
                  className="text-sm shadow-sm py-2 px-3 text-gray-900 rounded-md border bg-gray-50 outline-none  focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
                />
                <ErrorMessage name="description">
                  {(msg) => (
                    <p className="text-sm text-red-400 mt-1">{`*${msg}`}</p>
                  )}
                </ErrorMessage>
              </div>
              <div className="board_tags flex flex-col mb-6">
                <label
                  htmlFor="tags"
                  className="tags_label w-full block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Category
                </label>
                <input
                  id="tags"
                  name="tags"
                  required
                  value={values.tags}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter category of the Board"
                  className="text-sm shadow-sm py-2 px-3 text-gray-900 rounded-md border bg-gray-50 outline-none  focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
                />
                <ErrorMessage name="tags">
                  {(msg) => (
                    <p className="text-sm text-red-400 mt-1">{`*${msg}`}</p>
                  )}
                </ErrorMessage>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                class="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Publish board
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateBoardModal;
