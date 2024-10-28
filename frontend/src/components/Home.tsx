
import AppNavbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ResponsiveExample from "./Tables.tsx";

const Home = () => {


    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <AppNavbar />
            <div className="d-flex" style={{ flexGrow: 1 }}>
                <Sidebar/>
                <div className="p-4 w-100">
                    {/* Render the list of companies */}
                    <h4>Company List</h4>
                    <div className="mt-3">
                       <ResponsiveExample  />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;