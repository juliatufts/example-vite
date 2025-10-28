import ollie from "./assets/ollie.png";
import "./App.css";
import { Form } from "./components/Form";

interface TextReceiptData {
  text?: string;
  underline?: boolean;
  bold?: boolean;
  font?: "a" | "b";
  upsideDown?: boolean;
  invert?: boolean;
  rotate?: boolean;
  letterSpacing?: number;
  scaleWidth?: number;
  scaleHeight?: number;
  concat?: string;
}

function getCookieValue(cookie: string): string {
  return (
    cookie
      .split("; ")
      .find((row) => row.startsWith("receipt_csrf="))
      ?.split("=")[1] || ""
  );
}

function App() {
  let endpoint = "https://receipt.recurse.com/textblocks";
  // let endpoint = "http://receipt.local:4000/textblocks";

  if (import.meta.env.DEV) {
    document.cookie = "receipt_csrf=dev_token; path=/";
    endpoint = "http://localhost:3000/textblocks";
  }
  const token = getCookieValue(document.cookie);
  // const token = "temp_cookie";

  const onSubmit = async (e: any) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    let currentId = "";
    let currentOptions = {};
    const textblocks: TextReceiptData[] = [];

    // batch form data into textblocks grouped by id
    for (const pair of formData.entries()) {
      const [id, optionName] = pair[0].split("-", 2);
      let optionValue = pair[1];

      // scale is displayed 1-8 for human readability but API expects 0-7 range
      if (optionName === "scaleWidth" || optionName === "scaleHeight") {
        optionValue = (Number(optionValue) - 1).toString();
      }

      if (currentId === id) {
        currentOptions = { ...currentOptions, [optionName]: optionValue };
      } else {
        if (Object.keys(currentOptions).length > 0)
          textblocks.push(currentOptions);
        currentOptions = { [optionName]: optionValue };
        currentId = id;
      }
    }

    // last text block cuts the paper
    currentOptions = { ...currentOptions, concat: "cut" };
    textblocks.push(currentOptions);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ textblocks }),
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
    <div>
      <h1 className="text-center">Receipt Text</h1>
      <div className="flex justify-center py-4 ">
        <img
          src={ollie}
          className="h-16 w-16 m-8"
          alt="Octopus emoji expressing excitement"
        />
      </div>
      {token ? (
        <Form onFormSubmit={onSubmit} />
      ) : (
        <div>
          <p>
            you are not authenticated.{" "}
            {/* <a href="https://receipt.recurse.com/login?redirect_uri=https://receipt-text.recurse.com"> */}
            <a href="https://receipt.recurse.com/login?redirect_uri=https://receipt-text.vercel.app/">
              log in to receipt printer API
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
