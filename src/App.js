import React from "react";
import { Switch, Route } from "react-router-dom";
import AbsensiPages from "./pages/AbsensiPages";
import LoginPages from "./pages/LoginPages";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPages} exact />
        <Route path="/" component={AbsensiPages} exact />
      </Switch>
    </div>
  );
}

export default App;
