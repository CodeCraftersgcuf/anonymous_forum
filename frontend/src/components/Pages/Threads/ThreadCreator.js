import ImageCompress from "quill-image-compress";

import ReactQuill, { Quill } from "react-quill";
import { ErrorMessage, Field, Formik } from "formik";
import sanitizeHtml from "sanitize-html";
import "react-quill/dist/quill.snow.css";
import { usePostThreadMutation } from "../../../services/api/ThreadApi";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBoard } from "../../features/Boards/BoardSlice";
import { boardApi } from "../../../services/api/BoardApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
const ThreadCreator = ({ closeModal }) => {
  const dispatch = useDispatch();
  Quill.register("modules/imageCompress", ImageCompress);

  const board = useSelector(getCurrentBoard);
  const boardName = board?.name;

  const [postThread, { isError, isLoading, isSuccess }] =
    usePostThreadMutation();

  const [trigger] = boardApi.endpoints.getBoard.useLazyQuery();

  useEffect(() => {
    if (isSuccess && !isLoading && !isError) {
      trigger(board?.boardNumber);
    }
  }, [isSuccess, isLoading, dispatch, board?.boardNumber, isError, trigger]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success("Thread created Successfully");
    }

    if (isError && !isLoading) {
      toast.success("Failed to create thread");
    }
  }, [isError, isLoading, isSuccess]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6,false] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "code-block",
  
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["video"],
    ],
    imageCompress: {
      quality: 0.7, // default
      maxWidth: 1000, // default
      maxHeight: 1000, // default
      imageType: "image/jpeg", // default
      debug: true, // default
      suppressErrorLogging: false, // default
      insertIntoEditor: undefined, // default
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "image",
    "video",
  ];

const formHandler = async (values, { setSubmitting, resetForm }) => {
  const { user, subject, content, tags } = values;

  // Extract video URL from content
  const parser = new DOMParser();
  const quillContent = parser.parseFromString(content, "text/html");
  const videoElement = quillContent.querySelector("iframe");

  let videoUrl = videoElement ? videoElement.src : null;


  const payload = {
    user,
    subject,
    content: content,
    boardName: boardName,
    tags: tags.split(","),
    videoUrl: videoUrl,
  };


  try {
    resetForm();
    await postThread(payload);
    setSubmitting(false);
    closeModal();
  } catch (error) {
    console.log("An error occurred during creating thread: ", error);
  }
};




  return (
    <>
      <div className="dark:bg-[#1E283A] dark:text-gray-400 thread_modal shadow-lg  md:p-3  overflow-y-auto fixed w-[90%] md:w-[80%] bg-white  h-[85vh] rounded-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
        {/* <button
          onClick={closeModal}
          className="text-white relative flex justify-center float-right text-[2rem] w-6 h-6 bg-[#317FB6] rounded-full mt-2 mr-2"
        >
          <div className="w-1  h-full bg-white rotate-45 absolute"></div>
          <div className="w-1  h-full bg-white absolute -rotate-45"></div>
        </button> */}
        <div
          className="close_btn ml-auto w-min mr-2 mt-1 md:mt-2 md:p-1 text-2xl text-red-400 hover:text-red-900 cursor-pointer"
          onClick={closeModal}
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
        <Formik
          initialValues={{
            subject: "",
            content: "",
            user: "",
            tags: "",
          }}
          onSubmit={formHandler}
          validate={(values) => {
            const errors = {};

            let cleanHtml = sanitizeHtml(values.content);
            const tempElement = document.createElement("div");
            tempElement.innerHTML = cleanHtml;
            let plainText = tempElement.textContent || tempElement.innerText;
            tempElement.remove();

            if (!values.subject) {
              errors.subject = "Thread name is required";
            } else if (!values.tags) {
              errors.tags = "At least one tag is required";
            } else if (plainText.length <= 0)
              errors.content = "Content can't be empty";

            return errors;
          }}
        >
          {({
            handleSubmit,
            values,
            handleBlur,
            handleChange,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className=" md:py-5 md:px-10 px-3">
                    <div className="title mb-5 ">
                      <label
                        htmlFor="subject"
                        className="subject_label w-full block mb-1 text-lg font-medium text-[#317FB6] "
                      >
                        Thread Subject
                      </label>
                      <p className="text-[0.8rem] text-gray-600 mt-1 dark:text-gray-400">
                        Enter the subject, this will be shown as heading of your
                        thread
                      </p>
                      <input
                        id="subject"
                        name="subject"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.subject}
                        placeholder="Enter the Thread Subject"
                        className="w-full text-sm shadow-sm py-2 px-3 text-gray-900 rounded-md border bg-gray-50 outline-none  focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
                      />
                      <ErrorMessage name="subject">
                        {(msg) => (
                          <p className="text-sm text-red-400 mt-1">{`*${msg}`}</p>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="title mb-5 ">
                      <label
                        htmlFor="user"
                        className="user_label w-full block mb-1 text-lg font-medium text-[#317FB6] "
                      >
                        User
                      </label>
                      <p className="text-[0.8rem] text-gray-600 mt-1 dark:text-gray-400">
                        Enter the dummy username (optional)
                      </p>
                      <input
                        id="user"
                        name="user"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user}
                        placeholder="Enter the Thread user"
                        className="w-full text-sm shadow-sm py-2 px-3 text-gray-900 rounded-md border bg-gray-50 outline-none  focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
                      />
                    </div>
                    <div className="title mb-5 ">
                      <label
                        htmlFor="tags"
                        className="tags_label w-full block mb-1 text-lg font-medium text-[#317FB6]  "
                      >
                        Thread Tags
                      </label>
                      <p className="text-[0.8rem] text-gray-600 mt-1 dark:text-gray-400">
                        Enter comma separated tags
                      </p>
                      <input
                        id="tags"
                        name="tags"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tags}
                        placeholder="Enter the Thread tags (at least 1)"
                        className="w-full text-sm shadow-sm py-2 px-3 text-gray-900 rounded-md border bg-gray-50 outline-none  focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
                      />
                      <ErrorMessage name="tags">
                        {(msg) => (
                          <p className="text-sm text-red-400 mt-1">{`*${msg}`}</p>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="content"
                        className="content_label w-full block mb-1 text-lg font-medium text-[#317FB6] "
                      >
                        Thread Content
                      </label>
                      <p className="text-[0.8rem] text-gray-600 mt-1 dark:text-gray-400">
                        Include all the content you wanna share
                      </p>
                      <div>
                        <Field name="content">
                          {({ field }) => (
                            <ReactQuill
                              onChange={field.onChange(field.name)}
                              onBlur={() => handleBlur(field.name)}
                              placeholder="Write the Thread content here..."
                              theme="snow"
                              className="dark:bg-[#F9FAFB]"
                              value={field.value}
                              modules={modules}
                              formats={formats}
                            />
                          )}
                        </Field>

                        <ErrorMessage name="content">
                          {(msg) => (
                            <p className="text-sm text-red-400 mt-1">{`*${msg}`}</p>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="mt-10">
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          class="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Create Thread
                        </button>
                        <p className="text-sm mt-2 text-red-400">
                          You will be posting anonymously, and post according to
                          the board.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ThreadCreator;
