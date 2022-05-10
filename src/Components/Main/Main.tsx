import axios from 'axios';
import { Header } from '../Header/Header';
import { API_URL } from '../../constants/paths';

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
