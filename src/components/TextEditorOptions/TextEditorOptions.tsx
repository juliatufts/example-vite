import { useContext, useState } from "react";
import { FormContext } from "../Form/Form";
import Button from "../Button";

/**
 * TODO: Character Commands options for
 * - character size
 *   - width/height scaling: 1-8x
 * - underline (ESC -)
 *   - 1 dot or 2 dots thick
 * - double strike (ESC G)
 * - special fonts? (ESC M)
 *   - A-E, special A-B
 * - 90 degree clockwise rotation (ESC V)
 *
 * Also: line spacing, spacing (ESC SP)
 */

/**
 * Options for the text editor: font selection, bold, etc.
 */
function TextEditorOptions({ id }: { id: string }) {
  const {
    textBlocks,
    addTextBlock,
    removeTextBlock,
    moveBlockDown,
    moveBlockUp,
  } = useContext(FormContext);
  const [expanded, setExpanded] = useState(true);

  const index = textBlocks.findIndex((b) => b.id === id);
  const isTheOnlyBlock = textBlocks.length === 1 && index === 0;
  const isNotTheLastBlock =
    textBlocks.length > 0 && index < textBlocks.length - 1;
  const isNotTheFirstBlock = textBlocks.length > 0 && index > 0;

  return (
    <div className="text-left w-full">
      <div className="border border-gray-300 pb-1 rounded-md">
        <div className="flex gap-2 justify-between">
          <button
            className="w-full text-left my-1 hover:cursor-pointer" // TODO: hover/focus styles
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={`${id}-options`}
          >
            <span className="mx-2">{expanded ? "▲" : "▼"}</span>
            <h3 className="font-medium inline w-full mr-2">Options</h3>
          </button>
        </div>
        {expanded && (
          <div
            id={`${id}-options`}
            className="border-t-1 border-gray-300 pt-2 px-2"
          >
            <fieldset className="border-none text-left flex gap-3">
              <legend className="float-left">Select a font:</legend>
              <div>
                <input
                  className="mr-2"
                  type="radio"
                  name={`${id}-font`}
                  id={`${id}-font-a`}
                  value="a"
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
                  value="b"
                />
                <label htmlFor={`${id}-font-b`}>Font B</label>
              </div>
            </fieldset>
            <div className="my-2">
              <label htmlFor={`${id}-letterSpacing`} className="mr-2">
                Letter Spacing:
              </label>
              <input
                type="number"
                min={0}
                max={255}
                id={`${id}-letterSpacing`}
                name={`${id}-letterSpacing`}
                className="w-16 border border-gray-300 rounded-md p-1"
              />
            </div>
            <div className="my-2 flex gap-4">
              <div>
                <label htmlFor={`${id}-scaleWidth`} className="mr-2">
                  Scale width:
                </label>
                <input
                  type="number"
                  min={0}
                  max={7}
                  id={`${id}-scaleWidth`}
                  name={`${id}-scaleWidth`}
                  className="w-16 border border-gray-300 rounded-md p-1"
                />
              </div>
              <div>
                <label htmlFor={`${id}-scaleHeight`} className="mr-2">
                  Scale height:
                </label>
                <input
                  type="number"
                  min={0}
                  max={7}
                  id={`${id}-scaleHeight`}
                  name={`${id}-scaleHeight`}
                  className="w-16 border border-gray-300 rounded-md p-1"
                />
              </div>
            </div>
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
                    id={`${id}-underline`}
                    name={`${id}-underline`}
                  />
                  <label htmlFor={`${id}-underline`}>Underline</label>
                </div>
                <div>
                  <input
                    className="mr-2"
                    type="checkbox"
                    id={`${id}-strike`}
                    name={`${id}-strike`}
                  />
                  <label htmlFor={`${id}-underline`}>Strikethrough</label>
                </div>
                <div>
                  <input
                    className="mr-2"
                    type="checkbox"
                    id={`${id}-upsideDown`}
                    name={`${id}-upsideDown`}
                  />
                  <label htmlFor={`${id}-upsideDown`}>Upside Down</label>
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
                <div>
                  <input
                    className="mr-2"
                    type="checkbox"
                    id={`${id}-rotate`}
                    name={`${id}-rotate`}
                  />
                  <label htmlFor={`${id}-rotate`}>Rotate 90</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <Button
          type="button"
          onClick={() => addTextBlock(index)}
          variant="secondary"
          aria-label="Add new block"
        >
          {expanded ? "Add new block" : "➕"}
        </Button>
        {!isTheOnlyBlock && (
          <Button
            type="button"
            onClick={() => removeTextBlock(index)}
            variant="danger"
            aria-label="Remove block"
          >
            {expanded ? "Remove block" : "➖"}
          </Button>
        )}
        {isNotTheLastBlock && (
          <Button
            type="button"
            onClick={() => moveBlockDown(index)}
            variant="secondary"
            title={"move down"}
            aria-label="move block down"
          >
            ⬇
          </Button>
        )}
        {isNotTheFirstBlock && (
          <Button
            type="button"
            onClick={() => moveBlockUp(index)}
            variant="secondary"
            title={"move up"}
            aria-label="move block up"
          >
            ⬆
          </Button>
        )}
        {isNotTheLastBlock && (
          <div>
            <label htmlFor={`${id}-concat`} className="mr-2">
              Connect with:
            </label>
            <select
              id={`${id}-concat`}
              name={`${id}-concat`}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value="space">Single space</option>
              <option value="newline">Newline</option>
              <option value="nospace">No space</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextEditorOptions;
