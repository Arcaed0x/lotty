import Card from "@/components/Atoms/Card";
import { RiskProfile } from "./RiskProfileForm";

interface Props {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  riskProfile: RiskProfile;
  isActive: boolean;
  setActive: (id: string) => void;
}

const RiskProfileCard = ({
  onEdit,
  onDelete,
  riskProfile,
  isActive,
  setActive,
}: Props) => {
  const formattedAccountSize = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: riskProfile.currency,
  }).format(riskProfile.amount);

  return (
    <Card
      className="card-width mr-3"
      onClick={() => setActive(riskProfile.name)}
    >
      <header className="card-header">
        <p className="card-header-title">{riskProfile.name}</p>
        <div className="tags p-3">
          {isActive && <span className="tag is-success ">ACTIVE</span>}
        </div>
      </header>
      <div className="card-content">
        <div className="content">
          <h3 className="subtitle">{formattedAccountSize}</h3>

          <div className="tags">
            {riskProfile.riskPercentages.map((riskPercentage) => (
              <span className="tag is-medium" key={riskPercentage}>
                {riskPercentage}&#37;
              </span>
            ))}
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <div className="buttons py-2 px-2 is-centered">
          <button className="button" onClick={() => onEdit(riskProfile.id)}>
            Edit
          </button>
          <button
            className="button is-danger"
            onClick={() => onDelete(riskProfile.id)}
          >
            Delete
          </button>
        </div>
      </footer>
    </Card>
  );
};

export default RiskProfileCard;
