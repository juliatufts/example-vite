import React, { Dispatch, SetStateAction, useRef } from "react";
import cn from "classnames";
import { TextEditorProps } from ".";
import { TextEditorOptions, TextStyles } from "../TextEditorOptions";

const initialStyles: TextStyles = {
  "font-bold": false,
  "text-sm": false,
};

function updateStyles(
  targetId: string,
  isChecked: boolean,
  setTextStyles: Dispatch<SetStateAction<TextStyles>>
) {
  switch (targetId) {
    case "font-a":
      if (isChecked) {
        setTextStyles((prev) => ({ ...prev, "text-sm": false }));
      }
      break;
    case "font-b":
      if (isChecked) {
        setTextStyles((prev) => ({ ...prev, "text-sm": true }));
      }
      break;
    case "letterSpacing":
      // TODO: handle letter spacing separately
      break;
    case "bold":
      if (isChecked) {
        setTextStyles((prev) => ({ ...prev, "font-bold": true }));
      } else {
        setTextStyles((prev) => ({ ...prev, "font-bold": false }));
      }
      break;
    case "underline":
      if (isChecked) {
        setTextStyles((prev) => ({ ...prev, underline: true }));
      } else {
        setTextStyles((prev) => ({ ...prev, underline: false }));
      }
      break;
    case "strike":
      if (isChecked) {
        setTextStyles((prev) => ({ ...prev, "line-through": true }));
      } else {
        setTextStyles((prev) => ({ ...prev, "line-through": false }));
      }
      break;
    case "invert":
      if (isChecked) {
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

/**
 * Main editor component with textarea and options
 */
function TextEditor({ id }: TextEditorProps) {
  // const [maxLineLength, setMaxLineLength] = React.useState<number>(42);
  // const [log, setLog] = React.useState<string | null>(null);
  const [textOptionStyles, setTextStyles] =
    React.useState<TextStyles>(initialStyles);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const defaultText = "hello printer";
  // const fortyTwo = "123456789012345678901234567890123456789012";

  function onFormChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement;
    const targetId = target.id.slice(id.length + 1); // Remove id prefix
    const checkbox = target as HTMLInputElement;

    updateStyles(targetId, checkbox.checked, setTextStyles);
  }

  // function updateSelection(
  //   e:
  //     | React.MouseEvent<HTMLTextAreaElement>
  //     | React.KeyboardEvent<HTMLTextAreaElement>
  // ) {
  //   const start = textAreaRef.current?.selectionStart;
  //   const end = textAreaRef.current?.selectionEnd;
  //   setLog(`Selected text from ${start} to ${end}`);
  // }

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
            name={`${id}-text`}
            rows={4}
            cols={45}
            defaultValue={defaultText}
            // onKeyUp={updateSelection}
            // onClick={updateSelection}
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
