import { useUser } from '@clerk/clerk-react';
import { FinancialRecordForm } from './financial-record-form';
import { FinancialRecordList } from './financial-record-list';
import { useFinancialRecords } from '../../contexts/financial-record-context';
import { useMemo } from 'react';
import Grid from '@mui/material/Grid2';
import Item from '@mui/material/Grid2';

export const Dashboard = () => {
    const { user } = useUser();
    const { records } = useFinancialRecords();

    const totalMonthly: number = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount;
        });
        return totalAmount;
    }, [records]);

    return (
        <Grid
            sx={{
                justifyContent: 'center',
                alignItems: 'flex-end'
            }}
            container
            rowSpacing={2}
        >
            <h1> Welcome {user?.firstName}! Here are your finances: </h1>
            <Grid size={8}>
                <Item>
                    <>Total Monthly: {totalMonthly}</>
                </Item>
            </Grid>
            <Grid size={8}>
                <Item>
                    <FinancialRecordForm />
                </Item>
            </Grid>
            <Grid size={8}>
                <Item>
                    <FinancialRecordList />
                </Item>
            </Grid>
        </Grid>
    );
};
