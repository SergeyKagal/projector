interface MainProps {
  token: string;
}

const Main = ({ token }: MainProps) => {
  return <div className="main">This is a main route for {token}</div>;
};

export default Main;
