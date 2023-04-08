interface Props {
  children: React.ReactNode;
}

const FieldWithAddons = ({ children }: Props) => {
  return <div className="field has-addons">{children}</div>;
};

export default FieldWithAddons;
