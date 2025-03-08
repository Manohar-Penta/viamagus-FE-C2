import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Create from "./components/Create.tsx";
import Post from "./components/Post.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index Component={App} />
      <Route path="/create" Component={Create} />
      <Route path="/post/:id" Component={Post} />
    </Routes>
  </BrowserRouter>
);
