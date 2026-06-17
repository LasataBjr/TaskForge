//MainLayout.jsx keeps the Sidebar and Navbar statically mounted on the screen

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <BrowserRouter>      
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;