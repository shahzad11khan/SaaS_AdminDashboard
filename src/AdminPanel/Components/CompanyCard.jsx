import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


const CompanyCard = (props) => {
    const {icon,companyName,ownerName}=props;
    const currentTheme = useSelector((state) => state.theme.theme);
    return (
            <div className={`flex flex-wrap flex-col items-center p-3 ${currentTheme=== 'dark' ?'bg-[#404040]]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black' }  rounded-lg shadow-md overflow-hidden  border border-gray-300`}>
                <img className='w-36 h-36 rounded-full hover-pointer' src={icon} alt="CompanyLogo" />
                               
                <div className="mt-5">
                    <h3 className=''><span className='font-semibold'>Company Name :</span> {companyName}</h3>
                    <h3 className=''><span className='font-semibold'>Owner :</span> {ownerName}</h3>

                </div>

            </div>
    )
}

CompanyCard.propTypes = {
    icon: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    description: PropTypes.string, 
    companyName: PropTypes.string.isRequired,
    ownerName: PropTypes.string.isRequired,
  };
  



export default CompanyCard
