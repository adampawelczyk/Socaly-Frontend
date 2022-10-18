export const editorConfig = {
  skin_url: '..\\assets\\skins\\ui\\light',
  branding: false,
  height: 0,
  setup: (editor: { on: (arg0: string, arg1: () => void) => void; getContainer: () => any; }) => {
    editor.on("focus", () => {
      const element = editor.getContainer();
      if (element) {
        element.style.border = "1px solid black";
      }
    });
    editor.on("blur", () => {
      const element = editor.getContainer();
      if (element) {
        element.style.border = "1px solid #f0f2f3";
      }
    });
  },
  placeholder: "",
  menubar: false,
  plugins: [
    'lists charmap print preview anchor emoticons paste',
    'searchreplace visualblocks fullscreen insertdatetime link'
  ],
  toolbar:
    'formatselect | bold italic link strikethrough superscript bullist numlist emoticons',
  link_title: false,
  target_list: false,
  default_link_target:"_blank",
  link_context_toolbar: true,
  contextmenu: false
}
