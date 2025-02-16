import { createContext, useContext, useState } from 'react';

interface FinancialRecord {
    id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordsConextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    // updateRecord: (id: string, record: Partial<FinancialRecord>) => void;
    // deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<FinancialRecordsConextType | undefined>(undefined);

export const FinancialRecordsProvider = ({ children }: { children: React.ReactNode }) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch('http://localhost:3001/financial-records', {
            method: 'POST',
            body: JSON.stringify(record),
            headers: { 'Content-Type': 'application/json' }
        });
        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (err) {
            console.error('Failed to add record: ', err);
        }
    };

    return <FinancialRecordsContext.Provider value={{ records, addRecord }}> {children}</FinancialRecordsContext.Provider>;
};

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsConextType | undefined>(FinancialRecordsContext);

    if (!context) {
        throw new Error('useFinancialRecords must be used within a FinancialRecordsProvider');
    }

    return context;
};
