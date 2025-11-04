import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
} from "react";
import cn from "classnames";
import { TextEditorProps } from ".";
import { TextEditorOptions, TextStyles } from "../TextEditorOptions";

const initialStyles: TextStyles = {
  "dark:bg-white": true,
  "dark:text-black": true,
  "font-mono": true,
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
    case "scaleWidth":
      setTextStyles((prev) => {
        const oldStyleKey = Object.keys(prev).filter((key) =>
          key.startsWith("scale-w-")
        );
        if (oldStyleKey.length > 0) {
          delete prev[oldStyleKey[0]];
        }
        return {
          ...prev,
          [`scale-w-${input.value}`]: true,
        };
      });
      break;
    case "scaleHeight":
      setTextStyles((prev) => {
        const oldStyleKey = Object.keys(prev).filter((key) =>
          key.startsWith("scale-h-")
        );
        if (oldStyleKey.length > 0) {
          delete prev[oldStyleKey[0]];
        }
        return {
          ...prev,
          [`scale-h-${input.value}`]: true,
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
    case "rotate":
      if (isChecked) {
        setTextStyles((prev) => ({
          ...prev,
          "font-mono": false,
          "font-rotated": true,
        }));
      } else {
        setTextStyles((prev) => ({
          ...prev,
          "font-mono": true,
          "font-rotated": false,
        }));
      }
      break;
    default:
      break;
  }
}

/**
 * Main editor component with textarea and options
 *
 * Unfortunately, in order to apply transform-scale to the textarea, we must use
 * a contenteditable div + an invisible input to handle the form data
 */
function TextEditor({ id }: TextEditorProps) {
  const [textOptionStyles, setTextStyles] =
    React.useState<TextStyles>(initialStyles);
  const [containerStyles, setContainerStyles] = React.useState<TextStyles>({});
  const textAreaRef = useRef<HTMLDivElement>(null);
  const textAreaInputRef = useRef<HTMLTextAreaElement>(null);
  const defaultText = "hello printer";

  useLayoutEffect(() => {
    if (textAreaRef.current) {
      const { height } = textAreaRef.current.getBoundingClientRect();
      setContainerStyles((prev) => {
        const oldStyleKey = Object.keys(prev).filter((key) =>
          key.startsWith("h-")
        );
        if (oldStyleKey.length > 0) {
          delete prev[oldStyleKey[0]];
        }
        return {
          ...prev,
          [`h-[${height}px]`]: true,
        };
      });
    }
  }, [textOptionStyles]);

  function onFormChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement;
    const targetId = target.id.slice(id.length + 1); // remove editor id prefix
    const input = target as HTMLInputElement;

    updateStyles(targetId, input, setTextStyles);
  }

  function onTextChange(e: any) {
    if (textAreaInputRef.current) {
      textAreaInputRef.current.value = e.target?.textContent;
    }
  }

  return (
    <section onChange={onFormChange}>
      <div className="md:flex md:gap-2">
        <div>
          <p
            className="block font-medium align-left mb-2"
            id={`${id}-text-label`}
          >
            Text to print:
          </p>
          <div className={cn("w-[420px] mb-4", containerStyles)}>
            <div
              role="textbox"
              aria-labelledby={`${id}-text-label`}
              contentEditable={true}
              suppressContentEditableWarning={true}
              className={cn(
                "resize-none break-all border border-gray-300 rounded-md p-1",
                textOptionStyles
              )}
              ref={textAreaRef}
              onInput={onTextChange}
            >
              {defaultText}
            </div>
            <textarea
              className="hidden"
              id={`${id}-text`}
              name={`${id}-text`}
              defaultValue={defaultText}
              ref={textAreaInputRef}
            ></textarea>
          </div>
        </div>
        <TextEditorOptions id={id} />
      </div>
    </section>
  );
}

export default TextEditor;
