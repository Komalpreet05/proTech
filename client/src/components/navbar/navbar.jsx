// import { Link, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import logo from "../../assets/logo.svg";
// import "./navbar.css";
// import { UserCircle } from "lucide-react";

// const Navbar = ({ user }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [teacherName, setTeacherName] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedTeacherName = localStorage.getItem("teacherName");
//     if (storedTeacherName) {
//       setIsAuthenticated(true);
//       setTeacherName(storedTeacherName);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   const handleLogout = async () => {
//     try {
//       setIsAuthenticated(false);
//       setTeacherName(null);
//       localStorage.removeItem("teacherName");
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-secondary p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-primary text-xl font-bold">
//           <Link to={ "/"}>
//             <img src={logo} alt="Logo" />
//           </Link>
//         </div>

//         <div className="hidden md:flex space-x-10">
//           {!isAuthenticated ? ( // If user is not authenticated}
//             <div className="space-x-10">
//               <Link to="/" className="custom-link active-link font-semibold">
//                 Home
//               </Link>
//               <Link to="/services" className="custom-link">
//                 Services
//               </Link>
//               <Link to="/features" className="custom-link">
//                 Features
//               </Link>
//               <Link to="/testimonials" className="custom-link">
//                 Testimonials
//               </Link>
//               <Link to="/faq" className="custom-link">
//                 FAQ
//               </Link>
//             </div>
//           ) : (
//             <Link
//               to={`/dashboard/${teacherName}`}
//               className="custom-link  font-semibold"
//             >
//               Dashboard
//             </Link>
//           )}
//         </div>

//         <div className="flex items-center space-x-4">
//           {!isAuthenticated ? (
//             <div className="flex md:space-x-5">
//               <Link to="/login">
//                 <button className="py-[0.2rem] px-3 rounded-md bg-transparent border border-secondary text-primary md:text-[1rem]">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/login">
//                 <button className="text-white py-[0.2rem] px-3 rounded-md bg-primary md:text-sm">
//                   Sign Up
//                 </button>
//               </Link>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-2">
//               {user?.avatar ? (
//                 <img
//                   src={user.avatar}
//                   alt="User Avatar"
//                   className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
//                 />
//               ) : (
//                 <UserCircle className="w-8 h-8 text-primary/90" />
//               )}
//               <span className="text-primary">{teacherName}</span>
//             </div>
//           )}
//         </div>

//         <div className="md:hidden flex items-center">
//           <button onClick={toggleMenu} className="text-primary">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="#4CAF4F"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {isMenuOpen && (
//         <div className="md:hidden bg-gray-800 text-white space-y-4 p-4">
//           <Link to="/" className="block hover:text-gray-400">
//             Home
//           </Link>
//           <Link to="/about" className="block hover:text-gray-400">
//             About
//           </Link>
//           <Link to="/services" className="block hover:text-gray-400">
//             Services
//           </Link>
//           <Link to="/contact" className="block hover:text-gray-400">
//             Contact
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import "./navbar.css";
import { UserCircle } from "lucide-react";

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teacherName, setTeacherName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTeacherName = localStorage.getItem("teacherName");
    if (storedTeacherName) {
      setIsAuthenticated(true);
      setTeacherName(storedTeacherName);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      setIsAuthenticated(false);
      setTeacherName(null);
      localStorage.removeItem("teacherName");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-secondary p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-primary text-xl font-bold">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-10">
          <Link to="/" className="custom-link active-link font-semibold">
            Home
          </Link>
          <Link to="/services" className="custom-link">
            Services
          </Link>
          <Link to="/features" className="custom-link">
            Features
          </Link>
          <Link to="/testimonials" className="custom-link">
            Testimonials
          </Link>
          <Link to="/faq" className="custom-link">
            FAQ
          </Link>
          <Link
              to={`/dashboard/${teacherName}`}
              className="custom-link"
            >
              Dashboard
            </Link>
          
        </div>

        {/* Authentication Section */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <div className="flex md:space-x-5">
              <Link to="/login">
                <button className="py-[0.2rem] px-3 rounded-md bg-transparent border border-secondary text-primary md:text-[1rem]">
                  Login
                </button>
              </Link>
              <Link to="/login">
                <button className="text-white py-[0.2rem] px-3 rounded-md bg-primary md:text-sm">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                />
              ) : (
                <UserCircle className="w-8 h-8 text-primary/90" />
              )}
              <span className="text-primary">{teacherName}</span>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="py-[0.2rem] px-3 rounded-md bg-red-500 text-white md:text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="#4CAF4F"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white space-y-4 p-4">
          <Link to="/" className="block hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="block hover:text-gray-400">
            About
          </Link>
          <Link to="/services" className="block hover:text-gray-400">
            Services
          </Link>
          <Link to="/contact" className="block hover:text-gray-400">
            Contact
          </Link>
          <Link to="/dashboard" className="block hover:text-gray-400">
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;