import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Post as Data } from "../utils/post-type";
import axios from "axios";

function Post() {
  const [data, setData] = useState<Data | undefined>();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center gap-10 items-center">
      {!data && <p className="font-xl text-xl">Loading...</p>}
      {data && (
        <div className="border p-4 max-w-[600px] flex flex-col gap-2 shadow-xl w-[90%]">
          <p>
            <span className="font-bold">Title : </span>
            {data?.title}
          </p>
          <p>
            <span className="font-bold">Id : </span>
            {data?.id}
          </p>
          <p>
            <span className="font-bold">Description : </span>
            {data?.body}
          </p>
          <p>
            <span className="font-bold">User Id : </span>
            {data?.userId}
          </p>
        </div>
      )}
      <Link to="/" className="border rounded p-2 shadow-lg">
        Home
      </Link>
    </div>
  );
}

export default Post;
