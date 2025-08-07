"use client";

import React from "react";

const Stepper = ({ steps = [], currentStep = 1 }) => {
  return (
    <div className="flex justify-between items-center w-full mb-6">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={step} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-semibold
                ${isCompleted ? "bg-green-500 text-white border-green-500" : ""}
                ${isActive ? "border-blue-600 text-blue-600" : ""}
                ${!isCompleted && !isActive ? "border-gray-300 text-gray-500" : ""}
              `}
            >
              {stepNumber}
            </div>
            <div className="ml-2 text-sm text-gray-700">{step}</div>
            {index !== steps.length - 1 && (
              <div className="flex-1 h-px bg-gray-300 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
