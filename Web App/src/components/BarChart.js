import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const BarChart = (props) => {
    const history = props.history

    let date = []
    let price = []

    for (let index = 0; index < history.length; index++) {
        date.push(history[index].orderDate)
        price.push(history[index].price)
    }
    return(
        <div style={{
                margin: 65,
                backgroundColor: "white"
            }}>
            <Line
                data={{
                    labels: date,
                    datasets: [{
                        label: "Quantity",
                        data: price,
                        backgroundColor: "orange",
                        borderColor: "red",
                        borderWidth: 2
                    },
                ]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export default BarChart