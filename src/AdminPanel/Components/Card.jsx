import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


const Card = (props) => {
    const {icon,iconBgColor,title,price}=props;
    const currentTheme = useSelector((state) => state.theme.theme);
    return (
            <div className={`flex flex-wrap flex-col items-center p-3 ${currentTheme=== 'dark' ?'bg-[#404040]]':'bg-[#F0FFF8]'} ${currentTheme=== 'dark' ?'text-white':'text-black' }  rounded-lg shadow-md overflow-hidden  border border-gray-300`}>
                <i className={`fas ${icon} rounded-full border-[4px] p-2 border-white text-3xl ${iconBgColor} text-white`}></i>
                <div className="p-2 flex flex-col  space-y-0">
                    <h5 className="${currentTheme=== 'dark' ?'text-white':'text-gray-800 ' }   text-center">
                        {title}
                    </h5>
                </div>

                <div className="price">
                    <h3 className='text-xl font-extrabold'>{price || 0}</h3>
                </div>

            </div>
    )
}

Card.propTypes = {
    icon: PropTypes.string.isRequired, 
    iconBgColor: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    description: PropTypes.string, 
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  



export default Card
