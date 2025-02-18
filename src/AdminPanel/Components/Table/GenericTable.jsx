import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

const GenericTable = ({ headers, headers2,headers3, data, currentTheme, onEdit, onDelete }) => {

  return (
    <table className="border-collapse border border-gray-300 w-full overflow-x-auto whitespace-nowrap">
      <thead>
        {/* top Header */}
      <tr>
          {headers.map((header, index) => (
                <th
                  key={index}
                  className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'
                    } ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                    } border-b px-4 py-2`}
                >
                  {header}
                </th> 
          ))}
          </tr>
            {/* middle Header */}
          {headers[3]==='permissions' && headers2.length>0 && <tr >
          {headers.map((header, index) => (
                <th
                  key={index}
                  className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'
                    } ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                    } border-b px-4 py-2 w-1000px` }
                >

               <tr>
                {header === "permissions" && headers2.map((el , idx )=>
                  <th
                  key={idx}
                  className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'
                    } ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                    }  text-center  w-[300px]`}>
                      {console.log(el)}
                      {el}
                </th>
                )}
              </tr> 
              </th>
          ))}
        </tr> } 

          {/* bottom Header */}
          {headers[3]==='permissions' &&  headers2.length>0 &&
        <tr >
          {headers.map((header, index) => (
                <th
                  key={index}
                  className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'
                    } ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                    } border-b px-4 py-2`}
                >
               <tr>
                {header === "permissions" && headers2.map((el , idx )=>
                  <th
                  key={idx}
                  className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'
                    } ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                    }   `}>
                        <tr>
                        {el === 'productManager' && headers3.map((el , idx )=>
                          <th
                          key={idx}
                          className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'
                            } ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                            } px-2 `}>
                              {el}
                        </th>
                        )}
                        {el === 'stockManager' && headers3.map((el , idx )=>
                          <th
                          key={idx}
                          className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'
                            } ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                            } px-2 `}>
                              {el}
                        </th>
                        )}
                        {el === 'customerManager' && headers3.map((el , idx )=>
                          <th
                          key={idx}
                          className={`${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'
                            } ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                            } px-2 `}>
                              {el}
                        </th>
                        )}
                      </tr> 
                </th>
                )}
              </tr> 
              </th>
          ))}
        </tr>}
      </thead>

      {/* tabel data */}
      <tbody>
        {data?.length > 0 ? (
          data?.map((item, idx) => (
            <tr
              key={item.sno}
              className={`hover:bg-gray-100 ${currentTheme === 'dark' ? 'hover:bg-[#404052]' : ''
                }`}
            >
              {headers.map((header, index) => {
                if (header.toLowerCase() === 'actions') {
                  return (
                    <td
                      key={index}
                      className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                        } text-center`}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-green-500 mr-2 cursor-pointer"
                        onClick={() => onEdit(item)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 cursor-pointer"
                        onClick={() => onDelete(item)}
                      />
                    </td>
                  );
                }
                if (header.toLowerCase() === 'sno') {
                  return (
                    <td
                      key={index}
                      className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                        } text-center`}
                    >
                      {idx + 1}

                    </td>
                  );
                }

                if (header === 'productDescription') {
                  return (
                    <td
                      key={index}
                      className={`px-4 py-2  ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                        } text-center`}
                    >
                      <p className='w-[400px] text-start'>
                        {item[header] ?.length > 50? `${item[header].substring(0,50)}...`:item[header]}
                      </p>

                    </td>
                  );
                }

                if (header === 'userLogoUrl') {
                  return (
                    <td
                      key={index}
                      className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                        } text-center`}
                    >
                      <img className='rounded-full w-10 h-10 mx-auto' src={item.userLogoUrl} alt="Logo" />

                    </td>
                  );
                }
                if (header === 'productImageUrl') {
                  return (
                    <td
                      key={index}
                      className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                        } text-center`}
                    >
                      <img className='rounded-full w-10 h-10 mx-auto' src={item.productImageUrl} alt="Logo" />

                    </td>
                  );
                }

                if (header === 'createdAt' || header === 'updatedAt' || header === 'dateOfBirth' || header==='dateAdded') {
                  return (
                    <td
                      key={index}
                      className={`px-4 py-2 whitespace-nowrap ${currentTheme === 'dark' ? 'text-white' : 'text-black'} text-center`}
                    >
                      {new Date(item[header]).toISOString().split("T")[0]}
                    </td>
                  );
                }
                
                if (header === "permissions") {
                  return <td key={index}
                  className={` ${currentTheme === 'dark' ? 'text-white' : 'text-black'} text-center`}
>
                    {headers2.flatMap((subHeader , index) => 
                    <td key={index}
                    className='w-[450px] text-center '
                    >
                      {headers3.map((option, index) => (
                      <td 
                        key={`${subHeader}-${option}-${index}`}
                        className={`px-3 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'} text-center`}
                      >
                        <td>
                        {item[header]?.[subHeader]?.[option] ?'true':'false'}
                        </td>
                      </td>
                    ))}
                    </td>
                  )}
                  </td>
                }

                return (
                  <td
                    key={index}
                    className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                      } text-center`}
                  >
                    {header === "permissions" ? null :item[header]}
                  </td>
                );
              })}
            </tr>
          )))
          : (
            <tr>
              <td colSpan={headers.length} className="px-4 py-2 text-center text-gray-500">
                <FontAwesomeIcon icon={faBoxOpen} size="2x" />
              </td>
            </tr>
          )}

      </tbody>
    </table>
  );
};
GenericTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  headers2: PropTypes.arrayOf(PropTypes.string),
  headers3: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
  currentTheme: PropTypes.oneOf(['light', 'dark']).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GenericTable;