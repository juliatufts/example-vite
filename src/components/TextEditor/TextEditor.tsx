import React, { useRef } from "react";
import cn from "classnames";
import { TextEditorProps } from ".";
import { TextEditorOptions, TextStyles } from "../TextEditorOptions";

const initialStyles: TextStyles = {
  "font-bold": false,
  "text-sm": false,
};

/**
 * Main editor component with textarea and options
 */
function TextEditor({ id }: TextEditorProps) {
  const [maxLineLength, setMaxLineLength] = React.useState<number>(42);
  const [log, setLog] = React.useState<string | null>(null);
  const [textOptionStyles, setTextStyles] =
    React.useState<TextStyles>(initialStyles);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const defaultText = "hello printer";
  const fortyTwo = "123456789012345678901234567890123456789012";

  function onFormChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement;
    const targetId = target.id.slice(id.length + 1); // Remove id prefix
    const checkbox = target as HTMLInputElement;

    switch (targetId) {
      case "font-a":
        if (checkbox.checked) {
          setTextStyles((prev) => ({ ...prev, "text-sm": false }));
          setMaxLineLength(42);
          setLog(`Max line length set to ${42}`);
        }
        break;
      case "font-b":
        if (checkbox.checked) {
          setTextStyles((prev) => ({ ...prev, "text-sm": true }));
          setMaxLineLength(72);
          setLog(`Max line length set to ${72}`);
        }
        break;
      case "bold":
        if (checkbox.checked) {
          setTextStyles((prev) => ({ ...prev, "font-bold": true }));
        } else {
          setTextStyles((prev) => ({ ...prev, "font-bold": false }));
        }
        break;
      case "invert":
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
        break;
      default:
        break;
    }
  }

  function updateSelection(
    e:
      | React.MouseEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    const start = textAreaRef.current?.selectionStart;
    const end = textAreaRef.current?.selectionEnd;
    setLog(`Selected text from ${start} to ${end}`);
  }

  return (
    <section onChange={onFormChange}>
      <div className="md:flex md:gap-2">
        <div>
          <label
            className="block font-medium align-left mb-2"
            htmlFor={`${id}-text`}
          >
            Text to print:
          </label>
          <textarea
            className={cn(
              "resize-none w-[420px] break-all border border-gray-300 rounded-md p-1 font-mono",
              textOptionStyles
            )}
            id={`${id}-text`}
            name="text"
            rows={4}
            cols={45}
            defaultValue={fortyTwo}
            onKeyUp={updateSelection}
            onClick={updateSelection}
            ref={textAreaRef}
          />
          {/* {log && <p className="font-bold">{log}</p>} */}
        </div>
        <TextEditorOptions id={id} />
      </div>
    </section>
  );
}

export default TextEditor;
