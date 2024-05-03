
import { Route, Switch } from "react-router-dom";
import {Container} from 'react-bootstrap';
import userContext from "./context/Context";
import { useState } from "react";
import LoginView from "./userComponent/LoginView";
import Top from "./commonComponent/Top";
import Main from "./commonComponent/Main";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListProduct from "./productComponent/ListProduct";

function App() {
  console.log("App");

  const [logon, setLogon] = useState({ user: null});
  const setChangeLogon = (value) => {
    console.log(value);
    setLogon({ user: value });
  };
  const content = { ...logon, changeLogon: setChangeLogon };
  console.log(content);
  console.log("user : "+sessionStorage.getItem("user"));
  console.log("active : "+sessionStorage.getItem("active"));

  return (
    <div className="ViewGood">
      <userContext.Provider value={logon}>
        <Route path="/">
          <Container>
            <Top />
          </Container>
        </Route>
        <br />
        <Switch>

          <Route path="/" exact>
            <Main />
          </Route>

          <Route path="/user/react/login">
            <userContext.Provider value={content}>
              <LoginView />
            </userContext.Provider>
          </Route>

          <Route path="/productRest/react/listProduct" exact>
          <userContext.Provider value={'search'}>
            <ListProduct />
            </userContext.Provider>
          </Route>

          <Route path="/productRest/react/listProduct/manage" exact>
          <userContext.Provider value={'manage'}>
            <ListProduct />
            </userContext.Provider>
          </Route>
          
        </Switch>
      </userContext.Provider>
    </div>
  );
}

export default App;
