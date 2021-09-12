import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
// import ChangePass from "../ChangePass/ChangePass";
import NotFound from "../Views/Common/NotFound/NotFound";
// import CreatePartner from "../Dashboard/Container/FormArea/CreatePartner/CreatePartner";
// import CreateSample from "../Dashboard/Container/FormArea/CreateSample/CreateSample";
// import RequestKits from "../Dashboard/Container/FormArea/RequestKits/RequestKits";
import Home from "../Views/Dashboard/Container/FormArea/Home/Home";
// import PartnerDetail from "../Dashboard/Container/FormArea/Partners/PartnerDetail/PartnerDetail";
// import Partners from "../Dashboard/Container/FormArea/Partners/Partners";
// import Samples from "../Dashboard/Container/FormArea/Samples/Samples";
// import ViewSample from "../Dashboard/Container/FormArea/Samples/ViewSample/ViewSample";
// import Settings from "../Dashboard/Container/FormArea/Settings/Settings";
// import CreateShipment from "../Dashboard/Container/FormArea/Shipments/CreateShipment";
// import Shipments from "../Dashboard/Container/FormArea/Shipments/Shipments";
// import AllKits from "../Dashboard/Container/FormArea/RequestedKits/AllKits";
import Sidebar from "../Views/Dashboard/Container/Sidebar/Sidebar";
import Navbar from "../Views/Dashboard/Navbar/Navbar";
import Login from "../Views/Login/Login";
// import UploadImages from "../Dashboard/Container/FormArea/UploadImages/UploadImages";
// import ResetEmailConfirm from "../ResetEmailConfirm/ResetEmailConfirm";

//Higher Order Components
const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

const Dashboard = ({ routes }) => {
  const [isSideOpen, setIsSideOpen] = useState(true);
  const {
    isAuthenticated: isAuth,
    user: { role },
  } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className="dashboard">
      <Navbar setIsSideOpen={setIsSideOpen} />
      <div className="container">
        <Sidebar isSideOpen={isSideOpen} routes={routes} />
        <div className="formArea">
          <Switch>
            {routes.map((route, i) => {
              return <RouteWithSubRoutes key={i} {...route} />;
            })}
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={i} {...route} />;
      })}
      <Route component={NotFound} />
    </Switch>
  );
};

//Routing Logic

const ROUTES = [
  {
    path: "/",
    key: "login",
    component: RenderRoutes,
    routes: [
      {
        path: "/",
        exact: true,
        component: () => <Login text="User" />,
      },
      {
        path: "/login",
        exact: true,
        component: () => <Login text="User" />,
      },
      {
        path: "/admin",
        key: "ADMIN",
        component: Dashboard,
        routes: [
          {
            path: "/admin",
            exact: true,
            component: () => <Home title="Admin" />,
            icon: "fas fa-home",
            title: "Home",
          }
          
        ],
      },
      ]
     
  }
];

export default ROUTES;
export { RouteWithSubRoutes };
