import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from "react-router-dom";


const PrintOrder = () => {
    const location = useLocation();
    const currentTheme = useSelector((state => state.theme.theme))
    const orderData = location.state?.item;
    const { companyName, companyId, companyImg, companyEmail, companyPhoneNumber, companyRegistrationNumber } = useSelector((state) => state.selectedCompany);
    const invoiceRef = useRef(null);

    const headers = [
        "S.No",
        "User Name",
        "Products",
        "Shipping Address",
        "O.Status",
        "P.Method",
        "Quantity",
        "Amount",
        "T.Amount",
        "Created At",
    ];

    const generatePDF = () => {
        const input = invoiceRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("order-invoice.pdf");
        });
    };

    return (
        <div className="bg-white p-4">
            <div ref={invoiceRef} className="max-w-5xl mx-auto border border-gray-300 p-6">
                <div className="flex justify-between invoice-header mb-6">
                    <div className="text-left">
                        <h1 className="text-2xl font-bold">User Name</h1>
                        <p className="text-sm"><span className="font-semibold">Tell:</span> 0333333333</p>
                        <p className="text-sm"><span className="font-semibold">Fax:</span> 0333</p>
                        <p className="text-sm"><span className="font-semibold">P.O. Box:</span> 39339, Peshawar-Pakistan</p>
                        <p className="text-sm"><span className="font-semibold">Email:</span> order@saas.com</p>
                    </div>

                    {companyId ? (
                        <div className="flex justify-center">
                            <img className="w-24 h-24 rounded-full" src={companyImg} alt="" />
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <img src="../../../images/justLogo.svg" alt="" />
                        </div>
                    )}

                    {companyId ? (
                        <div className="right-section">
                            <h1 className="text-2xl font-bold">{companyName}</h1>
                            <p className="text-sm">{companyRegistrationNumber}</p>
                            <p className="text-sm">{companyEmail}</p>
                            <p className="text-sm">{companyPhoneNumber}</p>
                        </div>
                    ) : (
                        <div className="right-section">
                            <h1 className="text-2xl font-bold">Company Name</h1>
                            <p className="text-sm">Email:</p>
                            <p className="text-sm">Reg No:</p>
                        </div>
                    )}
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
                                <td>{new Date().toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <table className="w-full border-t border-gray-300 mt-10">
                    <thead>
                        <tr className="bg-gray-100 whitespace-nowrap">
                            {headers.map((header, index) => (
                                <th key={index} className="">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orderData ? (
                            <tr className="text-center">
                                <td className="whitespace-nowrap">1</td>
                                <td className="whitespace-nowrap">{orderData.userId.username}</td>
                                <td className="whitespace-nowrap">
                                    {orderData.products.map((item, index) => (
                                        <div key={index} className="flex justify-center gap-2">
                                            {item.products && item.products.length > 0 ? (
                                                item.products.map((product, idx) => (
                                                    <span key={idx}>{product?.productId}</span>
                                                ))
                                            ) : (
                                                "N/A"
                                            )}
                                        </div>
                                    ))}
                                </td>

                                <td className="whitespace-nowrap">{orderData.shippingAddress}</td>
                                <td className="whitespace-nowrap">{orderData.orderStatus}</td>
                                <td className="whitespace-nowrap">{orderData.paymentMethod}</td>
                                <td className="whitespace-nowrap">
                                    {orderData.products.map((i, index) => (
                                        <div key={index} className="flex justify-center gap-2">{i.quantity}</div>
                                    ))}
                                </td>
                                <td className="whitespace-nowrap">
                                    {orderData.products.map((i, index) => (
                                        <div key={index} className="flex justify-center gap-2">{i.price}</div>
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

            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={generatePDF}
                    className={`px-2 py-2 ${currentTheme === 'dark' ? 'bg-[#404040] text-white' : 'bg-[#F0FFF8] text-black'}  rounded border`}>
                    Download PDF
                </button>
                <Link to="/online-order">
                    <button
                        className={`px-2 py-2 ${currentTheme === 'dark' ? 'bg-[#404040] text-white' : 'bg-[#F0FFF8] text-black'}  rounded border`}>
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PrintOrder;
