// interface MainProps {
//   token: string;
// }

import { Header } from '../header/header';
import { API_URL } from '../../constants/paths';
import axios from 'axios';

interface BoardsType {
  id: string;
  title: string;
}

const Main = () => {
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NjVjNzZkYi1jOGIyLTQ0MTEtYjM3ZC1hMDVlMjdiYWRkYzQiLCJsb2dpbiI6ImxlbmEiLCJpYXQiOjE2NTIxOTE4Mzd9.ehPRep4STIG99CZbZnxbbzFf2DWCIk7BU5UbOpxD8Lw';

  // let boardsArray: BoardsType[] = [];

  // const getBoards = async () => {
  //   const response = await axios.get(`${API_URL}/boards`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       Accept: `application/json`,
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   boardsArray = response.data;
  // };

  // getBoards();
  const boardsArray = [
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
      title: 'Homework tasks',
    },
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d6',
      title: 'Homework tasks',
    },
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d7',
      title: 'Homework tasks',
    },
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d8',
      title: 'Homework tasks',
    },
  ];

  const boards = boardsArray.map((board) => {
    return <div key={board.id}>{board.title}</div>;
  });

  return (
    <>
      <Header></Header>
      <div className="main">{boards}</div>;
    </>
  );
};

export default Main;
