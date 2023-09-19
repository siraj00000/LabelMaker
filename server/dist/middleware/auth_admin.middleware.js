import Account from '../models/admin/auth/accounts.model.js';
import { ErrorResponse } from '../utils/error_response.utils.js';
const authAdmin = async (req, res, next) => {
    try {
        const account = await Account.findOne({
            _id: req.account?.id
        });
        if (account?.role !== 'admin')
            return next(new ErrorResponse(400, 'Admin resources are denied'));
        next();
    }
    catch (error) {
        next(error);
    }
};
export default authAdmin;
//# sourceMappingURL=auth_admin.middleware.js.map