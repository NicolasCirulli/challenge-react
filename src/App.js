import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Leaderboard from './pages/Leaderboard/Leaderboard.js'
import Schedule from './pages/Schedule/Schedule.js'
import NotFound from './pages/NotFound/NotFound.js'
import style from "./App.module.css";

import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";

function App() {
  return (
    <div className={style.layout}>
      <BrowserRouter>
        <Navbar/>
        <main className={style.main}>
          <Switch>
            <Route exact path="/"><Schedule /></Route>
            <Route path="/schedule" > <Schedule /> </Route>
            <Route path="/leaderboard" > <Leaderboard /> </Route>
            <Route path="*" > <NotFound /> </Route>
          </Switch>
        </main>
        <Footer/>
      </BrowserRouter>
    </div>

  );
}

export default App;
