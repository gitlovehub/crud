import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <div>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default LayoutPage;
