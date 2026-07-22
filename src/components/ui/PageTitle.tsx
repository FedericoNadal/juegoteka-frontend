type PageTitleProps = {
  children: React.ReactNode;
};

function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="font-title text-5xl font-bold text-amber-900 mb-8">
      {children}
    </h1>
  );
}

export default PageTitle;