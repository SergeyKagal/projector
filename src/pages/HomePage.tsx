import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <header className="header" data-testid="header">
        <Link to="/auth">Login / SignUp</Link>
      </header>
      <div>Homepage!</div>
    </>
  );
};

export default HomePage;
