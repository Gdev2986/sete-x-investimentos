export type Record = {
    id: number;  
    nome: string; 
    totalAlocado: number;
    saldoAtual: number; 
    contato: string;
    email: string; 
};


export type ExpandableRecord = {
    id: number;
    age: number;
    name: string;
    company: string;
    phone: string;
    subRows: [
        {
            id: number;
            age: number;
            name: string;
            company: string;
            phone: string;
        },
    ];
};
