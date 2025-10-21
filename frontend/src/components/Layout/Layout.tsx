import Navbar from "./Navbar";
import "../../styles/layout.css";

interface LayoutProps {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="layout-main">
                {children}
            </main>
        </>
    );
};

export default Layout;
