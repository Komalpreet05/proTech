import React from 'react';
import { BookOpen, BarChart2, Users } from 'lucide-react';
import axios from 'axios';

const AboutUs = () => {
  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-green-500" />,
      title: "Smart Observations",
      description: "Easily capture and organize student observations with AI-powered suggestions"
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-green-500" />,
      title: "Insightful Reports",
      description: "Generate real-time progress reports and identify learning trends effortlessly"
    },
    {
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Keep Parents Informed",
      description: "Seamless communication with automated updates and personalized feedback for parents"
    }
  ];
  const team=[

    {
        image: "https://media.licdn.com/dms/image/v2/D4E03AQET2OUgCc8EAA/profile-displayphoto-shrink_800_800/B4EZSuiGXFHgAc-/0/1738094962813?e=1744848000&v=beta&t=ZjSF8tOyhcNFPuyUWYVduCs7x814Ug23fJ0BF84KUhU",
        name: "Raj Panjabi",
        position: "SDE"
        },
        {
        image: "https://via.placeholder.com/300/300",
        name: "Andrey",
        position: "PM"
        },
        {
        image: "https://via.placeholder.com/300/300",
        name: "Nauz",
        position: "UI/UX"
    },
    {
        image: "https://via.placeholder.com/300/300",
        name: "Monika",
        position: "SDE"
    },  
    {   
        image: "https://via.placeholder.com/300/300",
        name: "Joe",
        position: "Ui/UX"
    }
  ]

  const getteacher = async () => {  
    const response=await axios.get("https://backend-1jpvtqokv-rajpanjabis-projects.vercel.app/api/teachers/")
    console.log(response)}


  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="relative text-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl text-gray-900 font-bold mb-4">
              Simplifying Observations, Enhancing Learning
            </h1>
            <p className="text-xl text-gray-900 max-w-3xl mx-auto">
              Our platform helps teachers save time, track student progress efficiently, and communicate insights seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-8">
              At TeachSpace, we're dedicated to empowering educators with innovative tools that streamline their workflow and enhance student learning outcomes. Our platform combines cutting-edge technology with educational expertise to create a seamless experience for teachers, students, and parents alike.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600">
              A dedicated group of educators and technologists working to transform education
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={member.image}
                  alt="Team member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2"> {member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about TeachSpace? We'd love to hear from you.
          </p>
          <button onClick={getteacher} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition-all">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;