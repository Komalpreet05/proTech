
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import kid1 from "../assets/kid1.jpg";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [observations, setObservations] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [metric, setMetric] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { teacherName } = useParams();

  const metrics = [
    "Academic Progress",
    "Behavior",
    "Social Skills",
    "Participation",
    "Homework Completion",
    "Communication Skills"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(
          `http://localhost:4000/api/students/getStudents/${teacherName}`
        );
        setStudents(studentResponse.data);

        const subjectResponse = await axios.get(
          `http://localhost:4000/api/subjects/getAllSubjects/${teacherName}`
        );
        setSubjects(subjectResponse.data.subjects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [teacherName]);

  const handleSaveObservation = async () => {
    if (!selectedStudent || !selectedSubject || !observations || !metric) {
      alert("Please fill all fields before saving the observation.");
      return;
    }

    setIsSubmitting(true);
    const data = {
      student: selectedStudent,
      teacher: teacherName,
      subject: selectedSubject,
      metric,
      observationText: observations,
    };

    try {
      await axios.post(
        "http://localhost:4000/api/observations/addObservation",
        data
      );
      alert("Observation saved successfully!");
      // Clear form
      setObservations("");
      setMetric("");
      setSelectedSubject("");
    } catch (error) {
      console.error("Error saving observation:", error);
      alert("Failed to save observation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Teacher Dashboard
          </h1>

          {/* Student Carousel with improved styling */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Students
            </h2>
            <div className="flex overflow-x-auto space-x-6 pb-4 pt-4">
              {students.map((student) => (
                <div
                  key={student._id}
                  className={`flex-shrink-0 w-40 group cursor-pointer transform transition-transform hover:scale-105 ${
                    selectedStudent === student.name ? "ring-2 ring-blue-500 rounded-xl" : ""
                  }`}
                  onClick={() => setSelectedStudent(student.name)}
                >
                  <div className="relative">
                    <img
                      src={student.picture || kid1}
                      alt={student.name}
                      className="w-40 h-40 rounded-xl object-cover shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-semibold text-gray-800">{student.name}</h3>
                    <Link
                      to={`/studentprofile/${student.name}`}
                      className="text-blue-500 hover:text-blue-600 text-sm inline-block mt-1"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observation Form */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Observation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Select a student above or type name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metric
                </label>
                <select
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a Metric</option>
                  {metrics.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observation
                </label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                  placeholder="Write your detailed observation here..."
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSaveObservation}
                disabled={isSubmitting}
                className={`w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors
                  ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Saving..." : "Save Observation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;











// // before latest
// import { useState, useEffect } from "react";
// import axios from "axios";
// import kid1 from "../assets/kid1.jpg";
// import { useParams, Link } from "react-router-dom";

// const Dashboard = () => {
//   const [students, setStudents] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [observations, setObservations] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState("");
//   const { teacherName } = useParams();

//   // Fetch students and subjects when the component loads
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch students
//         const studentResponse = await axios.get(
//           `http://localhost:4000/api/students/getStudents/${teacherName}`
//         );
//         setStudents(studentResponse.data);

//         // Fetch subjects
//         const subjectResponse = await axios.get(
//           `http://localhost:4000/api/subjects/getAllSubjects/${teacherName}`
//         );
//         setSubjects(subjectResponse.data.subjects); // Assuming subjects are returned as an array
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [teacherName]);

//   // Save observation
//   const handleSaveObservation = async () => {
//     if (!selectedStudent || !selectedSubject || !observations) {
//       alert("Please fill all fields before saving the observation.");
//       return;
//     }
  
//     const data = {
//       student: selectedStudent,
//       teacher: teacherName,
//       subject: selectedSubject,
//       metric: "Behavior", // Replace this with your metric or make it dynamic if needed
//       observationText: observations,
//     };
  
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/observations/addObservation",
//         data
//       );
//       alert("Observation saved successfully!");
//       console.log(response.data); // Optional: log the success response
//     } catch (error) {
//       console.error("Error saving observation:", error);
//       alert("Failed to save observation. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

//       {/* Student Carousel */}
//       <div className="mb-6">
//         <div className="flex overflow-x-auto space-x-6 animate-marquee">
//           {students.map((student) => (
//             <div
//               key={student._id}
//               className="flex-shrink-0 w-32 h-32 text-center cursor-pointer"
//               onClick={() => setSelectedStudent(student.name)} // Set student name on click
//             >
//               <img
//                 src={student.picture || kid1}
//                 alt={student.name}
//                 className="w-full h-full rounded-full object-cover"
//               />
//               <div className="mt-2 text-sm font-semibold">{student.name}</div>
//               <Link to={`/studentprofile/${student.name}`} className="text-blue-500 mt-2 text-sm">
//                 View Profile
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Subject Selection */}
//       <div className="mb-6">
//         <label htmlFor="subject" className="block mb-2 text-lg font-medium">
//           Select Subject
//         </label>
//         <select
//           id="subject"
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//           className="p-2 border border-gray-300 rounded w-full"
//         >
//           <option value="">Select a Subject</option>
//           {subjects.map((subject) => (
//             <option key={subject._id} value={subject.name}>
//               {subject.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Metrics and Observation */}
//       <div className="mb-6">
//         <label htmlFor="studentName" className="block mb-2 text-lg font-medium">
//           Student Name
//         </label>
//         <input
//           id="studentName"
//           type="text"
//           value={selectedStudent}
//           onChange={(e) => setSelectedStudent(e.target.value)}
//           placeholder="Enter Student's Name"
//           className="p-2 border border-gray-300 rounded mb-4 w-full"
//         />

//         <label htmlFor="observation" className="block mb-2 text-lg font-medium">
//           Observation
//         </label>
//         <textarea
//           id="observation"
//           value={observations}
//           onChange={(e) => setObservations(e.target.value)}
//           placeholder="Write your observation here..."
//           className="p-2 border border-gray-300 rounded mb-4 w-full"
//         />

//         <button
//           onClick={handleSaveObservation}
//           className="bg-blue-500 text-white p-2 rounded w-full"
//         >
//           Save Observation
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import kid1 from "../assets/kid1.jpg";
// // import { useParams } from 'react-router-dom';
// // // import { useLocation } from 'react-router-dom';

// // const Dashboard = () => {
// //   const [students, setStudents] = useState([]);
// //   const [selectedSubject, setSelectedSubject] = useState('');
// //   const [observations, setObservations] = useState('');
// //   const [selectedStudent, setSelectedStudent] = useState('');
// //   // Extract teacherName from URL
// //   // const location = useLocation();
// //   // const queryParams = new URLSearchParams(location.search);
// //   // const teacherName = queryParams.get('teacherName'); // Extract teacherName
// //   const { teacherName } = useParams();
 

// //   useEffect(() => {
// //     const fetchStudents = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:4000/api/students/getStudents/${teacherName}`);
// //         setStudents(response.data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchStudents();
// //   }, [teacherName]);

// //   const handleSaveObservation = () => {
// //     console.log(`Saving observation for ${selectedStudent}: ${observations}`);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      
// //       {/* Student Carousel */}
// //       <div className="mb-6">
// //         <div className="flex overflow-x-auto space-x-6 animate-marquee">
// //           {students.map(student => (
// //             <div key={student._id} className="flex-shrink-0 w-32 h-32 text-center">
// //               <img
// //                 src={student.picture || kid1} 
// //                 alt={student.name}
// //                 className="w-full h-full rounded-full object-cover"
// //               />
// //               <div className="mt-2 text-sm">{student.name}</div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Subject Selection */}
// //       <div className="mb-6">
// //         <label htmlFor="subject" className="block mb-2">Select Subject</label>
// //         <select
// //           id="subject"
// //           value={selectedSubject}
// //           onChange={(e) => setSelectedSubject(e.target.value)}
// //           className="p-2 border border-gray-300 rounded"
// //         >
// //           <option value="">Select a Subject</option>
// //           <option value="Math">Math</option>
// //           <option value="Science">Science</option>
// //           <option value="History">History</option>
// //         </select>
// //       </div>

// //       {/* Metrics and Observation */}
// //       <div className="mb-6">
// //         <label htmlFor="studentName" className="block mb-2">Student Name</label>
// //         <input
// //           id="studentName"
// //           type="text"
// //           value={selectedStudent}
// //           onChange={(e) => setSelectedStudent(e.target.value)}
// //           placeholder="Enter Student's Name"
// //           className="p-2 border border-gray-300 rounded mb-4 w-full"
// //         />
        
// //         <label htmlFor="observation" className="block mb-2">Observation</label>
// //         <textarea
// //           id="observation"
// //           value={observations}
// //           onChange={(e) => setObservations(e.target.value)}
// //           placeholder="Write your observation here..."
// //           className="p-2 border border-gray-300 rounded mb-4 w-full"
// //         />

// //         <button
// //           onClick={handleSaveObservation}
// //           className="bg-blue-500 text-white p-2 rounded"
// //         >
// //           Save Observation
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;