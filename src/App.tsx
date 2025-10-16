import ollie from "./assets/ollie.png";
import "./App.css";
import Editor from "./components/Editor";

function getCookieValue(cookie: string): string {
  return (
    cookie
      .split("; ")
      .find((row) => row.startsWith("receipt_csrf="))
      ?.split("=")[1] || ""
  );
}

function App() {
  const endpoint = "https://receipt.recurse.com/text";
  const token = getCookieValue(document.cookie) || "TESTINGTOKEN";

  const onSubmit = async (e: any) => {
    e.preventDefault();
    var formData = new FormData(e.target);

    // for testing
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // TODO: add text options to data
    // font, bold, upside-down, invert
    const data = { text: formData.get("text") };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: { "X-CSRF-Token": token, "Content-Type": "application/json" },
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
      <div className="card flex justify-center">
        <img src={ollie} className="logo" alt="Octopus logo" />
      </div>
      {token ? (
        <Editor onFormSubmit={onSubmit} />
      ) : (
        <div>
          <p>
            you are not authenticated.{" "}
            <a href="https://receipt.recurse.com/login">
              log in to receipt printer API
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default App;
