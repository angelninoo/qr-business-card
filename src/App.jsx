import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusinessCard from "./pages/BusinessCard";
import QrCodePage from "./pages/QrCodePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/card/:slug" element={<BusinessCard />} />
                <Route path="/qr/:slug" element={<QrCodePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;