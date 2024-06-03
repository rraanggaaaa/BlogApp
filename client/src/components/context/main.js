import React, { useCallback, useMemo, useRef, useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import styles from "./styles.module.css";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const quill = useRef();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/blogs/add", {
        title,
        content,
        author
      });
      console.log("Post saved:", response.data);
      // Reset form fields after successful submission
      setTitle("");
      setAuthor("");
      setContent("");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.editor;
        const range = quillEditor.getSelection();
        quillEditor.insertEmbed(range ? range.index : 0, "image", imageUrl);
      };
      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header", "bold", "italic", "underline", "strike", "blockquote", 
    "list", "bullet", "indent", "link", "image", "color", "clean"
  ];

  return (
    <div className={styles.wrapper}>
      <label className="flex text-2xl font-loader justify-center content-center text-center">Editor Content</label>
      <label className={styles.label}>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <label className={styles.label}>Author</label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className={styles.input}
      />
      <label className={styles.label}>Content</label>
      <QuillEditor
        ref={quill}
        className={styles.editor}
        theme="snow"
        value={content}
        formats={formats}
        modules={modules}
        onChange={setContent}
      />
      <div className="flex justify-end mt-20">
        <button onClick={handleSubmit} className="bg-green-400 font-loader rounded-lg p-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Editor;
