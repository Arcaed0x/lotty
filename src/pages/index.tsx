import Head from "next/head";
import RiskProfileForm, {
  RiskProfile,
} from "@/components/Organisms/RiskProfileForm";
import { useState } from "react";
import { deployNotification } from "@/utils/deployNotification";
import RiskProfileCardList from "@/components/Organisms/RiskProfileCardList";
import useModal from "@/utils/hooks/useModal";

export default function Home() {
  const [riskProfiles, setRiskProfiles] = useState<RiskProfile[]>([]);
  const [riskProfileToEdit, setRiskProfileToEdit] = useState<
    RiskProfile | undefined
  >();
  const [modalPurpose, setModalPurpose] = useState<"Create" | "Edit">("Create");
  const { isModalOpen, openModal, closeModal } = useModal();

  const onDeleteRiskProfile = (id: string) => {
    const { name } = riskProfiles.find((rp) => rp.id === id) || {};

    deployNotification(
      <>&apos;{name}&apos; Profile successfully deleted..💨</>,
      4000,
      "is-warning"
    );
    setRiskProfiles(riskProfiles.filter((rp) => rp.id !== id));
  };

  const onEditRiskProfile = (id: string) => {
    setModalPurpose("Edit");
    setRiskProfileToEdit(riskProfiles.find((rp) => rp.id === id));
    openModal();
  };

  const onRiskProfileFormSubmit = (data: RiskProfile) => {
    switch (modalPurpose) {
      case "Create": {
        setRiskProfiles([...riskProfiles, data]);
      }
      case "Edit": {
        setRiskProfileToEdit(undefined);
        setRiskProfiles([
          ...riskProfiles.filter((rp) => rp.id !== data.id),
          data,
        ]);
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
            riskProfiles={riskProfiles}
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
        </div>
      </section>
    </>
  );
}
