// src/StockChart.js

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const StockChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(
                    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=TSLA&apikey=33JT82ZB76Z0MASS`
                );

                const data = response.data['Time Series (Daily)'];
                const dates = Object.keys(data).reverse();
                const prices = dates.map(date => data[date]['4. close']);

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'TSLA Stock Price',
                            data: prices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStockData();
    }, []);

    return (
        <div>
            <h2>TSLA Stock Chart</h2>
            <Line data={chartData} />
        </div>
    );
};

export default StockChart;
