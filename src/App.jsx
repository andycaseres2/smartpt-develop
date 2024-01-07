import Sidebar from "./components/Sidebar/Sidebar";
import Router from "./router/Router";
import { userStore } from "./store/userStore";

function App() {
  const { user } = userStore();
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
