import axios from "axios";
import nodesToHtml from "../utils/nodesToHtml";
import { useState } from "react";

export default function LoadFigmaNodesButton() {
  const parser = new DOMParser();
  const project = "1h6gyZ69tPdjDJ7JISDuLP";
  const frame = "4:8";
  const token = "figd_sHquxfihm2ex9bN7BJ980wtz05rbneflrpTnG3sV";

  const [html, setHtml] = useState("");

  const options = {
    headers: {
      "X-Figma-Token": token,
    },
  };

  function loadNodes() {
    console.log("loading...");
    axios(
      `https://api.figma.com/v1/files/${project}/nodes?ids=${frame}`,
      options
    )
      .then((data) => {
        const nodes = data.data.nodes[frame].document;
        setHtml(nodesToHtml(nodes));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="br__load-nodes-button" onClick={loadNodes}>
        Load Nodes
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
