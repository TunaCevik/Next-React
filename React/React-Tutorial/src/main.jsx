import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Posts from "./routes/Post.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewPost from "./routes/NewPost.jsx";
import RootLayout from "./routes/RootLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Posts></Posts>,
        children: [{ path: "/create-post", element: <NewPost></NewPost> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
