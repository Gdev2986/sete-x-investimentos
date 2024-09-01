import { useState, useEffect } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const RevenueChart = () => {
    const [chartHeight, setChartHeight] = useState(320); // Altura padrão para monitores menores

    useEffect(() => {
        const updateChartHeight = () => {
            if (window.innerWidth > 2000) {
                setChartHeight(660); // Altura para monitores maiores
            } else {
                setChartHeight(273); // Altura padrão para monitores menores
            }
        };

        window.addEventListener('resize', updateChartHeight); // Adiciona o listener para redimensionamento da janela
        updateChartHeight(); // Chama uma vez para definir o valor inicial

        return () => window.removeEventListener('resize', updateChartHeight); // Limpeza ao desmontar o componente
    }, []);

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
            },
            stacked: false,
            zoom: {
                enabled: false,
            },
        },
        stroke: {
            curve: 'smooth',
            width: [3, 3],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
        },
        fill: {
            type: 'solid',
            opacity: [0, 1],
        },
        colors: ['#3cc469', '#188ae2'],
        xaxis: {
            categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#adb5bd',
                },
            },
        },
        yaxis: {
            tickAmount: 4,
            min: 0,
            max: 100,
            labels: {
                style: {
                    colors: '#adb5bd',
                },
            },
        },
        grid: {
            show: false,
            padding: {
                top: 0,
                bottom: 0,
            },
        },
        tooltip: {
            theme: 'dark',
        },
    };

    const series = [
        {
            name: 'Series A',
            type: 'area',
            data: [50, 75, 30, 50, 75, 50, 75, 100],
        },
        {
            name: 'Series B',
            type: 'line',
            data: [0, 40, 80, 40, 10, 40, 50, 70],
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
                        options={options}
                        series={series}
                        type="line"
                        height={chartHeight} // Altura dinâmica com base no tamanho da tela
                        className="apex-charts mt-2"
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default RevenueChart;
