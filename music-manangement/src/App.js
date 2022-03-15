import { BrowserRouter as Router , Route } from 'react-router-dom';
import AudioPlayer from './components/Pages/AudioPlayer';
import NavBar from './components/Navbar';
import AddSong from './components/Pages/AddSong'
import "antd/dist/antd.css";
import "./stlye/App.css"
import { Switch } from 'react-router-dom';
    function App() {
  return (
    <div className='wrapper d-flex' >
      <Router>
        <div style={{width:'100%', padding:'0 0'}} className='col-lg-2'>
          <NavBar />
        </div>
          <Switch className='col-lg-10' >
              <Route exact path='/' render={() => <AudioPlayer />}/>
              <Route exact path='/add' render={() => <AddSong />}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
