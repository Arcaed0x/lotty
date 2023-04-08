interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, className, onClick }: Props) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
