import { Request, Response, NextFunction } from 'express';
import Account from '../models/admin/auth/accounts.model.js';
import { ErrorResponse } from '../utils/error_response.utils.js';

const authAdmin = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const account = await Account.findOne({
            _id: req.account?.id
        });
        if (account?.role !== 'admin') return next(new ErrorResponse(400, 'Admin resources are denied'));
        
        next();
    } catch (error) {
        next(error);
    }
};

export default authAdmin;
