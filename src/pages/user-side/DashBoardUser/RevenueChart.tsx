import { useState, useEffect } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const SplineAreaChart = () => {
    const [chartHeight, setChartHeight] = useState(320);

    useEffect(() => {
        const updateChartHeight = () => {
            if (window.innerWidth > 2000) {
                setChartHeight(560); 
            } else {
                setChartHeight(274);
            }
        };

        window.addEventListener('resize', updateChartHeight); 
        updateChartHeight(); 

        return () => window.removeEventListener('resize', updateChartHeight); 
    }, []);


    const apexAreaChart1Opts: ApexOptions = {
        chart: {
            height: 360,
            type: 'area',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false, 
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 3,
            curve: 'smooth',
        },
        colors: ['#35b8e0', '#41C56D'],
        legend: {
            offsetY: 0,
        },
        xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        tooltip: {
            enabled: true,
            fixed: {
                enabled: false,
                position: 'topRight',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.2,
            },
            borderColor: '#f7f7f7',
        },
    };
    
    // Dados do gráfico SplineArea
    const apexAreaChart1Data = [
        {
            name: 'Rendimentos',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'Retiradas',
            data: [11, 32, 45, 32, 34, 52, 41],
            
        },
    ];

    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Semanal</Dropdown.Item>
                        <Dropdown.Item>Mensal</Dropdown.Item>
                        <Dropdown.Item>Anual</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mt-0">Histórico de Rendimentos</h4>

                <div dir="ltr">
                    <Chart
                        options={apexAreaChart1Opts}
                        series={apexAreaChart1Data}
                        type="area"
                        height={chartHeight} // Altura dinâmica com base no tamanho da tela
                        className="apex-charts mt-2"
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default SplineAreaChart;
