import './App.css';
import './app.scss';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

function App() {
  // let user = signIn({
  //   "login": "raya",
  //   "password": "raya"
  // })

  // console.log(user)

  
  return (
    <div className="App">
      <header className="App-header">
        <SignIn/>
        <SignUp/>
      </header>
    </div>
  );
}

export default App;
