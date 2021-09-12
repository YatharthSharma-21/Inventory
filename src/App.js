import logo from './logo.svg';
import './App.css';
import RenderRoutes from "./Routes/Helpers/RenderRoutes";
import ROUTES from "./Routes/routes";
import { HashRouter as Router } from "react-router-dom";
import Login from "./Views/Login/Login"
function App() {
  return (
    <div className="app">
    <Router>
      <RenderRoutes routes={ROUTES} />
    </Router>
    {/* <Login></Login> */}
    {/* <AppRouter /> */}
  </div>
  );
}

export default App;
