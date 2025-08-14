import './App.css';
import { Account } from './components/Account/Acoount';
import { FetchPostListView } from './components/PostListView';

function App() {
  return (
    <div className='app'>
      <Account />

      <FetchPostListView />
    </div>
  );
}

export default App;
