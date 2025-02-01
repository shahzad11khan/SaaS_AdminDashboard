import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const GenericTable = ({ headers, data, currentTheme, onEdit, onDelete }) => {
  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={`${
                currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-[#F0FFF8]'
              } ${
                currentTheme === 'dark' ? 'text-white' : 'text-black'
              } border-b px-4 py-2`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr
            key={item.sno}
            className={`hover:bg-gray-100 ${
              currentTheme === 'dark' ? 'hover:bg-[#404052]' : ''
            }`}
          >
            {headers.map((header, index) => {
              if (header.toLowerCase() === 'actions') {
                return (
                  <td
                    key={index}
                    className={`px-4 py-2 ${
                      currentTheme === 'dark' ? 'text-white' : 'text-black'
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
              return (
                <td
                  key={index}
                  className={`px-4 py-2 ${
                    currentTheme === 'dark' ? 'text-white' : 'text-black'
                  } text-center`}
                >
                  {item[header.toLowerCase()]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;