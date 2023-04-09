import { create } from "zustand";
import { RiskProfile } from "@/components/Organisms/RiskProfileForm";

export type State = {
  riskProfiles: RiskProfile[];
  activeRiskProfile: string | undefined;
};

type Action = {
  createRiskProfile: (riskProfile: RiskProfile) => void;
  updateRiskProfile: (riskProfile: RiskProfile) => void;
  deleteRiskProfile: (riskProfileId: string) => void;
  setActiveRiskProfile: (riskProfileId: string) => void;
  clearActiveRiskProfile: () => void;
  loadRiskProfileState: (localStorageState: State) => void;
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
    set((state) => {
      const filteredRiskProfiles = state.riskProfiles.filter(
        (riskProfile) => riskProfile.id !== riskProfileId
      );
      return {
        riskProfiles: filteredRiskProfiles,
        activeRiskProfile:
          filteredRiskProfiles.length > 0
            ? filteredRiskProfiles[0].id
            : undefined,
      };
    });
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
  loadRiskProfileState: (localStorageState: State) => {
    set((state) => ({
      riskProfiles: localStorageState.riskProfiles,
      activeRiskProfile: localStorageState.activeRiskProfile,
    }));
  },
}));

export default useRiskProfileStore;
