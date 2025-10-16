import React from "react";
import classNames from "classnames";
import EditorOptions, { TextStyles } from "./EditorOptions";

interface EditorProps {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Main editor component with textarea and options
 */
function Editor({ onFormSubmit }: EditorProps) {
  const [maxLineLength, setMaxLineLength] = React.useState<number>(42);
  const [warning, setWarning] = React.useState<string | null>(null);
  const [textStyles, setTextStyles] = React.useState<TextStyles>({
    "font-bold": false,
    "text-sm": false,
  });
  const defaultText = "hello printer";
  const fortyTwo = "123456789012345678901234567890123456789012";

  function onFormChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement;

    // if textarea changed, check line length
    if (target.id === "text") {
      const textarea = target as HTMLTextAreaElement;
      const lines = textarea.value.split("\n");
      let tooLong = lines.some((line) => line.length > maxLineLength);
      if (tooLong) {
        setWarning(`line exceeds ${maxLineLength} characters`);
        return;
      } else {
        setWarning(null);
      }
    }

    if (target.id === "font-a") {
      const checkbox = target as HTMLInputElement;
      if (checkbox.checked) {
        setTextStyles((prev) => ({ ...prev, "text-sm": false }));
        setMaxLineLength(42);
      }
    }

    if (target.id === "font-b") {
      const checkbox = target as HTMLInputElement;
      if (checkbox.checked) {
        setTextStyles((prev) => ({ ...prev, "text-sm": true }));
        setMaxLineLength(72);
      }
    }

    if (target.id === "bold") {
      const checkbox = target as HTMLInputElement;
      if (checkbox.checked) {
        setTextStyles((prev) => ({ ...prev, "font-bold": true }));
      } else {
        setTextStyles((prev) => ({ ...prev, "font-bold": false }));
      }
    }

    if (target.id === "invert") {
      const checkbox = target as HTMLInputElement;
      if (checkbox.checked) {
        setTextStyles((prev) => ({
          ...prev,
          "text-white": true,
          "bg-black": true,
        }));
      } else {
        setTextStyles((prev) => ({
          ...prev,
          "text-white": false,
          "bg-black": false,
        }));
      }
    }
  }

  // overflow-wrap: anywhere

  return (
    <div className="editor">
      <form onSubmit={onFormSubmit} onChange={onFormChange}>
        <label className="textarea-label" htmlFor="text">
          Text to print:
        </label>
        <textarea
          className={classNames(
            "border border-gray-300 rounded-md p-1 font-monospace",
            textStyles
          )}
          id="text"
          name="text"
          rows={8}
          cols={45}
          defaultValue={defaultText}
        ></textarea>
        {warning && (
          <p className="text-orange-500 font-bold">warning: {warning}</p>
        )}
        <EditorOptions />
        <button type="submit">Print</button>
      </form>
    </div>
  );
}

export default Editor;
