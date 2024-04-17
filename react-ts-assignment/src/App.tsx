import React from "react";
import SignUpForm from "./components/SignUpForm";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
