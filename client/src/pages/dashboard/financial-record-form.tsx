import { FormControl, InputLabel, Select, MenuItem, TextField, Button, InputAdornment, SelectChangeEvent } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';

export const FinancialRecordForm = () => {
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');

    const { user } = useUser();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newRecord = {
            userId: user?.id,
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod
        };

        // addRecord(newRecord)

        setDescription('');
        setAmount('');
        setCategory('');
        setPaymentMethod('');
    };

    const onDesciptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const onCategoryChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value);
    };

    const onPaymentMethodChange = (event: SelectChangeEvent<string>) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth required>
                <TextField id="description" label="Description" value={description} onChange={onDesciptionChange} />
            </FormControl>
            <FormControl fullWidth required>
                <TextField
                    id="amount"
                    type="number"
                    label="Amount"
                    value={amount}
                    onChange={onAmountChange}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }
                    }}
                />
            </FormControl>
            <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select labelId="category-label" id="category-select" label="Category" value={category} onChange={onCategoryChange}>
                    <MenuItem value={'Food'}>Food</MenuItem>
                    <MenuItem value={'Rent'}>Rent</MenuItem>
                    <MenuItem value={'Salary'}>Salary</MenuItem>
                    <MenuItem value={'Utilities'}>Utilities</MenuItem>
                    <MenuItem value={'Entertainement'}>Entertainement</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth required>
                <InputLabel id="payment-label">Payment Method</InputLabel>
                <Select
                    labelId="payment-label"
                    id="payment-select"
                    label="Payment Method"
                    value={paymentMethod}
                    onChange={onPaymentMethodChange}
                >
                    <MenuItem value={'Credit Card'}>Credit Card</MenuItem>
                    <MenuItem value={'Cash'}>Cash</MenuItem>
                    <MenuItem value={'Bank Transfer'}>Bank Transfer</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" type="submit">
                Add Record
            </Button>
        </form>
    );
};
