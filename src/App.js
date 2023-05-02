import { Route, HashRouter as Router, Routes, Switch } from 'react-router-dom';
import './assets/scss/global.scss'
import { Home } from './views/Home';
import { About } from './views/About';
import { RecipeIndex } from './views/RecipeIndex';
import { AppHeader } from './cmps/AppHeader';

function App() {
  return (
    <Router>
        <section className="main-app">
            <AppHeader />

            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipe" element={<RecipeIndex />} />
                    {/* <Route path="/robot/edit/:id?" element={<RobotEdit />} /> */}
                    {/* <Route path="/robot/:id" element={<RobotDetails />} /> */}
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>

            {/* <footer>
                <section className="container">
                    cookRights 2022 &copy;
                </section>
            </footer> */}

        </section>
    </Router>
)
}

export default App;
