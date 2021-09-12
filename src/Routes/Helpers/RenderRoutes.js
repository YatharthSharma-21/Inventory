import { Route, Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "../routes";

const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
};

export default RenderRoutes;
