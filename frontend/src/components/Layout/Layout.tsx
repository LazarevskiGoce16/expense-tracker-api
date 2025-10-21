import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                {children}
            </main>
        </>
    );
};

export default Layout;
