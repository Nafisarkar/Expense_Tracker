import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import { shadcn } from "@clerk/themes";
import { Toaster } from "react-hot-toast";
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      baseTheme: shadcn,
      variables: {
        colorPrimary: "inherit",
        colorTextOnPrimaryBackground: "#ffffff",
        fontFamily: "inherit",
      },
      elements: {
        card: "bg-base-200 shadow-md",
        headerTitle: "text-3xl font-bitcount",
        formButtonPrimary:
          "btn btn-primary border-0 hover:bg-primary-200 btn-block mt-4",
        formFieldInput:
          "input input-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:bg-primary-200 focus:border-transparent",
        footerActionLink: "text-primary hover:underline",
        userButtonPopoverCard: "bg-base-200 mt-5 shadow-lg bg-base-100",
        profilePage: "bg-base-200 p-6 rounded-lg shadow-lg",
        profileCard: "bg-base-100 p-4 rounded-lg shadow-md",
        profileDetailsItemLabel: "text-base-content/70",
        profileDetailsItemValue: "text-base-content font-medium",
        divider: "border-base-200 my-4",
        cardBox: "bg-base-200  rounded-lg shadow-md",
      },
      layout: {
        socialButtonsVariant: "iconButton",
      },
    }}
  >
    <BrowserRouter>
      <App data-theme={"dark"} />
      <Toaster position="bottom-left" />
    </BrowserRouter>
  </ClerkProvider>
);
