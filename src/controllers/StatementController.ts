import { Request, Response } from "express";
import { StatementService } from "../services/StatementService";

class StatementController {
    
    private statementService: StatementService;

    constructor() {
        this.statementService = new StatementService();
    }

    deposit = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id;
            const { amount, description } = req.body;

            if (!amount || !description) {
                return res.status(400).json({error: "Invalid amount or description."});
            }

            const statement = 
                await this.statementService.deposit(idCheckingAccount, amount, description);
            return res.status(201).json(statement);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating deposit ${error}`);
                return res.status(400).json({error: error.message});
            } else {
                console.error(`Unexpected error ${error}`);
                return res.status(500).json({error: "An unexpected error ocurred."});
            }
        }
    }

    getStatement = async(req:Request, res:Response) => {
        try {
            const idCheckingAccount = req.params.id;
            const statement = await this.statementService.getAll(idCheckingAccount);
            return res.status(200).json(statement);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error fetching statment ${error.message}`);
                return res.status(400).json({error: error.message});
            } else {
                console.error(`Unexpected error ${error}`);
                return res.status(500).json({error: "An unexpected error ocurred."});
            }
        }
    }

    getBalance = async(req:Request, res:Response) => {
        try {
            const idCheckingAccount = req.params.id;
            const balance = await this.statementService.getBalance(idCheckingAccount);
            return res.status(200).json({ balance });
        } catch (error) {
            if(error instanceof Error) {
                console.error(`Error fetching balance. ${error.message}`);
                return res.status(400).json({error: "Error fetching balance."});
            } else {
                console.error(`Unexpected error ${error}`);
                res.status(500).json({error: "An unexpected error ocurred."});
            }
        }
    }

    withdraw = async(req:Request, res:Response) => {
        try {
            const idCheckingAccount = req.params.id;
            const { amount, description } = req.body;

            if(!amount || !description) {
                return res.status(400).json({error: "Invalid amount or description."});
            }
            const withdraw = await this.statementService.withdraw(idCheckingAccount, amount, description);
            return res.status(201).json(withdraw);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating withdraw. ${error}`);
                return res.status(400).json({error: `Error creating withdraw. ${error.message}`});
            } else {
                console.error(`Unexpected error ${error}`);
                return res.status(500).json({error: "An unexpected error ocurred"});
            }
        }
    }

    // checkingaccounts/121321321321?startdate='2024-01-01'&enddate='2024-08-31'
    getByPrtiod = async(req:Request, res:Response) => {
        try {
            const idCheckingAccount = req.params.id;
            const { startDate, endDate } = req.query;
            if(!startDate || !endDate) {
                return res.status(400).json({error: "Start date and end date are required."});
            }
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return res.status(400).json({error: "Invalid date format."});
            }
            const statement = await this.statementService.getByPeriod(idCheckingAccount, start, end);
            return res.status(200).json(statement);
        } catch (error) {
            
        }
    }
    
}

export { StatementController }