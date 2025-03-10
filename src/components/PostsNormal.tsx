import axios from "axios";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import { useEffect, useState } from "react";
import PostsSkeleton from "./PostsSkeleton";
import PostComponent from "./PostComponent";
import { PostContent } from "./PostContent";
import { useNavigate, useSearchParams } from "react-router";

// async function getPosts(page: number) {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const res = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts?_start=${
//       page * 10
//     }&_limit=${10}`
//   );

//   return { data: res.data };
// }

function PostsNormal() {
  let [searchParams] = useSearchParams();
  let navigate = useNavigate();

  const page = Number(searchParams.get("page")) ?? 0;

  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "error" | "success">(
    "pending"
  );

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          page * 10
        }&_limit=10`
      )
      .then((res) => {
        setData(res.data);
        setStatus("success");
        setError(null);
      })
      .catch((err) => {
        setStatus("error");
        setError(err.message);
      });
  }, [status]);

  if (status === "pending")
    return (
      <div>
        <PostsSkeleton />
      </div>
    );

  if (status === "error")
    return (
      <div className="text-red-300 text-center h-screen flex justify-center items-center p-4">
        {error}
      </div>
    );

  return (
    <>
      <div className="min-h-screen flex flex-col gap-3 lg:gap-4 w-full lg:w-full mt-2 px-2 lg:px-4 pb-2 :lg:pb-4">
        {data.map((post: { id: number; title: string; body: string }) => {
          return (
            <PostComponent
              key={post.id}
              post={post}
              onClick={() => {
                setOpen(true);
                setSelectedItem(post.id);
              }}
            />
          );
        })}
      </div>
      <PostContent id={selectedItem} open={open} setOpen={setOpen} />
      <div>
        <button
          className={
            "fixed bottom-4 left-4 bg-primary text-white rounded-full p-3 hover:cursor-pointer" +
            (page === 0 ? " opacity-50 hover:cursor-not-allowed" : "")
          }
          onClick={() => {
            setError(null);
            setStatus("pending");
            setOpen(false);
            navigate(`/?page=${page - 1}`);
          }}
          disabled={page === 0}
        >
          <CgArrowLeft />
        </button>
        <button
          className={
            "fixed bottom-4 right-4 bg-primary text-white rounded-full p-3 hover:cursor-pointer" +
            (page === 9 ? " opacity-50 hover:cursor-not-allowed" : "")
          }
          onClick={() => {
            setError(null);
            setStatus("pending");
            setOpen(false);
            setData([]);
            navigate(`/?page=${page + 1}`);
          }}
          disabled={page === 9}
        >
          <CgArrowRight />
        </button>
      </div>
    </>
  );
}

export default PostsNormal;
