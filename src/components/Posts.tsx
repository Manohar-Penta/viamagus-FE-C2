import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { CgArrowUp, CgSpinner } from "react-icons/cg";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import PostsSkeleton from "./PostsSkeleton";
import PostComponent from "./PostComponent";
import { PostContent } from "./PostContent";

async function getPosts(page: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${
      page * 10
    }&_limit=${10}`
  );

  return { page, data: res.data };
}

function Posts() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const value = lastPage.page + 1 < 10 ? lastPage.page + 1 : undefined;
      return value;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  if (status === "pending")
    return (
      <div>
        <PostsSkeleton />
      </div>
    );

  if (status === "error")
    return <div className="text-red-300">{error.message}</div>;

  return (
    <>
      <div className="min-h-screen flex flex-col gap-3 lg:gap-4 w-full lg:w-full mt-2 px-2 lg:px-4">
        {data?.pages.map((page) => {
          return page.data.map(
            (post: { id: number; title: string; body: string }) => {
              return (
                <PostComponent
                  post={post}
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(post.id);
                  }}
                />
              );
            }
          );
        })}
      </div>
      <PostContent id={selectedItem} open={open} setOpen={setOpen} />
      {hasNextPage && (
        <div ref={ref} className="">
          <CgSpinner
            className="animate-spin mx-auto p-2 lg:p-4 size-15 lg:size-18"
            color="#845ec2"
          />
        </div>
      )}
      {!hasNextPage && (
        <>
          <hr className="max-w-[1100px] mx-auto mt-3" />
          <div className="flex px-2 lg:px-4">
            <p className="text-center p-2 lg:p-4 text-lg lg:text-2xl italic grow">
              You Reached the End!!
            </p>
          </div>
        </>
      )}
      <CgArrowUp
        color="white"
        className="fixed bottom-2 right-2 size-12 lg:size-13 border-4 border-gray-100 rounded-full px-2 bg-[#845ec2] hover:shadow-2xl hover:scale-105"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      />
    </>
  );
}

export default Posts;
