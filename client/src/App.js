import React, { useContext } from "react";
import { Switch, Route, __RouterContext } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Container from "react-bootstrap/Container";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import "./App.css";

function App() {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(100%,0" },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%, 0" }
  });
  return (
    <div className="App d-flex flex-column">
      <header className="App-header">
        <AppNavbar />
      </header>
      <main className="my-5 flex-grow-1">
        <Container>
          {transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
              <Switch location={item}>
                <Route path="/update/:id" component={AddProject} />
                <Route path="/add-project" component={AddProject} />
                <Route path="/projects/:id" component={Home} />
                <Route exact path="/" component={Home} />
              </Switch>
            </animated.div>
          ))}
        </Container>
      </main>
    </div>
  );
}

export default App;
