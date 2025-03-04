import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

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
    <div className="h-screen flex flex-col justify-center">
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
        className="mx-auto border rounded shadow-2xl max-w-[728px] w-[80%] flex flex-col items-center text-center gap-4 p-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="block border rounded text-center p-2 w-full"
        />
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          maxLength={1000}
          className="block roundeded border w-full h-[30vh] p-2 rounded"
          placeholder="Type the description of your post..."
        />
        <button
          type="submit"
          className="border w-full hover:cursor-pointer rounded-2xl hover:bg-gray-200 shadow-2xl"
        >
          Save
        </button>
      </form>
      <ToastContainer hideProgressBar />
    </div>
  );
}

export default Create;
