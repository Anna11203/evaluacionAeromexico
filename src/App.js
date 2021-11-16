import './App.css';
import Home from './Home';
import { Provider } from 'react-redux';
import store from './storage/storage';
import './style/style.scss';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
