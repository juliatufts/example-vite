import React, { Dispatch, SetStateAction, useRef } from "react";
import cn from "classnames";
import { TextEditorProps } from ".";
import { TextEditorOptions, TextStyles } from "../TextEditorOptions";

const initialStyles: TextStyles = {
  "dark:bg-white": true,
  "dark:text-black": true,
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
    case "upsideDown":
      if (isChecked) {
        setTextStyles((prev) => ({ ...prev, "rotate-180": true }));
      } else {
        setTextStyles((prev) => ({ ...prev, "rotate-180": false }));
      }
      break;
    case "invert":
      if (isChecked) {
        setTextStyles((prev) => ({
          ...prev,
          "text-white": true,
          "bg-black": true,
          "dark:bg-white": false,
          "dark:text-black": false,
        }));
      } else {
        setTextStyles((prev) => ({
          ...prev,
          "text-white": false,
          "bg-black": false,
          "dark:bg-white": true,
          "dark:text-black": true,
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
            rows={3}
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
