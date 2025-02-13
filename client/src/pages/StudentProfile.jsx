import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import kid1 from "../assets/kid1.jpg";
import { useParams, Link } from "react-router-dom";
import cohere from "cohere-ai";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [observations, setObservations] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { studentName } = useParams();

  const metrics = [
    "Academic Progress",
    "Behavior",
    "Social Skills",
    "Participation",
    "Homework Completion",
    "Communication Skills",
  ];

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL+`/api/students/studentprofile/${studentName}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch student profile: ${response.statusText}`);
        }

        const data = await response.json();
        
        setStudent(data.student);
        setObservations(data.observations);
        console.log(data)

        // Temporary performance data (replace with actual data when available)
        setPerformanceData([
          { week: 'Week 1', score: 85 },
          { week: 'Week 2', score: 88 },
          { week: 'Week 3', score: 92 },
          { week: 'Week 4', score: 90 }
        ]);
      } catch (err) {
        setError(err.message || "Failed to load student profile. Please try again later.");
        console.error("Error fetching student profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (studentName) {
      fetchStudentProfile();
    }
  }, [studentName]);


  const generateReport = async () => {
    if (!observations.length) {
      alert("No observations available to generate report.");
      return;
    }
  
    setIsGeneratingReport(true);
    try {
      const prompt = observations
        .map(obs => `Metric: ${obs.metric}\nObservation: ${obs.observationText}`)
        .join("\n\n");
  
      console.log("Formatted Prompt:", prompt);
  
      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-r-plus",
          prompt: `Generate a comprehensive student report summarizing the following observations and highlighting key metrics:\n\n${prompt}\n\nProvide specific insights and recommendations.`,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
      console.log("Cohere API Response:", data);
  
      if (data?.generations?.[0]?.text) {
        setReport(data.generations[0].text);
        alert("Report generated successfully!");
      } else {
        throw new Error("Invalid response from Cohere API");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleSendEmail = async () => {
    try {
      // Implement email sending functionality
      alert("Email feature coming soon!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold">Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src={student?.picture || kid1}
              alt={student?.name || "Student Picture"}
              className="w-32 h-32 rounded-full shadow-lg border-4 border-white object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{student?.name || "N/A"}</h1>
          <p className="text-gray-600">Grade {student?.grade || "N/A"}</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Observations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Teacher Observations</h2>
        <div className="space-y-4">
          {observations.length > 0 ? (
            observations.map((observation, index) => (
              <div 
                key={observation._id || index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <h3 className="font-semibold text-gray-700 mb-2">{observation.metric}</h3>
                <p className="text-gray-600">{observation.observationText}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-4">No observations available.</p>
          )}
        </div>
      </div>

      {/* Generated Report Section */}
      {report && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Report</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 whitespace-pre-line">{report}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          className={`flex-1 ${
            isGeneratingReport ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center`}
          onClick={generateReport}
          disabled={isGeneratingReport}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {isGeneratingReport ? 'Generating...' : 'Generate Report'}
        </button>
        <button
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          onClick={handleSendEmail}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send Email to Parent
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;