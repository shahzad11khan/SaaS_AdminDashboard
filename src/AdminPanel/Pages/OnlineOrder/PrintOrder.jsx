import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';



const PrintOrder = () => {
    const location = useLocation();
    const orderData = location.state?.item;
    const { companyName, companyId, companyImg, companyEmail, companyPhoneNumber, companyRegistrationNumber } = useSelector((state) => state.selectedCompany);


    const headers = [
        "S.No",
        // "userId",
        // "products",
        "O.Status",
        "P.Method",
        "Shipping Address",
        "Quantity",
        "Amount",
        "T.Amount",
        "Created At",
    ];
    return (
        <div className="bg-white p-4">
            <div className="max-w-5xl mx-auto border border-gray-300 p-6">
                <div className="flex justify-between invoice-header mb-6">
                    <div className="text-left">
                        <h1 className="text-2xl font-bold">User Name</h1>
                        <p className="text-sm"><span className="font-semibold">Tell:</span> 0333333333</p>
                        <p className="text-sm"><span className="font-semibold">Fax:</span> 0333</p>
                        <p className="text-sm"><span className="font-semibold">P.O. Box:</span> 39339, Peshawar-Pakistan</p>
                        <p className="text-sm"><span className="font-semibold">Email:</span> order@saas.com</p>
                    </div>

                    {companyId ?
                        <div className="flex justify-center">
                            <img className="w-24 h-24 rounded-full" src={companyImg} alt="" />

                        </div>
                        :
                        <div className="flex justify-center">
                            <img src="../../../images/justLogo.svg" alt="" />
                        </div>}

                    {companyId ?
                        <div className="right-section">
                            <h1 className="text-2xl font-bold"> {companyName}</h1>
                            <p className="text-sm">{companyRegistrationNumber}</p>
                            <p className="text-sm">{companyEmail}</p>
                            <p className="text-sm">{companyPhoneNumber}</p>

                        </div>
                        :
                        <div className="right-section">
                            <h1 className="text-2xl font-bold"> Company Name</h1>
                            <p className="text-sm">Email:</p>
                            <p className="text-sm">Reg No:</p>

                        </div>
                    }
                </div>

                <div className="text-center mt-16 ml-20">
                    <h2 className="text-2xl font-bold">Order Invoice</h2>
                </div>


                <div className="flex justify-end w-full mt-[-50px]">
                    <table className="border-b border-gray-300 text-left">
                        <tbody>
                            <tr>
                                <td className="font-semibold">Printed by :</td>
                                <td>admin</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Print Date :</td>
                                <td>{new Date().toLocaleDateString()}</td>                            </tr>
                        </tbody>
                    </table>
                </div>



                <table className="w-full border border-gray-300 mt-10">
                    <thead>
                        <tr className="bg-gray-100 whitespace-nowrap">
                            {headers.map((header, index) => (
                                <th key={index} className="">{header}</th>

                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orderData ? (
                            <tr className="text-center ">
                                <td className="whitespace-nowrap">1</td>
                                {/* <td className="whitespace-nowrap">{orderData.userId._id}</td> */}
                              

                                <td className="whitespace-nowrap">{orderData.orderStatus}</td>
                                <td className="whitespace-nowrap">{orderData.paymentMethod}</td>
                                <td className="whitespace-nowrap">{orderData.shippingAddress}</td>
                                <td className="whitespace-nowrap">
                                    {orderData.products.map((i, index) => (
                                        <td key={index} className="whitespace-nowrap flex justify-center gap-2">{i.quantity}</td>
                                    ))}
                                </td>              
                                <td className="whitespace-nowrap">
                                    {orderData.products.map((i, index) => (
                                        <td key={index} className="whitespace-nowrap flex justify-center gap-2">{i.price}</td>
                                    ))}
                                </td>                   
                                <td className="whitespace-nowrap">{orderData.totalAmount}</td>
                                <td className="whitespace-nowrap">{orderData.createdAt.split("T")[0]}</td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center text-red-500 py-4">No Data Available</td>
                            </tr>
                        )}
                    </tbody>
                </table>


            </div>
        </div>
    );
};

export default PrintOrder;