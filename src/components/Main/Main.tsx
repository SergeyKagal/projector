import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../../provider/provider';
import { Header } from '../Header/Header';
import { PATH } from '../../constants/paths';

const Main = () => {
  const { userState} = useContext(GlobalContext);
  
  if (!userState.isUserSignIn) {
    return <Navigate to={PATH.BASE_URL} />;
  } 
  
  return (
    <>
      <Header></Header>
      <div className="main">This is a main route</div>;
    </>
  );
};

export default Main;
