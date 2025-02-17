import { useFinancialRecords } from '../../contexts/financial-record-context';
import {
    DataGrid,
    GridActionsCellItem,
    GridActionsCellItemProps,
    GridColDef,
    GridRowId,
    GridRowModel} from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteRowActionItem({ deleteRow, ...props }: GridActionsCellItemProps & { deleteRow: () => void }) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete this record?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            deleteRow();
                        }}
                        color="warning"
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export const FinancialRecordList = () => {
    const { records, updateRecord, deleteRecord } = useFinancialRecords();

    const processRowUpdate = (newRow: GridRowModel): GridRowModel => {
        updateRecord(newRow._id ?? '', newRow);
        return newRow;
    };

    const deleteRow = React.useCallback(
        (id: GridRowId) => () => {
            setTimeout(() => {
                deleteRecord(id as string);
            });
        },
        []
    );

    const columns: GridColDef[] = [
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
            editable: true
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 150,
            type: 'number',
            editable: true
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Food', 'Rent', 'Salary', 'Utilities', 'Entertainment', 'Other']
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Credit Card', 'Cash', 'Bank Transfer']
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 200,
            type: 'dateTime',
            editable: false,
            valueGetter: (value) => {
                return new Date(value);
            }
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <DeleteRowActionItem label="Delete" icon={<DeleteIcon />} deleteRow={deleteRow(params.id)} closeMenuOnClick={false} />
            ]
        }
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                getRowId={(row) => row?._id}
                rows={records}
                columns={columns}
                processRowUpdate={processRowUpdate}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
            />
        </Box>
    );
};
