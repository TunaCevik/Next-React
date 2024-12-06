import PostsList from "../components/PostsList";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default App;

export async function loader(params) {
  const response = await fetch("http://localhost:8080/posts");
  const resData = await response.json();
  setPosts(resData.posts);
}
