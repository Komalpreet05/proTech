
import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer";
import heroIllustration from "../../assets/hero-illustration.svg";
// import observation from "../../assets/observation.png";
// import reports from "../../assets/reports.png";
// import group from "../../assets/group.png";
// import logo from "../../asset/s/logo.png";

import "./LandingPage.css";
import Typewriter from "typewriter-effect";
import { ArrowRight, Quote, School } from "lucide-react";
import { Sparkles, ClipboardCheck, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
// import SchoolLogosMarquee from "../../components/schoolLogoMarquee/schoolLogoMarquee";

const LandingPage = () => {

  const teacherName=localStorage.getItem("teacherName");
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
     
        <div className="hero-section flex items-center justify-between bg-secondary min-h-[70vh] px-8 md:px-16 lg:px-24">
          <section className="flex-1 max-w-2xl py-16 lg:py-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Effortlessly Track & Share{" "}
              {/* <span className="text-green-500">Student Progress</span> */}
              <span className="text-green-500 pt-4 block">
                <Typewriter
                  options={{
                    strings: [
                      "Student Progress",
                      "Learning Goals",
                      "Class Performance",
                      "Teacher Feedback",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 30,
                    delay: 80,
                    cursor: "|",
                    wrapperClassName: "typewriter-text",
                    cursorClassName: "typewriter-cursor",
                  }}
                />
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl">
              Save time on observations and focus on what matters—helping
              students grow!
            </p>
           

            <button className="mt-8 px-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2 group">
              <Link to={teacherName ? `/dashboard/${teacherName}` : "/login"}>Get Started</Link>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </section>

          <section className="flex-1 hero-illustration hidden md:block">
            <img
              src={heroIllustration}
              alt="Hero Illustration"
              className="w-full h-auto max-w-xl mx-auto float-animation animate-[slideIn_1s_ease-in]"
              onError={(e) => {
                e.target.onerror = null;
                console.error("Failed to load hero illustration");
              }}
            />
          </section>
        </div>
        

        <section className="py-16 px-6 services ">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Simplifying Observations, Enhancing Learning
          </h2>
          <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto italic ">
            &quot;Our platform helps teachers save time, track student progress
            efficiently, and communicate insights seamlessly&quot;
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-16 px-10 md:px-28  ">
            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white">
              <div className="flex flex-col items-center">
               
                <div className="p-3 bg-green-50 rounded-full mb-6">
                  <Sparkles className="w-8 h-8 text-green-500" />
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  Smart Observations
                </h3>
                <p className="text-gray-600 text-center">
                  Easily capture and organize student observations with
                  AI-powered suggestions
                </p>
              </div>
            </div>

            <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-green-50 rounded-full mb-6">
                  <ClipboardCheck className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Insightful Reports
                </h3>
                <p className="text-gray-600 text-center">
                  Generate real-time progress reports and identify learning
                  trends effortlessly
                </p>
              </div>
            </div>

            <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-green-50 rounded-full mb-6">
                  <Share2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Keep Parents Informed
                </h3>
                <p className="text-gray-600 text-center">
                  Seamless communication with automated updates and personalized
                  feedback for parents
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-secondary py-20 flex justify-center text-center">
          <div className="container mx-auto text-center ">
            {/* Left side - Content */}
            <div className="md:w-full mb-10 md:mb-0 ">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Need Help Tracking Student Progress?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                Request a demo to see how we can help you save time on
                observations, track student progress efficiently, and
                communicate insights seamlessly.
              </p>
              <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 mx-auto">
                <span>Request Demo</span>
              </button>
            </div>
          </div>
        </section>

     
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
