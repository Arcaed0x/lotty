import Card from "@/components/Atoms/Card";
import { RiskProfile } from "./RiskProfileForm";
import formatCurrency from "@/utils/formatCurrency";

interface Props {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  riskProfile: RiskProfile;
  isActive: boolean;
  setActive: (id: string, name: string) => void;
}

const RiskProfileCard = ({
  onEdit,
  onDelete,
  riskProfile,
  isActive,
  setActive,
}: Props) => {
  const formattedAccountSize = formatCurrency(
    riskProfile.amount,
    riskProfile.currency
  );

  return (
    <Card
      className="card-width mr-3 animate__animated animate__fadeIn"
      onClick={() => setActive(riskProfile.id, riskProfile.name)}
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
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </button>
          <button
            className="button is-danger"
            onClick={() => onDelete(riskProfile.id)}
          >
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </Card>
  );
};

export default RiskProfileCard;
