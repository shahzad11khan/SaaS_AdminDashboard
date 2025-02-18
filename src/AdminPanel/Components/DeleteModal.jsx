import PropTypes from "prop-types";

const DeleteModal = ({ isOpen, onClose , confirmDelete }) => {
  if (!isOpen) return null;

  // Pass the Id to handleDelete when Confirm Delete is clicked
  const handleConfirmDelete = () => {
    confirmDelete()
    //   onDelete(Id); // Pass the Id from DeleteModal to handleDelete function
    ; // Close the modal after deletion
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        {/* Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-3  text-red-500 text-2xl hover:text-red-700 focus:outline-none"
        >
          &times;
        </button>

        <div className="flex flex-col items-center">
          {/* Modal Title */}
          <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
          {/* Modal Description */}
          <p className="text-sm text-gray-600 mb-6">
            Are you absolutely sure you want to permanently delete this item?
            Once deleted, this action cannot be undone. All associated data and
            files will be lost, and you will not be able to recover it.
          </p>
          {/* Modal Buttons */}
          <div className="flex justify-between w-full">
            <button
              onClick={onClose}
              className="px-6 py-2 ml-2 rounded bg-[#F0FFF8] border"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-6 py-2 bg-custom-bg rounded bg-[#F0FFF8] border"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Ensure `isOpen` is a required boolean
  onClose: PropTypes.func.isRequired, // Ensure `onClose` is a required function
  confirmDelete: PropTypes.func.isRequired, 

};

export default DeleteModal;
