import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This is where child routes will be injected */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
