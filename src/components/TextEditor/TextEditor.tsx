import React, { useLayoutEffect, useRef } from "react";
import cn from "classnames";
import { TextEditorProps } from ".";
import { TextEditorOptions, TextStyles } from "../TextEditorOptions";
import { updateStyles } from "./utils";

const initialStyles: TextStyles = {
  "dark:bg-white": true,
  "dark:text-black": true,
  "font-mono": true,
};

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

  function onTextInputChange(e: any) {
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
            <textarea
              role="textbox"
              id={`${id}-text`}
              name={`${id}-text`}
              className={cn(
                "resize-none break-all border border-gray-300 rounded-md p-1",
                textOptionStyles
              )}
              onInput={onTextInputChange}
              defaultValue={defaultText}
            ></textarea>
          </div>
          {/* <div className={cn("w-[420px] mb-4", containerStyles)}>
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
              onInput={onTextInputChange}
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
          </div> */}
        </div>
        <TextEditorOptions id={id} />
      </div>
    </section>
  );
}

export default TextEditor;
