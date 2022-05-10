// interface MainProps {
//   token: string;
// }

import { Header } from '../header/header';
import { API_URL } from '../../constants/paths';
import axios from 'axios';

const Main = () => {
  const getBoards = async () => {
    await axios.post(`${API_URL}/boards`).then((res) => {
      if (res.data) {
        console.log(res.data);
      }
      return res.data;
    });
  };

  getBoards();

  return (
    <>
      <Header></Header>
      <div className="main">This is a main route</div>;
    </>
  );
};

export default Main;
