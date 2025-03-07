import { Skeleton } from "./ui/skeleton";

const data = [[], [], [], [], [], [], []];

function PostsSkeleton() {
  return (
    <div className="min-h-screen flex flex-col gap-3 lg:gap-4 w-full lg:w-full mt-2">
      {data?.map((_, index) => {
        return (
          <div
            className="mx-auto rounded-lg border bg-white"
            key={index + "postsSkeleton"}
          >
            <div className="p-2 lg:p-4 flex">
              <Skeleton className="h-[50px] md:h-[75px] bg-gray-100 rounded w-[50px] md:w-[75px] my-auto" />
              <div className="p-2 flex flex-col gap-2 justify-between">
                <Skeleton className="w-[75vw] max-w-[700px] h-5 bg-gray-100"></Skeleton>
                <Skeleton className="w-[75vw] max-w-[700px] text-nowrap h-5 bg-gray-200"></Skeleton>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostsSkeleton;
