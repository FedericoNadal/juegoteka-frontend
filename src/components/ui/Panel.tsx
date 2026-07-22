type PanelProps = {
  children: React.ReactNode;
};

function Panel({ children }: PanelProps) {
  return (
    <section
      className="
        max-w-5xl
        mx-auto
        my-8
        rounded-xl
        bg-amber-100/70
        p-8
        shadow-lg
      "
    >
      {children}
    </section>
  );
}

export default Panel;