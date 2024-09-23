
export interface Rendimento {
    id: string;
    data: string;
    valorAlocado: number;
    lucroBruto: number;
    impostos: number;
    percentualClientes: number;
    lucroReal: number;
}

// Dados dos rendimentos
export const retiradas: Rendimento[] = [
    {
        id: '12345678',
        data: '01/08/2024',
        valorAlocado: 50000,
        lucroBruto: 10000,
        impostos: 2000, 
        percentualClientes: 160, 
        lucroReal: 7840,
    },
    {
        id: '23456789',
        data: '02/08/2024',
        valorAlocado: 60000,
        lucroBruto: 12000,
        impostos: 2400,
        percentualClientes: 192,
        lucroReal: 9408,
    },
    {
        id: '34567890',
        data: '03/08/2024',
        valorAlocado: 75000,
        lucroBruto: 15000,
        impostos: 3000,
        percentualClientes: 240,
        lucroReal: 11760,
    },
    {
        id: '45678901',
        data: '04/08/2024',
        valorAlocado: 40000,
        lucroBruto: 8000,
        impostos: 1600,
        percentualClientes: 128,
        lucroReal: 6272,
    },
    {
        id: '56789012',
        data: '05/08/2024',
        valorAlocado: 47500,
        lucroBruto: 9500,
        impostos: 1900,
        percentualClientes: 152,
        lucroReal: 7448,
    },
    {
        id: '67890123',
        data: '06/08/2024',
        valorAlocado: 55000,
        lucroBruto: 11000,
        impostos: 2200,
        percentualClientes: 176,
        lucroReal: 8624,
    },
    {
        id: '78901234',
        data: '07/08/2024',
        valorAlocado: 35000,
        lucroBruto: 7000,
        impostos: 1400,
        percentualClientes: 112,
        lucroReal: 5488,
    },
    {
        id: '89012345',
        data: '08/08/2024',
        valorAlocado: 65000,
        lucroBruto: 13000,
        impostos: 2600,
        percentualClientes: 208,
        lucroReal: 10192,
    },
    {
        id: '90123456',
        data: '09/08/2024',
        valorAlocado: 70000,
        lucroBruto: 14000,
        impostos: 2800,
        percentualClientes: 224,
        lucroReal: 10976,
    },
    {
        id: '01234567',
        data: '10/08/2024',
        valorAlocado: 80000,
        lucroBruto: 16000,
        impostos: 3200,
        percentualClientes: 256,
        lucroReal: 12544,
    },
];
