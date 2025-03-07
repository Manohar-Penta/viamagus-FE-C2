function PostComponent({
  post,
  onClick,
}: {
  post: { id: number; title: string; body: string };
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      key={post.id}
      className="mx-auto w-[90vw] max-w-[1024px] bg-secondary rounded-lg text-white border hover:bg-primary hover:scale-105 hover:shadow-2xl transition-all"
    >
      <div className="p-2 lg:p-4 flex overflow-hidden">
        <img
          src={"/vite.svg"}
          alt=""
          className="h-[50px] md:h-[75px] my-auto bg-third rounded lg:rounded-2xl p-2"
        />
        <div className="p-2 flex flex-col gap-2">
          <h1 className="text-md font-bold text-nowrap w-[75vw] max-w-[700px] overflow-hidden overflow-ellipsis">
            {post.title}
          </h1>
          <p className="text-nowrap w-[75vw] max-w-[700px] overflow-hidden overflow-ellipsis">
            {post.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostComponent;
