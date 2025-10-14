import ollie from "./assets/ollie.png";
import "./App.css";

function App() {
  const defaultText = "hello printer";
  const endpoint = "https://receipt.recurse.com/text";

  const onSubmit = async (e: any) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    console.log(formData.get("text"));

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ text: formData.get("text") }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      let err = error as Error;
      console.error(err.message);
    }
  };

  return (
    <>
      <h1>Vite Receipt</h1>
      <div className="card">
        <img src={ollie} className="logo" alt="Octopus logo" />
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <textarea
            id="text"
            name="text"
            rows={5}
            cols={33}
            defaultValue={defaultText}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
