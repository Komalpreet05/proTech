import Card from "../components/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();


  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleGoogleSignIn = () => {
    // After successful Google authentication
    navigate("/dashboard"); // Redirect to the dashboard
  };

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;
    const subjects = [];
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL+"/api/teachers/register",
        { name, email, password, subjects },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("response", response);
        const teacherName = response.data.teacher.name; // Assuming the backend returns the teacher's name
        console.log(response.data);
        console.log(teacherName);
        // Store teacherName in localStorage
        localStorage.setItem("teacherName", teacherName);

        navigate(`/dashboard/${name}`);
      } else {
        console.error("Sign-up failed");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  // Handle sign-in form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL+"/api/teachers/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 200) {
        console.log("response", response);
        const teacherName = response.data.teacher.name; // Assuming the backend returns the teacher's name
        console.log(response.data);
        console.log(teacherName);
        // Store teacherName in localStorage
        localStorage.setItem("teacherName", teacherName);

        // Navigate to the dashboard with teacherName in the URL
        navigate(`/dashboard/${teacherName}`);
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      alert("Invalid email or password");
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <Card>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {isSignUp && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-500 transition-all"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <div className="text-center mt-6">
            <a href="http://localhost:4000/auth/google">
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-all w-full">
                Sign in with Google
              </button>
            </a>
          </div>
          <p className="mt-4 text-center text-gray-600">
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={toggleSignUp}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </Card>
      </div>
    </>
  );
};

export default Login;






// //           {isSignUp
// //             ? "Already have an account?"
// //             : "Don't have an account?"}{" "}
// //           <span
// //             className="text-blue-600 cursor-pointer hover:underline"
// //             onClick={toggleSignUp}
// //           >
// //             {isSignUp ? "Sign In" : "Sign Up"}
// //           </span>
// //         </p>
       
// //       </Card>



// //       </div>
// //      </>
// //     );
// //   };
  
// //   export default Login;