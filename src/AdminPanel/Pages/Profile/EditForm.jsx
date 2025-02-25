


export const EditForm = () => {
    


  return (
    <form  className="pt-5 w-full outfit  px-5 text-sm ">
            <div className=" flex flex-col gap-3 w-full justify-center">

              <div  className="w-full flex gap-7">
                <div className="gap-3 w-[50%]"> 
                  <label htmlFor="name" className="flex items-center"><b>Username</b></label>
                  <input  type="text" name="username" id="name" className="w-full border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" />
                </div>
                <div className=" w-[50%]"> 
                  <label htmlFor="eml" className="flex items-center"><b>Email</b></label>
                  <input  type="email" name="email" id="eml" className=" w-full border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"  />
                </div>
              </div>

              <div className="w-full flex gap-6">
                <div className="relative  w-[50%]"> 
                  <label htmlFor="pass" className="flex items-center"><b>Pasword</b></label>
                  <input  name="password" id="pass" className="w-full border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"   />
                  {/* <p  className="absolute right-3 top-7 cursor-pointer font-semibold" onClick={()=>setPass(!pass)}> {pass?'Show':'Hide'} </p> */}
                </div>
                <div className="relative  w-[50%]"> 
                  <label htmlFor="Cpass" className="flex items-center "><b>Confirm Pasword</b></label>
                  <input name="confirmPassword" id="Cpass" className="w-full border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" />
                  <p className="absolute right-3 top-7 cursor-pointer font-semibold"> </p>
                </div>
              </div>

              <div className=' text-center w-[410px]'>
                <button type="submit" className='w-[100px]  bg-[#013D29]  rounded-full text-white outfit  py-[6px]'>update</button>
              </div>

            </div>
         </form> 
  )
}


