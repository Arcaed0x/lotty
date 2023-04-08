import { useEffect, useState } from "react";
import { RiskProfile } from "./RiskProfileForm";
import RiskProfileCard from "./RiskProfileCard";
import { deployNotification } from "@/utils/deployNotification";

interface Props {
  onEdit: (name: string) => void;
  onDelete: (name: string) => void;
  riskProfiles: RiskProfile[];
  children?: React.ReactNode;
}

const RiskProfileCardList = ({
  riskProfiles,
  onEdit,
  onDelete,
  children,
}: Props) => {
  const [activeRiskProfile, setActiveRiskProfile] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (riskProfiles.length === 1) {
      handleSetActive(riskProfiles[0].name);
    }
  }, [riskProfiles.length, riskProfiles]);

  const handleSetActive = (name: string) => {
    setActiveRiskProfile(name);
    deployNotification(
      <>&apos;{name}&apos; risk profile is now set to active ✅</>,
      undefined,
      "is-success"
    );
  };

  return (
    <div className="notification">
      {riskProfiles.length > 0 && (
        <h4 className="title is-4">My Risk Profiles</h4>
      )}
      <div
        className={`pb-5 ${
          riskProfiles.length === 0 ? "" : "is-flex"
        } is-expanded overflow-x-scroll`}
      >
        {riskProfiles.map((riskProfile) => (
          <RiskProfileCard
            key={riskProfile.id}
            riskProfile={riskProfile}
            onEdit={onEdit}
            onDelete={onDelete}
            isActive={riskProfile.name === activeRiskProfile}
            setActive={handleSetActive}
          />
        ))}

        {riskProfiles.length === 0 && (
          <>
            <h3>No existing Risk Profiles....</h3>
            {children}
          </>
        )}
      </div>
    </div>
  );
};

export default RiskProfileCardList;
