import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; 

ChartJS.register(ArcElement, Tooltip, Legend);

const CompanyGraph = ({ registeredCompanies, totalCompanies, currentTheme }) => {
    const navigate = useNavigate();

    const remainingCompanies = totalCompanies - registeredCompanies;

    const chartData = {
        labels: [`Registered: ${registeredCompanies}`, `Remaining: ${remainingCompanies}`],
        datasets: [
            {
                data: [registeredCompanies, remainingCompanies],
                backgroundColor: ["#717171", "#7b7b7b"],
                hoverBackgroundColor: ["#717171", "#7b7b7b"],
            },
        ],
    };

    const handleClick = () => {
        navigate("/companies-data");
    };

    return (
        <div className="mt-5 ">
            <div className="mt-2 flex items-center">
                <div className="w-40 h-40 border-2 p-2 rounded-lg" onClick={handleClick} style={{ cursor: "pointer" }}>
                    <Doughnut
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                    align: "center",
                                    labels: {
                                        boxWidth: 0,
                                        color: currentTheme === 'dark' ? '#ffffff' : '#000000',
                                    },
                                },
                                tooltip: {
                                    enabled: false,
                                },
                            },
                        
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

CompanyGraph.propTypes = {
    registeredCompanies: PropTypes.number.isRequired,
    totalCompanies: PropTypes.number.isRequired,
    currentTheme: PropTypes.string.isRequired,
};

export default CompanyGraph;
