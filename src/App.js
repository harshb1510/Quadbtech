import './App.css';
import Shows from './Pages/Shows/Shows';
import { Routes,Route,BrowserRouter as Router } from 'react-router-dom';
import Show from './Pages/Shows/Show';

function App() {
  return (
    <div className="App">
      <Router>

      <Routes>
        <Route path='/' element={<Shows />} />
        <Route path='/show/:id' element={<Show />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
