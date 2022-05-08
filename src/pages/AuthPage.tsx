import { Link } from 'react-router-dom';

import SignIn from '../Components/SignIn/SignIn';
import SignUp from '../Components/SignUp/SignUp';



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
