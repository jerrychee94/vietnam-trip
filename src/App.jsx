import { Routes, Route } from "react-router-dom";
import AppShell from "./components/AppShell";
import OverviewPage from "./pages/OverviewPage";
import DayPage from "./pages/DayPage";
import PlacesPage from "./pages/PlacesPage";
import TipsPage from "./pages/TipsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<OverviewPage />} />
        <Route path="day/:dayNumber" element={<DayPage />} />
        <Route path="places" element={<PlacesPage />} />
        <Route path="tips" element={<TipsPage />} />
      </Route>
    </Routes>
  );
}
