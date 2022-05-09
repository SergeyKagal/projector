import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Board } from '../board/board';
import { ErrorPage } from '../error-page/error-page';
import { Main } from '../main/main';
import { SignIn } from '../signin/signin';
import { SignUp } from '../signup/signup';
import { Welcome } from '../welcome/welcome';

export const Store: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main" element={<Main />} />
          <Route path="/board" element={<Board />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
