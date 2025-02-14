import LeftSideBar from "../../LeftSideBar/LeftSideBar"
import Navbar from "../../Navbar/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { fetchCompanies } from "../../Slice/CompanySlice"
import { useEffect } from "react"
import CompanyCard from "../../Components/CompanyCard"
import Spinner from "../../Components/Spinner";
import { selectCompany } from "../../Slice/SelectedCompanySlice"
import { useNavigate } from "react-router-dom"



const CompaniesData = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {  companies , theme } = useSelector((state) => state);
    let {data:companiesData , loading } = companies;
    let currentTheme = theme.theme;

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    const setSelectedCompany=(cmpny)=>{
        console.log(cmpny)
        let data = {
            cId : cmpny._id,
            cName : cmpny.companyName,
            cImg :cmpny.companyLogo,
        }
        dispatch(selectCompany(data))
        navigate('/admin')
    }

    return (
        <div>
            <Navbar />
            <div className='flex flex-col lg:flex-row'>
                <LeftSideBar />
                <div className="flex justify-between w-full lg:w-[1030px] lg:ml-2 ">
                    
                {loading?
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner/>
                </div>
                :
                <div className="card flex flex-wrap mx-2 gap-1 md:gap-10 lg:gap-8">
                        {companiesData?.map((company, index) => (
                            <div onClick={()=>setSelectedCompany(company)} key={index} className="cursor-pointer w-[160px] lg:w-[220px] ">
                                <CompanyCard
                                icon={company.companyLogo}
                                companyName={company.companyName}
                                ownerName={company.ownerName}
                                currentTheme={currentTheme}
                                />
                            </div>
                        ))}
                </div>
                }
                </div>
            </div>

        </div>
    )
}

export default CompaniesData
