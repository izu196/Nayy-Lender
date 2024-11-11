import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { lenderService, teamService } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import TeamMemberList from "../../components/lender/TeamMemberList";
import ActivityLog from "../../components/lender/ActivityLog";
import TeamPerformance from "../../components/lender/TeamPerformance";

const TeamActivity = () => {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const { data } = await lenderService.getTeamActivity();
        setTeamData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Team Activity</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TeamMemberList members={teamData.members} />
        <div className="lg:col-span-2">
          <ActivityLog activities={teamData.activities} />
          <TeamPerformance performance={teamData.performance} />
        </div>
      </div>
    </motion.div>
  );
};

export default TeamActivity;
