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

  if (import.meta.env.DEV) {
    document.cookie = "receipt_csrf=dev_token; path=/";
    endpoint = "http://localhost:3000/textblocks";
  }
  const token = getCookieValue(document.cookie);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    let currentId = "";
    let currentOptions = {};
    const blocks: TextReceiptData[] = [];

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
      const [id, optionName] = pair[0].split("-", 2);
      if (currentId === id) {
        currentOptions = { ...currentOptions, [optionName]: pair[1] };
      } else {
        if (Object.keys(currentOptions).length > 0) blocks.push(currentOptions);
        currentOptions = { [optionName]: pair[1] };
        currentId = id;
      }
    }
    currentOptions = { ...currentOptions, concat: "cut" };
    blocks.push(currentOptions);

    const blockInfo = blocks[blocks.length - 1];
    const data = {
      text: blockInfo.text,
      underline: !!blockInfo.underline,
      bold: !!blockInfo.bold,
      font: blockInfo.font,
      upsideDown: !!blockInfo.upsideDown,
      invert: !!blockInfo.invert,
      rotate: !!blockInfo.rotate,
      spacing: Number(blockInfo.letterSpacing),
      scaleWidth: Number(blockInfo.scaleWidth),
      scaleHeight: Number(blockInfo.scaleHeight),
      concat: blockInfo.concat,
    };
    console.log(data);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ textblocks: blocks }),
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
      <h1 className="text-center">Text Receipt</h1>
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
            <a href="https://receipt.recurse.com/login?redirect_uri=https://receipt-text.recurse.com">
              log in to receipt printer API
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default App;
