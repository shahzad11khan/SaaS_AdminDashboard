

import PropTypes from 'prop-types'

export const FileUpload = () => {
    

  return (
    <div  className="relative w-[150px] h-[150px]  rounded-full">
      <img className="h-full w-full text-center border rounded-full object-cover" src=""  alt="user" />
      <label
        htmlFor="file-input"
        className="absolute right-[12px] bottom-[12px] hover:bg-[#013D29] text-[#219653] bg-white h-[30px] w-[30px] border rounded-full cursor-pointer flex justify-center items-center"
      >
        <i className="fa-regular fa-pen-to-square"></i>
      </label>
      <input
      id="file-input"
      type="file"
      className="hidden"
    
      />
  </div>
  )
}


FileUpload.propTypes = {
  
    setUpload: PropTypes.func.isRequired,
    upload: PropTypes.bool.isRequired,
    form: PropTypes.shape({
        profileImage:PropTypes.shape({
            path: PropTypes.string.isRequired
        })
    }).isRequired
}