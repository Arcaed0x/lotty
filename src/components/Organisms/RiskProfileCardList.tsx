import { useCallback, useEffect, useState } from "react";
import RiskProfileCard from "./RiskProfileCard";
import { deployNotification } from "@/utils/deployNotification";
import useRiskProfileStore from "@/stores/riskProfiles";

interface Props {
  onEdit: (name: string) => void;
  onDelete: (name: string) => void;
  children?: React.ReactNode;
}

const RiskProfileCardList = ({ onEdit, onDelete, children }: Props) => {
  const [shouldShowRiskProfiles, setShouldShowRiskProfiles] = useState(true);

  const [riskProfiles, activeRiskProfile, setActiveRiskProfile] =
    useRiskProfileStore((state) => [
      state.riskProfiles,
      state.activeRiskProfile,
      state.setActiveRiskProfile,
    ]);

  const handleSetActive = useCallback(
    (id: string, name: string) => {
      if (id === activeRiskProfile) return;

      setActiveRiskProfile(id);
      deployNotification(
        <>&apos;{name}&apos; risk profile is now set to active ✅</>,
        undefined,
        "is-success"
      );
    },
    [setActiveRiskProfile, activeRiskProfile]
  );

  useEffect(() => {
    if (riskProfiles.length === 1) {
      handleSetActive(riskProfiles[0].id, riskProfiles[0].name);
    }
  }, [riskProfiles.length, riskProfiles, handleSetActive]);

  const onClickToggleShowRiskProfiles = () => {
    setShouldShowRiskProfiles(!shouldShowRiskProfiles);
  };

  const riskProfileChevronDirection = shouldShowRiskProfiles ? "down" : "up";

  return (
    <div className="notification">
      {riskProfiles.length > 0 && (
        <h4 className="title is-4">
          My Risk Profiles ({riskProfiles.length})
          <button
            className="button is-rounded ml-3 negative-top-margin"
            onClick={onClickToggleShowRiskProfiles}
          >
            <span className="icon is-small">
              <i className={`fa fa-chevron-${riskProfileChevronDirection}`}></i>
            </span>
          </button>
        </h4>
      )}
      {shouldShowRiskProfiles && (
        <div
          className={`${
            riskProfiles.length === 0 ? "" : "is-flex"
          } is-expanded overflow-x-scroll pb-5 pr-3 animate__animated animate__fadeIn`}
        >
          {riskProfiles.map((riskProfile) => (
            <RiskProfileCard
              key={riskProfile.id}
              riskProfile={riskProfile}
              onEdit={onEdit}
              onDelete={onDelete}
              isActive={riskProfile.id === activeRiskProfile}
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
      )}
    </div>
  );
};

export default RiskProfileCardList;
