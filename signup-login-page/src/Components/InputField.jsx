import React from "react";

const InputField = ({ type, name, value, onChange, placeholder, label, error }) => 
  (
  <div className="flex flex-col mb-5">

    <label className="text-sm font-medium text-gray-800 mb-2">{label}</label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
    />

    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);

export default InputField;