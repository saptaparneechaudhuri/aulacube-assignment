import "./home.css";

import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <section className="home-page-container">
      <div className="todo-container">
        <div className="todo-wrapper">
          <h1 className="title">task list</h1>
        </div>

        <Outlet />
      </div>
    </section>
  );
};

export default Home;
