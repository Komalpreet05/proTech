// import React from "react";
// import PropTypes from "prop-types";

// const InputSelect = ({ label, type, options, placeholder, onChange }) => {
//   return (
//     <div className="mb-4">
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       {type === "select" ? (
//         <select
//           className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           onChange={(e) => onChange(e.target.value)}
//         >
//           {options.map((option, index) => (
//             <option key={index} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           type="text"
//           placeholder={placeholder}
//           className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           onChange={(e) => onChange(e.target.value)}
//         />
//       )}
//     </div>
//   );
// };
// InputSelect.propTypes = {
//   label: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   placeholder: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
// };

// export default InputSelect;
import React from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const InputSelect = ({ label, options, value, onChange, disabled }) => (
  <div className="relative mt-1">
    <label className="text-gray-700 font-medium text-sm">{label}</label>
    <div className="relative">
      <select
        className="w-full p-2.5 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-9 text-gray-500" size={16} />
    </div>
  </div>
);

const RadioField = ({ label, name, value, checked, onChange }) => (
  <label className="flex items-center gap-2 text-gray-700 text-sm">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="text-green-500"
    />
    {label}
  </label>
);

export { InputSelect, RadioField };
