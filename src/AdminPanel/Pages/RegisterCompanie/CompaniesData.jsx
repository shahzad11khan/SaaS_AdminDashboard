import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { fetchCompanies } from "../../Slice/CompanySlice"
import { useEffect } from "react"
import CompanyCard from "../../Components/CompanyCard"


const CompaniesData = () => {

    const dispatch = useDispatch();
    const { data: companiesData } = useSelector((state) => state.companies);
    const currentTheme = useSelector((state) => state.theme.theme);

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className='flex flex-col lg:flex-row'>
                <LeftSideBar />
                <div className="flex justify-between w-full lg:w-[1030px] lg:ml-2 ">
                    <div className="card flex-wrap mx-2 gap-1 md:gap-10 lg:gap-8">
                        {companiesData.map((company, index) => (
                            <div key={index} className=" w-[160px] lg:w-[220px] ">
                                <CompanyCard
                                icon={company.companyLogo}
                                companyName={company.companyName}
                                ownerName={company.ownerName}
                                currentTheme={currentTheme}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CompaniesData
