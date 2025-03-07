import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { FaAngleLeft } from "react-icons/fa";

function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState(false);
  let navigate = useNavigate();

  if (status) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <div className="h-screen flex flex-col justify-between overflow-auto gap-4">
      <div className="flex w-full border-b p-1 lg:p-3 shadow-lg">
        <div className="flex justify-start gap-4 items-center max-w-[1280px] mx-auto w-full p-2 lg:p-4">
          <FaAngleLeft
            className="size-8 lg:size-10 cursor-pointer border rounded-full bg-primary hover:bg-gray-300"
            onClick={() => navigate("/")}
            title="Back"
            color="white"
          />
          <h1 className="text-xl text-center font-semibold lg:font-bold lg:text-2xl grow text-primary">
            Create Post
          </h1>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title || !body) {
            toast.error("Title and Description are required!!");
            return;
          }
          if (body.length > 1000) {
            toast.error("Description can only have 1000 characters.");
            return;
          }
          const id = toast.loading("Submitting the data...");
          axios
            .post("https://jsonplaceholder.typicode.com/posts", {
              title,
              body,
              userId: 1,
            })
            .then(() => {
              setStatus(true);
              toast.update(id, {
                render: "Post created!!",
                type: "success",
                isLoading: false,
              });
            })
            .catch((err) => {
              toast.update(id, {
                render: "Error!!" + err,
                type: "error",
                isLoading: false,
              });
            });
        }}
        className="bg-white mx-auto border-2 rounded-xl shadow-2xl max-w-[728px] w-[80%] flex flex-col justify-between items-center text-center gap-4 p-4"
      >
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="text-center font-semibold md:text-xl p-1 lg:p-2"
        />
        <Textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          maxLength={1000}
          className="min-h-[300px] lg:min-h-[400px] border w-full p-2 lg:p-4 rounded text-center md:text-lg"
          placeholder="Type the description of your post..."
        />
        <Button type="submit" className="w-full rounded-2xl text-lg">
          Save
        </Button>
      </form>
      <Button
        className="w-fit mx-auto lg:text-lg p-2 lg:px-4"
        onClick={() => navigate("/")}
        type="button"
      >
        Cancel
      </Button>
      <ToastContainer hideProgressBar />
    </div>
  );
}

export default Create;
