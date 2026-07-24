type ContainerProps = {
    children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
    return (
        <div className="max-w-6xl mx-auto px-6">
            {children}
        </div>
    );
}

export default Container;