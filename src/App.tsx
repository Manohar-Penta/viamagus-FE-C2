import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "./components/Posts";
import { Link } from "react-router";

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <div className="sticky top-0 border-b-gray-400 shadow-lg px-4 bg-third">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto">
          <h1 className="p-4 font-bold text-2xl text-primary">Posts</h1>
          <button className="rounded-lg font-semibold px-2 py-1 bg-primary text-white hover:bg-secondary hover:text-black hover:scale-105 transition-all">
            <Link to="/create">Create</Link>
          </button>
        </div>
      </div>
      <Posts />
    </QueryClientProvider>
  );
}

export default App;
