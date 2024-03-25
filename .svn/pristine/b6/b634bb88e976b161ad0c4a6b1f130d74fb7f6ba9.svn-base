import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Router from "./router/Router";
import { userStore } from "./store/userStore";
import { getColor } from "./utils/getColor";
import { useLocation } from "react-router-dom";
import { applyScrollbarStyles } from "./utils/applyScrollbarStyles";

function App() {
  const { user } = userStore();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const colorInfo = getColor(currentPath).hex;
    applyScrollbarStyles(colorInfo);
  }, [currentPath]);

  return (
    <main className="min-h-screen flex">
      {!!user.length && <Sidebar />}
      <div className="flex-1 overflow-hidden">
        <Router />
      </div>
    </main>
  );
}

export default App;
