import useRiskProfileStore from "@/stores/riskProfiles";
import { useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import useLocalStorage from "use-local-storage";
import { RiskProfile } from "@/components/Organisms/RiskProfileForm";

interface Props {}

const RiskProfileHydrate = ({}: Props) => {
  const [riskProfileState, setRiskProfileState] = useLocalStorage<{
    riskProfiles: RiskProfile[];
    activeRiskProfile: string | undefined;
  }>("riskProfileState", { riskProfiles: [], activeRiskProfile: undefined });
  const [currentRiskProfileState, loadRiskProfileState] = useRiskProfileStore(
    (state) => [
      {
        riskProfiles: state.riskProfiles,
        activeRiskProfile: state.activeRiskProfile,
      },
      state.loadRiskProfileState,
    ]
  );

  useBeforeunload((event) => {
    setRiskProfileState(currentRiskProfileState);
  });

  useEffect(() => {
    loadRiskProfileState(riskProfileState);
  }, [loadRiskProfileState, riskProfileState]);

  return <></>;
};

export default RiskProfileHydrate;
