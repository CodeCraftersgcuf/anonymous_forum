import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import Boards from "./components/Pages/Boards/Boards";
import BoardLayout from "./components/Layout/BoardLayout";
import IndividualBoard from "./components/Pages/Boards/IndividualBoard";
import Thread from "./components/Pages/Threads/Thread";
import Threads from "./components/Pages/Threads/Threads";
import ErrorPage from "./components/Pages/ErrorPage/ErrorPage";
import HomeLayout from "./components/Layout/HomeLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomeLayout />} />
        <Route path="boards" element={<BoardLayout />}>
          <Route index element={<Boards />} />
          <Route path=":id" element={<IndividualBoard />}>
            <Route index element={<Threads />} />
            <Route path="thread/:tid" element={<Thread />} />
          </Route>
        </Route>
        <Route path="*" element={<div>Error..</div>} />
      </Route>
      <Route path="/error" element={<ErrorPage />} />
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
