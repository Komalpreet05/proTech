import React, { useState } from "react";
import { InputSelect } from "../components/inputSelect";
import { RadioField } from "../components/inputSelect";

const TeachingSetup = () => {
  const [selectedGrade, setSelectedGrade] = useState("Grade 9");
  const [selectedSubject, setSelectedSubject] = useState("Core Subjects");
  const [customSubject, setCustomSubject] = useState("");
  const [selectedFramework, setSelectedFramework] = useState(
    "Toronto District School Board"
  );

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200 md:max-w-md lg:max-w-lg">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Select Your Teaching Setup
      </h2>
      <p className="text-gray-600 text-xs mt-1 text-center">
        Select your grade, subject, and curriculum framework to start tracking
        student progress.
      </p>

      <div className="mt-3">
        <InputSelect
          label="Select Grade"
          options={["Grade 9", "Grade 10", "Grade 11", "Grade 12"]}
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="text-gray-700 font-medium text-sm">
          Select Subject
        </label>
        <div className="flex flex-col gap-2 mt-1">
          <RadioField
            label="Core Subjects"
            name="subject"
            value="Core Subjects"
            checked={selectedSubject === "Core Subjects"}
            onChange={() => setSelectedSubject("Core Subjects")}
          />
          <InputSelect
            options={["All Core Subjects"]}
            value="All Core Subjects"
            disabled={selectedSubject !== "Core Subjects"}
          />

          <RadioField
            label="Additional Subjects"
            name="subject"
            value="Additional Subjects"
            checked={selectedSubject === "Additional Subjects"}
            onChange={() => setSelectedSubject("Additional Subjects")}
          />
          <InputSelect
            options={["All Additional Subjects"]}
            value="All Additional Subjects"
            disabled={selectedSubject !== "Additional Subjects"}
          />

          <RadioField
            label="Custom Subject"
            name="subject"
            value="Custom Subject"
            checked={selectedSubject === "Custom Subject"}
            onChange={() => setSelectedSubject("Custom Subject")}
          />
          <input
            type="text"
            placeholder="Enter the Subject"
            className="w-full p-2.5 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            disabled={selectedSubject !== "Custom Subject"}
          />
        </div>
      </div>

      <div className="mt-3">
        <InputSelect
          label="Select a curriculum framework"
          options={["Toronto District School Board"]}
          value={selectedFramework}
          onChange={(e) => setSelectedFramework(e.target.value)}
        />
      </div>

      <button className="w-full mt-4 p-2.5 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200">
        Save & Continue
      </button>
    </div>
  );
};

export default TeachingSetup;
