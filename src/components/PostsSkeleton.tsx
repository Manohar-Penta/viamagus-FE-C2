import { Skeleton } from "./ui/skeleton";

const data = [[], [], [], [], [], [], []];

function PostsSkeleton() {
  return (
    <div className="min-h-screen flex flex-col gap-3 lg:gap-4 w-full lg:w-full mt-2">
      {data?.map((_, index) => {
        return (
          <div
            className="mx-auto w-[90vw] max-w-[1024px] rounded border bg-white"
            key={index + "postsSkeleton"}
          >
            <div className="p-2 flex">
              <Skeleton className="h-[50px] md:h-[75px] bg-gray-200 rounded w-[50px] md:w-[75px] my-auto" />
              <div className="p-2 flex flex-col gap-2 justify-between w-[75vw] max-w-[900px]">
                <Skeleton className=" h-5 bg-gray-200"></Skeleton>
                <Skeleton className="text-nowrap h-5 bg-gray-200"></Skeleton>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostsSkeleton;
