import express, { Request, Response } from 'express';
import FinancialRecordModel from '../schema/financial-record';

const router = express.Router();

router.get('/getAllByUserID/:userId', async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.userId;
        const records = await FinancialRecordModel.find({ userId: userId });
        if (records.length === 0) {
            console.log('No records found for the user');
            return res.status(200).send([]);
        }
        return res.status(200).send(records);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const newRecordBody = req.body;
        const newRecord = new FinancialRecordModel(newRecordBody);
        const savedRecord = await newRecord.save();
        return res.status(200).send(savedRecord);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.put('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await FinancialRecordModel.findByIdAndUpdate(id, newRecordBody);
        if (!record) {
            return res.status(404).send();
        }
        return res.status(200).send(record);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(id);
        if (!record) {
            return res.status(404).send();
        }
        return res.status(200).send(record);
    } catch (err) {
        return res.status(500).send(err);
    }
});

export default router;
