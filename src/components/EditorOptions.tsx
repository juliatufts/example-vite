export interface TextStyles {
  [key: string]: boolean;
}

/**
 * Options for the text editor: font selection, bold, etc.
 */
function EditorOptions() {
  return (
    <div className="mt-2">
      <fieldset className="border-none text-left flex gap-3 justify-center">
        <legend className="float-left">Select a font:</legend>
        <div>
          <input
            className="mr-2"
            type="radio"
            name="font"
            id="font-a"
            value="font-a"
            defaultChecked
          />
          <label htmlFor="font-a">Font A</label>
        </div>
        <div>
          <input
            className="mr-2"
            type="radio"
            name="font"
            id="font-b"
            value="font-b"
          />
          <label htmlFor="font-a">Font B</label>
        </div>
      </fieldset>
      <div className="flex gap-3 justify-center">
        Options:
        <div>
          <input className="mr-2" type="checkbox" id="bold" name="bold" />
          <label htmlFor="bold">Bold</label>
        </div>
        <div>
          <input
            className="mr-2"
            type="checkbox"
            id="upside-down"
            name="upside-down"
          />
          <label htmlFor="upside-down">Upside Down</label>
        </div>
        <div>
          <input className="mr-2" type="checkbox" id="invert" name="invert" />
          <label htmlFor="invert">Invert Color</label>
        </div>
        {/* <div>
        <input className="mr-2" type="checkbox" id="scale" name="scale" />
        <label htmlFor="scale">Double Size (H+V)</label>
      </div> */}
      </div>
    </div>
  );
}

export default EditorOptions;
