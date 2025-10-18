import { useContext } from "react";
import { FormContext } from "../Form/Form";
import Button from "../Button";

function swapArrayElements<T>(arr: T[], index1: number, index2: number): T[] {
  const newArr = [...arr];
  const temp = newArr[index1];
  newArr[index1] = newArr[index2];
  newArr[index2] = temp;
  return newArr;
}

/**
 * Options for the text editor: font selection, bold, etc.
 */
function TextEditorOptions({ id }: { id: string }) {
  const { textBlocks, setTextBlocks } = useContext(FormContext);
  const index = textBlocks.findIndex((b) => b.id === id);
  const isTheOnlyBlock = textBlocks.length === 1 && index === 0;

  function addTextBlock(e: React.MouseEvent<HTMLButtonElement>) {
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

  function removeTextBlock() {
    setTextBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks.splice(index, 1);
      return newBlocks;
    });
  }

  function moveDown() {
    setTextBlocks((prev) => {
      const newBlocks = swapArrayElements(prev, index, index + 1);
      return newBlocks;
    });
  }

  function moveUp() {
    setTextBlocks((prev) => {
      const newBlocks = swapArrayElements(prev, index, index - 1);
      return newBlocks;
    });
  }

  return (
    <div className="text-left">
      <h3 className="mb-2 font-medium">Options:</h3>
      <div className="border border-gray-300 py-1 px-2 rounded-md">
        <fieldset className="border-none text-left flex gap-3">
          <legend className="float-left">Select a font:</legend>
          <div>
            <input
              className="mr-2"
              type="radio"
              name={`${id}-font`}
              id={`${id}-font-a`}
              value="font-a"
              defaultChecked
            />
            <label htmlFor={`${id}-font-a`}>Font A</label>
          </div>
          <div>
            <input
              className="mr-2"
              type="radio"
              name={`${id}-font`}
              id={`${id}-font-b`}
              value="font-b"
            />
            <label htmlFor={`${id}-font-b`}>Font B</label>
          </div>
        </fieldset>
        <div className="flex gap-2">
          <h4>Styles:</h4>
          <div className="flex flex-wrap gap-3">
            <div>
              <input
                className="mr-2"
                type="checkbox"
                id={`${id}-bold`}
                name={`${id}-bold`}
              />
              <label htmlFor={`${id}-bold`}>Bold</label>
            </div>
            <div>
              <input
                className="mr-2"
                type="checkbox"
                id={`${id}-upside-down`}
                name={`${id}-upside-down`}
              />
              <label htmlFor={`${id}-upside-down`}>Upside Down</label>
            </div>
            <div>
              <input
                className="mr-2"
                type="checkbox"
                id={`${id}-invert`}
                name={`${id}-invert`}
              />
              <label htmlFor={`${id}-invert`}>Invert Color</label>
            </div>
            {/* <div>
        <input className="mr-2" type="checkbox" id="scale" name="scale" />
        <label htmlFor="scale">Double Size (H+V)</label>
      </div> */}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <Button type="button" onClick={addTextBlock} variant="secondary">
          Add new block
        </Button>
        {!isTheOnlyBlock && (
          <Button type="button" onClick={removeTextBlock} variant="danger">
            Remove block
          </Button>
        )}
        {textBlocks.length > 0 && index < textBlocks.length - 1 && (
          <Button
            type="button"
            onClick={moveDown}
            variant="secondary"
            aria-label="move block down"
          >
            ⬇
          </Button>
        )}
        {textBlocks.length > 0 && index > 0 && (
          <Button
            type="button"
            onClick={moveUp}
            variant="secondary"
            aria-label="move block up"
          >
            ⬆
          </Button>
        )}
      </div>
    </div>
  );
}

export default TextEditorOptions;
