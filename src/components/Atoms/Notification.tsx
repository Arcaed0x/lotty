interface Props {
  children: React.ReactNode;
  onDelete: () => void;
  type: string;
  visible: boolean;
}

const Notification = ({ children, type, onDelete, visible }: Props) => {
  return (
    <div
      className={`notification ${type}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 100ms ease-in-out",
      }}
    >
      <button className="delete" onClick={onDelete}></button>
      {children}
    </div>
  );
};

export default Notification;
