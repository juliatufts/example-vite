import { Dispatch, SetStateAction } from "react";
import { TextStyles } from "../TextEditorOptions";

export function updateStyles(
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
