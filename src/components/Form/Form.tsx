import { createContext, useState } from "react";
import { TextBlock, TextEditor } from "../TextEditor";
import Button from "../Button";
import { swapArrayElements } from "../../utils";

// Form Context
interface FormContextType {
  textBlocks: TextBlock[];
  addTextBlock: (index: number) => void;
  removeTextBlock: (index: number) => void;
  moveBlockDown: (index: number) => void;
  moveBlockUp: (index: number) => void;
}

const initialTextBlocks: TextBlock[] = [
  { id: crypto.randomUUID().split("-")[0], content: "", styles: {} },
];

export const FormContext = createContext({
  textBlocks: [],
  addTextBlock: (_: number) => {},
  removeTextBlock: (_: number) => {},
  moveBlockDown: (_: number) => {},
  moveBlockUp: (_: number) => {},
} as FormContextType);

// Form Props
interface FormProps {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Main form component containing multiple text editors
 */
function Form({ onFormSubmit }: FormProps) {
  const [textBlocks, setTextBlocks] = useState(initialTextBlocks);

  function addTextBlock(index: number) {
    setTextBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks.splice(index + 1, 0, {
        id: crypto.randomUUID().split("-")[0],
        content: "",
        styles: {},
      });
      return newBlocks;
    });
  }

  function removeTextBlock(index: number) {
    setTextBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks.splice(index, 1);
      return newBlocks;
    });
  }

  function moveBlockDown(index: number) {
    setTextBlocks((prev) => {
      const newBlocks = swapArrayElements(prev, index, index + 1);
      return newBlocks;
    });
  }

  function moveBlockUp(index: number) {
    setTextBlocks((prev) => {
      const newBlocks = swapArrayElements(prev, index, index - 1);
      return newBlocks;
    });
  }

  return (
    <FormContext.Provider
      value={{
        textBlocks,
        addTextBlock,
        removeTextBlock,
        moveBlockDown,
        moveBlockUp,
      }}
    >
      <div className="editor">
        <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
          <ol>
            {textBlocks.map(({ id }) => (
              <li
                className="border border-gray-300 p-4 my-4 rounded-md"
                key={id}
              >
                <TextEditor id={id} />
              </li>
            ))}
          </ol>
          <Button variant="primary" type="submit" className="print">
            Print
          </Button>
        </form>
      </div>
    </FormContext.Provider>
  );
}

export default Form;
