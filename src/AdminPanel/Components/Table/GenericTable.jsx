import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const GenericTable = ({ headers, data, currentTheme, onEdit, onDelete }) => {

  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
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
      </thead>

      <tbody>
        {data.length > 0 ? (
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
                      className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'} text-center`}
                    >
                      {new Date(item[header]).toISOString().split("T")[0]}
                    </td>
                  );
                }

                return (
                  <td
                    key={index}
                    className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                      } text-center`}
                  >
                    {item[header]}
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
  data: PropTypes.arrayOf(PropTypes.object),
  currentTheme: PropTypes.oneOf(['light', 'dark']).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GenericTable;