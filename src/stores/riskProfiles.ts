import { create } from "zustand";
import { RiskProfile } from "@/components/Organisms/RiskProfileForm";

type State = {
  riskProfiles: RiskProfile[];
  activeRiskProfile: string | undefined;
};

type Action = {
  createRiskProfile: (riskProfile: RiskProfile) => void;
  updateRiskProfile: (riskProfile: RiskProfile) => void;
  deleteRiskProfile: (riskProfileId: string) => void;
  setActiveRiskProfile: (riskProfileId: string) => void;
  clearActiveRiskProfile: () => void;
};

type RiskProfileStore = State & Action;

const useRiskProfileStore = create<RiskProfileStore>((set) => ({
  riskProfiles: [],
  activeRiskProfile: undefined,
  createRiskProfile: (riskProfile: RiskProfile) => {
    set((state) => ({
      riskProfiles: [...new Set([...state.riskProfiles, riskProfile])],
    }));
  },
  updateRiskProfile: (riskProfile: RiskProfile) => {
    set((state) => ({
      riskProfiles: state.riskProfiles.map((rp) =>
        rp.id === riskProfile.id ? riskProfile : rp
      ),
    }));
  },
  deleteRiskProfile: (riskProfileId: string) => {
    set((state) => ({
      riskProfiles: state.riskProfiles.filter(
        (riskProfile) => riskProfile.id !== riskProfileId
      ),
    }));
  },
  setActiveRiskProfile: (riskProfileId: string) => {
    set((state) => ({
      activeRiskProfile: riskProfileId,
    }));
  },
  clearActiveRiskProfile: () => {
    set((state) => ({
      activeRiskProfile: undefined,
    }));
  },
}));

export default useRiskProfileStore;
