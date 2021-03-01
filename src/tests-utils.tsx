import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from "./app/appContext";

export const renderWithContext = (content: JSX.Element) => {
  return render(
    <AppProvider>
      <BrowserRouter>{content}</BrowserRouter>
    </AppProvider>
  );
};
