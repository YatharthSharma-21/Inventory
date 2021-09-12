import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "notiflix";

// Custom Components
import Container from "./Container/Container";
import Navbar from "./Navbar/Navbar";
import { loadUser } from "../../redux/actions/authAction";
import Sidebar from "./Container/Sidebar/Sidebar";

import "./Dashboard.css";
import FormRouter from "../Routers/FormRouter";

import CreatePartner from "./Container/FormArea/CreatePartner/CreatePartner";
import CreateSample from "./Container/FormArea/CreateSample/CreateSample";
import PartnerDetail from "./Container/FormArea/Partners/PartnerDetail/PartnerDetail";
import Partners from "./Container/FormArea/Partners/Partners";
import Settings from "./Container/FormArea/Settings/Settings";
import { Route, useHistory } from "react-router-dom";
import RenderRoutes from "../Routers/Helpers/RenderRoutes";

const Dashboard = ({ routes }) => {
  const [isSideOpen, setIsSideOpen] = useState(true);

  const loading = useSelector((state) => state.loading.isLoading);

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="dashboard">
      <Navbar setIsSideOpen={setIsSideOpen} />
      <div className="container">
        <Sidebar isSideOpen={isSideOpen} />
        <div className="formArea">
          <RenderRoutes routes={routes} />
          {/* <Route exact path="/partners" component={Partners} />
          <Route exact path="/partner/:id" component={PartnerDetail} />
          <Route
            exact
            path="/partners/add"
            component={() => <CreatePartner heading="Create New Partner" />}
          />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/sample/create" component={CreateSample} /> */}
        </div>
      </div>

      {/* <Container isSideOpen={isSideOpen} /> */}
    </div>
  );
};

export default Dashboard;
