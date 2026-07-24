type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="font-title text-3xl font-bold text-amber-900 mb-6">
      {children}
    </h2>
  );
}

export default SectionTitle;