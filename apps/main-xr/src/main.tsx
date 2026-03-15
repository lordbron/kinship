import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import VoicePage from "./VoicePage";
import HistoryPage from "./HistoryPage";
import TrailerPage from "./TrailerPage";
import BooksPage from "./BooksPage";
import CompanionPage from "./CompanionPage";
import { isXRMode } from "./xrMode";

// Apply WebSpatial class only when actually running as a standalone PWA
// (PICO emulator). Regular desktop browsers get a dark background instead.
if (isXRMode) {
  document.documentElement.classList.add("is-spatial");
}

const isHistory = window.location.pathname === "/history";
const isTrailer = window.location.pathname === "/trailer";
const isBooks = window.location.pathname === "/books";
const isCompanion = window.location.pathname === "/companion";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isHistory ? (
      <HistoryPage />
    ) : isTrailer ? (
      <TrailerPage />
    ) : isBooks ? (
      <BooksPage />
    ) : isCompanion ? (
      <CompanionPage />
    ) : (
      <VoicePage />
    )}
  </StrictMode>,
);
