const allToolbarButton = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const articleBody = new Quill(".article-body", {
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],

      [{ header: [2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ color: [] }, { background: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  },
  theme: "snow",
});

const articleSubHeadline = new Quill(".article-sub-headline", {
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],

      [{ direction: "rtl" }],

      ["clean"]
    ],
  },
  theme: "snow",
});
