import { Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';

const SalesChart = () => {
    const [chartHeight, setChartHeight] = useState(410); // Estado para a altura do gráfico

    // Função para atualizar a altura do gráfico com base na altura da janela
    const updateChartHeight = () => {
        const screenHeight = window.innerHeight;
        if (window.innerWidth > 2000) {
                setChartHeight(592); // Altura para monitores maiores
            } else {
                setChartHeight(307); // Altura padrão para monitores menores
            }
    };

    // useEffect para atualizar a altura no carregamento e ao redimensionar a tela
    useEffect(() => {
        updateChartHeight(); // Chamada inicial

        // Atualiza a altura do gráfico ao redimensionar a janela
        window.addEventListener('resize', updateChartHeight);
        return () => window.removeEventListener('resize', updateChartHeight);
    }, []);

    const apexOpts: ApexOptions = {
        chart: {
            type: 'donut',
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            formatter: (val: string) => {
                                return val;
                            },
                            offsetY: 4,
                            color: '#98a6ad',
                        },
                        value: {
                            show: true,
                            formatter: (val: string) => {
                                return val;
                            },
                            color: '#98a6ad',
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#6658dd', '#41C56D', '#F4FF00'],
        legend: {
            show: true,
            position: 'bottom',
            height: 40,
            labels: {
                useSeriesColors: true,
            },
        },
        labels: ['Total Alocado', 'Rendimento Clientes', 'Rendimento Sete X'],
        tooltip: {
            enabled: false,
        },
    };

    const apexData = [30, 12, 20];

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0">Resumo</h4>

                <div dir="ltr">
                    <Chart
                        options={apexOpts}
                        series={apexData}
                        type="donut"
                        height={chartHeight} // Altura dinâmica
                        className="apex-charts mt-2"
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default SalesChart;
