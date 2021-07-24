import * as monaco from "monaco-editor";
import "./index.css";

window.onload = async function () {
  const value = await fetch("/api/load-file").then((res) => res.json());

  const editor = monaco.editor.create(
    document.getElementById("editor-container"),
    {
      value: value,
      language: "typescript",
      theme: "vs-dark",
    }
  );

  let loading = false;

  document
    .getElementById("save-preview")
    .addEventListener("click", async function () {
      if (loading) {
        return;
      }
      const mask = document.getElementById("mask");

      loading = true;
      mask.style.display = "flex";

      const currentValue = editor.getValue();
      const { success, msg } = await fetch("/api/save-preview", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ value: currentValue }),
      }).then((res) => res.json());

      loading = false;
      mask.style.display = "none";

      const errorDiv = document.getElementById("error");
      const ifm = document.getElementById("preview-ifm");

      if (success) {
        ifm.src = ifm.src;
        ifm.style.display = "block";
        errorDiv.style.display = "none";
      } else {
        ifm.style.display = "none";
        errorDiv.innerText = msg;
        errorDiv.style.display = "block";
      }
    });
};
