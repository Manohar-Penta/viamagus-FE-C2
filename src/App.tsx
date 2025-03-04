import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "./utils/post-type";
import { Link } from "react-router";

function App() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  async function getPosts(page: number = 0) {
    setLoading(true);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${
        page * 10
      }&_limit=${10}`
    );
    setPage(page);
    setData(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <h1 className="p-4 font-bold text-2xl text-center w-full border-b-gray-400 shadow-md sticky top-0 bg-white">
          Posts
        </h1>
        <div className="p-2 grow">
          {data.map((post) => {
            return (
              <Link to={`/post/${post.id}`} key={post.id}>
                <div className="p-2 flex flex-col justify-center items-center border m-2 max-h-[20vh] max-w-[1024px] mx-auto hover:p-4 hover:shadow-2xl transition-all">
                  <h1 className="text-md font-bold text-nowrap overflow-ellipsis overflow-hidden w-full">
                    {post.title}
                  </h1>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-between p-4 sticky bottom-0 bg-white border-y h-fit">
          <button
            className={
              "border p-2 hover:cursor-pointer rounded shadow" +
              (page == 0
                ? "text-gray-50 bg-gray-200 border-none shadow-none"
                : "")
            }
            disabled={page == 0}
            onClick={() => getPosts(page - 1)}
          >
            Previous
          </button>
          {loading && <p className="p-2 px-4 border rounded">Loading...</p>}
          {!loading && (
            <Link to={"/create"} className="border p-2 px-4 rounded">
              Create
            </Link>
          )}
          <button
            className={
              "border p-2 px-4 hover:cursor-pointer rounded shadow" +
              (page == 9
                ? "text-gray-50 bg-gray-200 border-none shadow-none"
                : "")
            }
            disabled={page == 9}
            onClick={() => getPosts(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
