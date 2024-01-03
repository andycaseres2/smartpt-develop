import Sidebar from "./components/Sidebar/Sidebar";
import Router from "./router/Router";
import { userStore } from "./store/userStore";

function App() {
  const { user } = userStore((state) => state);
  return (
    <main className="min-h-screen flex w-full">
      {user && <Sidebar />}
      <Router />
    </main>
  );
}

export default App;
