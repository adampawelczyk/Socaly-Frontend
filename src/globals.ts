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
  codesample_languages: [
    { text: 'C', value: 'c' },
    { text: 'C++', value: 'cpp' },
    { text: 'C#', value: 'csharp' },
    { text: 'CSS', value: 'css' },
    { text: 'Go', value: 'go' },
    { text: 'HTML/XML', value: 'markup' },
    { text: 'Java', value: 'java' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'Julia', value: 'julia' },
    { text: 'Kotlin', value: 'kotlin' },
    { text: 'Lua', value: 'lua' },
    { text: 'MATLAB', value: 'matlab' },
    { text: 'Objective-C', value: 'objectivec' },
    { text: 'Perl', value: 'perl' },
    { text: 'PHP', value: 'php' },
    { text: 'Python', value: 'python' },
    { text: 'R', value: 'r' },
    { text: 'Ruby', value: 'ruby' },
    { text: 'Rust', value: 'rust' },
    { text: 'Sass', value: 'sass' },
    { text: 'SCSS', value: 'scss' },
    { text: 'SQL', value: 'sql' },
    { text: 'Swift', value: 'swift' },
    { text: 'Typescript', value: 'typescript' },
    { text: 'Visual Basic', value: 'visual-basic' }
  ],
  plugins: [
    'lists charmap print preview anchor emoticons paste',
    'searchreplace visualblocks fullscreen insertdatetime link codesample'
  ],
  toolbar:
    'formatselect | bold italic link strikethrough superscript bullist numlist emoticons codesample',
  link_title: false,
  target_list: false,
  default_link_target:"_blank",
  link_context_toolbar: true,
  contextmenu: false
}
