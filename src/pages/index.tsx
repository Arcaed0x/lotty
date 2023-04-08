import Head from "next/head";
import RiskProfileForm, {
  RiskProfile,
} from "@/components/Organisms/RiskProfileForm";
import { useState } from "react";
import { deployNotification } from "@/utils/deployNotification";
import RiskProfileCardList from "@/components/Organisms/RiskProfileCardList";
import useModal from "@/utils/hooks/useModal";
import RiskCalculation from "@/components/Organisms/RiskCalculation";
import useRiskProfileStore from "@/stores/riskProfiles";

export default function Home() {
  const [
    riskProfiles,
    createRiskProfile,
    updateRiskProfile,
    deleteRiskProfile,
  ] = useRiskProfileStore((state) => [
    state.riskProfiles,
    state.createRiskProfile,
    state.updateRiskProfile,
    state.deleteRiskProfile,
  ]);
  const [riskProfileToEdit, setRiskProfileToEdit] = useState<
    RiskProfile | undefined
  >();
  const [modalPurpose, setModalPurpose] = useState<"Create" | "Edit">("Create");
  const { isModalOpen, openModal, closeModal } = useModal();

  const onDeleteRiskProfile = (id: string) => {
    const rp = riskProfiles.find((rp) => rp.id === id) as RiskProfile;

    deployNotification(
      <>
        <strong>&apos;{rp.name}&apos;</strong> Profile successfully deleted..💨
        <button
          className="button is-warning is-light ml-3"
          onClick={() => createRiskProfile(rp)}
        >
          Undo
        </button>
      </>,
      10000,
      "is-warning"
    );
    deleteRiskProfile(id);
  };

  const onEditRiskProfile = (id: string) => {
    setModalPurpose("Edit");
    setRiskProfileToEdit(riskProfiles.find((rp) => rp.id === id));
    openModal();
  };

  const onRiskProfileFormSubmit = (data: RiskProfile) => {
    switch (modalPurpose) {
      case "Create": {
        createRiskProfile(data);
      }
      case "Edit": {
        setRiskProfileToEdit(undefined);
        updateRiskProfile(data);

        setModalPurpose("Create");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Lotty</title>
        <meta name="description" content="A lot size calculator for Indices" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="section">
        <div className="container">
          <h1 className="title">Lotty</h1>
          <RiskProfileCardList
            onEdit={onEditRiskProfile}
            onDelete={onDeleteRiskProfile}
          >
            <br /> Click the button below to create one
          </RiskProfileCardList>

          <RiskProfileForm
            initialValue={riskProfileToEdit}
            onSubmit={onRiskProfileFormSubmit}
            purpose={modalPurpose}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            openModal={openModal}
          />

          {riskProfiles.length !== 0 && <RiskCalculation />}
        </div>
      </section>
    </>
  );
}
