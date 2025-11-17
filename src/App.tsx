import ollie from "./assets/ollie.png";
import "./App.css";
import { Form } from "./components/Form";
import Anchor from "./components/Anchor/Anchor";

interface TextReceiptData {
  text?: string;
  underline?: boolean;
  bold?: boolean;
  font?: "a" | "b";
  invert?: boolean;
  letterSpacing?: number;
  scaleWidth?: number;
  scaleHeight?: number;
  coda?: string;
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
  let endpoint = "https://receipt.recurse.com/text";

  if (import.meta.env.DEV) {
    document.cookie = "receipt_csrf=dev_token; path=/";
    endpoint = "http://localhost:3000/text";
  }
  const token = getCookieValue(document.cookie);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    let currentId = "";
    let currentOptions = {};
    const textblocks: TextReceiptData[] = [];

    // group form data by id
    for (const pair of formData.entries()) {
      const [id, optionName] = pair[0].split("-", 2);
      let optionValue = pair[1];

      if (currentId === id) {
        currentOptions = { ...currentOptions, [optionName]: optionValue };
      } else {
        if (Object.keys(currentOptions).length > 0)
          textblocks.push(currentOptions);
        currentOptions = { [optionName]: optionValue };
        currentId = id;
      }
    }

    // last text call cuts the paper
    currentOptions = { ...currentOptions, coda: "cut" };
    textblocks.push(currentOptions);

    try {
      const promises = textblocks.map((block) =>
        fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ text: [block] }),
          credentials: "include",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
        })
      );

      const response = await Promise.all(promises);
      const lastResponse = response[response.length - 1];

      const failedResponses = response.filter((r) => !r.ok);
      if (failedResponses.length > 0) {
        throw new Error(`Response status: ${failedResponses[0].status}`);
      }

      const result = await lastResponse.json();
      console.log(result);
    } catch (error) {
      let err = error as Error;
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-24px)]">
      <div className="grow">
        <h1 className="text-center">Receipt Text</h1>
        <p className="text-center">
          A simple text editor for the RC receipt printer.
        </p>
        {token ? (
          <>
            <div className="flex justify-center py-4 ">
              <img
                src={ollie}
                className="h-16 w-16 mx-4"
                alt="Octopus emoji expressing excitement"
              />
              <div className="max-w-60">
                <p>
                  <span className="visually-hidden">Warning: </span>
                  <span aria-hidden>⚠️</span> The editor preview will be
                  slightly different than the actual printed text!
                </p>
              </div>
            </div>
            <Form onFormSubmit={onSubmit} />
          </>
        ) : (
          <div className="text-center mt-10">
            <p>you are not authenticated.</p>
            <p>
              <Anchor href="https://receipt.recurse.com/login?redirect_uri=https://receipt-text.recurse.com">
                log in to the receipt printer API
              </Anchor>
            </p>
          </div>
        )}
      </div>
      <footer className="flex justify-between mt-24 ">
        <Anchor href="https://github.com/juliatufts/receipt-text">
          View on GitHub
        </Anchor>
        <Anchor href="https://receipt.recurse.com/">Receipt Printer API</Anchor>
      </footer>
    </div>
  );
}

export default App;
