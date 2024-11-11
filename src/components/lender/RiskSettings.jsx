import React from "react";
import { FaSlidersH } from "react-icons/fa";

const RiskSettings = ({ settings, setSettings }) => {
  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: parseInt(value),
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FaSlidersH className="text-gray-400" />
        <h2 className="text-xl font-semibold">Risk Assessment Settings</h2>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Credit Score Weight ({settings.creditScoreWeight}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.creditScoreWeight}
            onChange={(e) => handleChange("creditScoreWeight", e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Income Weight ({settings.incomeWeight}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.incomeWeight}
            onChange={(e) => handleChange("incomeWeight", e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Debt Ratio Weight ({settings.debtRatioWeight}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.debtRatioWeight}
            onChange={(e) => handleChange("debtRatioWeight", e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment History Weight ({settings.historyWeight}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.historyWeight}
            onChange={(e) => handleChange("historyWeight", e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 mb-2">Total Weight:</p>
          <p className="text-2xl font-bold">
            {settings.creditScoreWeight +
              settings.incomeWeight +
              settings.debtRatioWeight +
              settings.historyWeight}
            %
          </p>
          {settings.creditScoreWeight +
            settings.incomeWeight +
            settings.debtRatioWeight +
            settings.historyWeight !==
            100 && (
            <p className="text-sm text-red-500 mt-2">
              Total weight should equal 100%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskSettings;
