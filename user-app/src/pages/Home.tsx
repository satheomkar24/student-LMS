import { Editor } from "@satheomkar24/common-types";
import React from "react";

const Home = () => {
  const [content, setContent] = React.useState("");
  return (
    <div>
      <Editor content={content} setContent={setContent} />
    </div>
  );
};

export default Home;
