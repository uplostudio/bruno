import axios from "axios";
import generatePage from "../utils/generatePage";
import { useState } from "react";

export default function LoadFigmaNodesButton() {
  const parser = new DOMParser();
  const project = "1h6gyZ69tPdjDJ7JISDuLP";
  const frame = "4:8";
  const token = "figd_sHquxfihm2ex9bN7BJ980wtz05rbneflrpTnG3sV";

  const [html, setHtml] = useState("");
  const [text, setText] = useState("Load Data");

  const options = {
    headers: {
      "X-Figma-Token": token,
    },
  };

  function loadNodes() {
    setText("Loading...");
    axios(
      `https://api.figma.com/v1/files/${project}/nodes?ids=${frame}`,
      options
    )
      .then((data) => {
        console.log(data);
        const nodes = data.data.nodes[frame].document;
        setHtml(generatePage(nodes));
        setText("Load Data");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="br__load-nodes-button" onClick={loadNodes}>
        {text}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <iframe
          style={{
            outline: "none",
            border: "1px solid #ddd",
            width: "400px",
            height: "800px",
            resize: "both",
            overflow: "auto",
          }}
          srcDoc={html}
        />
      </div>
      {/* <div
        style={{ width: "100%" }}
        dangerouslySetInnerHTML={{ __html: html }}
      /> */}
    </>
  );
}
