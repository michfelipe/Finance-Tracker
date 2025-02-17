import { useFinancialRecords } from '../../contexts/financial-record-context';
import {
    DataGrid,
    GridActionsCellItem,
    GridActionsCellItemProps,
    GridCellEditStopParams,
    GridColDef,
    GridEventListener,
    GridRowId,
    useGridApiRef
} from '@mui/x-data-grid';
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
                <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
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

    const apiRef = useGridApiRef();
    React.useEffect(() => {
        const handleCellEditStop: GridEventListener<'cellEditStop'> = (params: GridCellEditStopParams) => {
            const { row } = params;
            updateRecord(row._id ?? '', row);
        };
        return apiRef.current.subscribeEvent('cellEditStop', handleCellEditStop);
    }, [apiRef]);

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
            editable: true
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            width: 150,
            editable: true
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
                <DeleteRowActionItem
                    label="Delete"
                    showInMenu
                    icon={<DeleteIcon />}
                    deleteRow={deleteRow(params.id)}
                    closeMenuOnClick={false}
                />
            ]
        }
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                apiRef={apiRef}
                getRowId={(row) => row?._id}
                rows={records}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};
