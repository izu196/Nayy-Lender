import React from "react";
import { motion } from "framer-motion";
import { USER_ROLES } from "../../constants/roles";
import { FaUserTie, FaUsers } from "react-icons/fa";

const RoleSelection = ({ onSelect, theme }) => {
  const roles = [
    {
      id: USER_ROLES.LENDER,
      title: "Lender",
      description: "I want to lend money and earn interest",
      icon: <FaUserTie className="h-6 w-6" />,
    },
    {
      id: USER_ROLES.BORROWER,
      title: "Borrower",
      description: "I want to borrow money for my needs",
      icon: <FaUsers className="h-6 w-6" />,
    },
  ];

  return (
    <div
      className={`max-w-md w-full mx-auto ${theme.cardBackground} rounded-lg shadow-xl p-8`}
    >
      <h2
        className={`text-2xl font-bold text-center mb-6 ${theme.headingText}`}
      >
        Choose Your Role
      </h2>
      <div className="space-y-4">
        {roles.map((role) => (
          <motion.button
            key={role.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(role.id)}
            className={`
              w-full p-4 flex items-center space-x-4
              rounded-lg border-2 ${theme.cardBackground}
              hover:border-primary-500 transition-all duration-200
              ${theme.text}
            `}
          >
            <div className={`p-3 rounded-full ${theme.iconBackground}`}>
              {role.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium">{role.title}</h3>
              <p className={`text-sm ${theme.mutedText}`}>{role.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
