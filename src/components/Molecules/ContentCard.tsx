import Card from "../Atoms/Card";

interface Props {
  children: React.ReactNode;
}

const ContentCard = ({ children }: Props) => {
  return (
    <Card>
      <div className="card-content">{children}</div>
    </Card>
  );
};

export default ContentCard;
