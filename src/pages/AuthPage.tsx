import { Link } from 'react-router-dom';

import SignIn from '../components/SignIn/SignIn';
import SignUp from '../components/SignUp/SignUp';



const AuthPage = () => {
  return (
    <>
      {/* <button onClick={()=> notify('fg')}>Notify!</button> */}
      <Link to="/"> Back home</Link>
      <SignIn />
      <SignUp />

    </>
  );
};

export default AuthPage;
