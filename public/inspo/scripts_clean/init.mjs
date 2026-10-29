// Neutralized Framer editorbar to prevent external calls and 404s
export function createEditorBar() {
  return () => null;
}
