
import AppNavbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import {useState} from "react";

const Home = () => {
    const [companies, setCompanies] = useState<any[]>([]);

    const handleAddCompany = (company: any) => {
        setCompanies([...companies, company]);  // Add the new company to the list
    };

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <AppNavbar />
            <div className="d-flex" style={{ flexGrow: 1 }}>
                <Sidebar onAddCompany={handleAddCompany} />
                <div className="p-4 w-100">
                    {/* Render the list of companies */}
                    <h4>Company List</h4>
                    <div className="mt-3">
                        {companies.map((company, index) => (
                            <div key={index}>
                                <strong>{company.name}</strong> - {company.contactPerson}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;