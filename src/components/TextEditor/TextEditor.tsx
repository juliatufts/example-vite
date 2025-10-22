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
  input: HTMLInputElement,
  setTextStyles: Dispatch<SetStateAction<TextStyles>>
) {
  const isChecked = input.checked;
  switch (targetId) {
    case "font-a":
      if (isChecked) {
        setTextStyles((prev) => ({ ...prev, "text-xs": false }));
      }
      break;
    case "font-b":
      if (isChecked) {
        setTextStyles((prev) => ({ ...prev, "text-xs": true }));
      }
      break;
    case "letterSpacing":
      console.log("update letter spacing:", input.value);
      setTextStyles((prev) => {
        const oldStyleKey = Object.keys(prev).filter((key) =>
          key.startsWith("tracking-")
        );
        if (oldStyleKey.length > 0) {
          delete prev[oldStyleKey[0]];
        }
        return {
          ...prev,
          [`tracking-[${input.value}px]`]: true,
        };
      });
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
  const [textOptionStyles, setTextStyles] =
    React.useState<TextStyles>(initialStyles);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const defaultText = "hello printer";
  // const fortyTwo = "123456789012345678901234567890123456789012";
  // const fiftySix = "12345678901234567890123456789012345678901234567890123456";

  function onFormChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement;
    const targetId = target.id.slice(id.length + 1); // remove editor id prefix
    const input = target as HTMLInputElement;

    updateStyles(targetId, input, setTextStyles);
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
            name={`${id}-text`}
            rows={4}
            cols={45}
            defaultValue={defaultText}
            ref={textAreaRef}
          />
        </div>
        <TextEditorOptions id={id} />
      </div>
    </section>
  );
}

export default TextEditor;
