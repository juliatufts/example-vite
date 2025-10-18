import { createContext, useState } from "react";
import { TextBlock, TextEditor } from "../TextEditor";
import Button from "../Button";

// Form Context
interface FormContextType {
  textBlocks: TextBlock[];
  setTextBlocks: React.Dispatch<React.SetStateAction<TextBlock[]>>;
}

const initialTextBlocks: TextBlock[] = [
  { id: crypto.randomUUID().split("-")[0], content: "", styles: {} },
];

export const FormContext = createContext({
  textBlocks: [],
  setTextBlocks: (_: TextBlock[]) => {},
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

  return (
    <FormContext.Provider value={{ textBlocks, setTextBlocks }}>
      <div className="editor">
        <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
          <ol>
            {textBlocks.map(({ id }) => (
              <li
                className="border border-gray-300 p-4 my-4 rounded-md"
                key={id}
              >
                <TextEditor key={id} id={id} />
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
