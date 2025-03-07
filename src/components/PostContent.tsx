import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Skeleton } from "./ui/skeleton";

export function PostContent({
  id,
  setOpen,
  open,
}: {
  id: number | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      console.log("Loading..", id);
      return await axios
        .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => {
          return res.data;
        });
    },
    enabled: !!id && open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          {isLoading || !data ? (
            <>
              <DialogTitle className="hidden" />
              <Skeleton className="w-full h-5 bg-gray-200 rounded " />
            </>
          ) : (
            <DialogTitle className="text-primary">{data.title}</DialogTitle>
          )}
          {isLoading || !data ? (
            <>
              <DialogDescription className="hidden"></DialogDescription>
              <Skeleton className="w-full h-10 bg-gray-200 rounded" />
            </>
          ) : (
            <DialogDescription>{data.body}</DialogDescription>
          )}
        </DialogHeader>
        {isLoading || !data ? (
          <Skeleton className="h-[40vh] max-h-[200px] mx-auto border rounded-2xl w-full bg-gray-200" />
        ) : (
          <img
            src="/vite.svg"
            alt=""
            className="h-[40vh] max-h-[200px] mx-auto border rounded-2xl w-full object-contain shadow-2xl"
          />
        )}
        {isLoading || !data ? (
          <Skeleton className="w-full h-10 bg-gray-200 rounded" />
        ) : (
          <p className="py-2 text-right">
            <span className="italic font-semibold text-primary">
              Post id :{" "}
            </span>
            {data.id}
          </p>
        )}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
