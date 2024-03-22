import React, { PropsWithChildren } from 'react';
import Navigation from '../navigation/navigationMenu'; // Ajuste o caminho conforme necessário
import Footer from '../footer/footer'; // Ajuste o caminho conforme necessário

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;