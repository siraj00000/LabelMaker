import { NextFunction, Request, Response, query } from "express";
import Brand from "../models/brand.model.js";
import Company from "../models/company.model.js";
import Manufacturer from "../models/manufacturer.model.js";
import Account from "../models/accounts.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import Label, { ILabel } from "../models/label.model.js";
import { ErrorResponse } from "../utils/error_response.utils.js";
import dateFormat from "../utils/dateFormat.js";
import getDates from "../utils/dateFormat.js";

class CombineController {
    // Fetch Brands & Select Id and Name or Title.
    public async fetchCompanyBrands(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Fetch active status brands
            const activeBrands = await Brand.find({ status: 'show', company_id: req.account?.associatedId }).select('name');

            res.status(200).json({ success: true, data: activeBrands });
        } catch (error) {
            next(error);
        }
    }

    // Fetch Subcategories & Select Id and Name or Title.
    public async fetchCompanySubcategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const getUserCompanySubcategory = await Company.findById(req.account?.associatedId).populate({
                path: "sub_category",
                select: "title features",
                model: "Subcategory"
            })

            res.status(200).json({ success: true, data: getUserCompanySubcategory?.sub_category });
        } catch (error) {
            next(error);
        }
    }

    // Fetch Manufacture's company Brands & Select Id and Name or Title.
    public async fetchManufacturerBrands(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const associatedId = req.account?.associatedId;

            const activeBrands = await Brand.aggregate([
                {
                    $match: {
                        status: 'show'
                    }
                },
                {
                    $lookup: {
                        from: 'manufacturers',
                        localField: 'company_id',
                        foreignField: 'company_id',
                        as: 'manufacturer'
                    }
                },
                {
                    $unwind: '$manufacturer'
                },
                {
                    $match: {
                        'manufacturer._id': associatedId
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1
                    }
                }
            ]);

            res.status(200).json({ success: true, data: activeBrands });
        } catch (error) {
            next(error);
        }
    }

    public async fetchManufacturerBrandProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const brandId = req.params.brand_id;

            const activeProducts = await Product.aggregate([
                {
                    $match: {
                        status: 'show',
                        brand_id: new mongoose.Types.ObjectId(brandId) // Convert brandId to ObjectId
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        feature: 1
                    }
                }
            ]);

            res.status(200).json({ success: true, data: activeProducts })
        } catch (error) {
            next(error);
        }
    }

    public async fetchAccessibiltyAssociatesCollections(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Fetch active status Companies
            const activeCompanies = await Company.find({ status: 'show' }).select('name');
            // Fetch active status Manufacturers
            const activeManufacturers = await Manufacturer.find({ status: 'active' }).select('name');
            // Fetch active status Accounts
            const accounts = await Account.find({ status: 'active', role: 'Company Admin' || 'Manufacturer' }).select('name role');

            res.status(200).json({ success: true, data: { activeCompanies, activeManufacturers, accounts } });
        } catch (error) {
            next(error);
        }
    }

    public async roleBasedInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let user = req.account
            res.status(200).json({ user })
        } catch (error) {
            next(error)
        }
    }

    public async superAdminLabelStats(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Extract and validate query parameters
            const { date } = req.query;
            if (typeof date !== 'string') throw new ErrorResponse(400, 'Please provide a valid date');

            // Extracts the start date and end date based on the user-provided date, spanning two months.
            const { startDate, endDate } = getDates(date, 2);

            const company = await Company.find({ user_id: req.account?._id });

            const company_id = req.query.companyId ? req.query.companyId : company.map(_company => _company._id)

            const manufacturerFilter: Record<string, any> = {
                company_id: { $in: company_id }
            }

            // Find manufacturers associated with the given company_id
            const manufacturers = await Manufacturer.find(manufacturerFilter);

            // Extract manufacturer_ids from the found manufacturers
            const manufacturerIds = manufacturers.map(manufacturer => manufacturer._id);

            // Construct filter criteria based on query parameters.
            // Filters records based on creation date falling within the range of 2 months before the start date to the start date.
            const filter: Record<string, any> = {
                createdAt: {
                    $gt: endDate, // Records created after 2 months ago.
                    $lte: startDate // Records created within the last 2 months.
                },
                manufacture_id: { $in: manufacturerIds } // Filter labels by found manufacturer_ids
            };

            // Extracts additional query parameters such as brand ID, product ID, variant, and user ID.
            // If these parameters are provided in the request, they are added to the filter criteria. 
            ["brand_id", "product_id", "variant", "user_id"].forEach((query: string) => {
                if (req.query[query]) filter[query] = req.query[query]; // Adds the specific query parameter to the filter criteria.
            });

            // Fetch labels based on the filter criteria and populate the 'user_id' field with user data.
            const labels: ILabel[] = await Label
                .find(filter).populate({
                    path: 'user_id',
                    select: 'name', // Select only the 'name' field from the user document.
                    model: 'Account'
                });

            // Group labels by month and calculate the count for each month
            const monthLabelCounts: Record<string, number> = {};
            labels.forEach(label => {
                const monthYear = label.createdAt.toISOString().slice(0, 7); // Extracts YYYY-MM format from label's creation date
                const monthName = new Date(monthYear + "-01").toLocaleString('en-us', { month: 'short' }); // Converts YYYY-MM to month abbreviation
                monthLabelCounts[monthName] = (monthLabelCounts[monthName] || 0) + 1;
            });

            const getObjectValue = (obj: any, key: string) => {
                return obj[key];
            }

            // Aggregate labels based on unique user_ids and count the labels for each user.
            const userLabelCounts: Record<string, { name: string, count: number, progress: number }> = {};
            labels.forEach(label => {
                const userName = getObjectValue(label.user_id, 'name');
                let count = (userLabelCounts[userName]?.count || 0) + 1;
                userLabelCounts[userName] = {
                    name: userName,
                    count,
                    progress: Math.round(count / labels.length * 100)
                };
            });

            // Send the response with the calculated data
            res.status(200).json({
                success: true,
                data: {
                    userLabelCounts,
                    totalLabelsCount: labels.length,
                    monthLabelCounts
                },
            });
        } catch (error) {
            next(error)
        }
    }

    public async companyLabelStats(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Extract and validate query parameters
            const { date } = req.query;
            if (typeof date !== 'string') throw new ErrorResponse(400, 'Please provide a valid date');

            // Extracts the start date and end date based on the user-provided date, spanning two months.
            const { startDate, endDate } = getDates(date, 2);

            // Find manufacturers associated with the given company_id
            const manufacturers = await Manufacturer.find({ company_id: req.account?.associatedId });

            // Extract manufacturer_ids from the found manufacturers
            const manufacturerIds = req.query.manufacture_id ? req.query.manufacture_id : manufacturers.map(manufacturer => manufacturer._id);

            // Construct filter criteria based on query parameters.
            // Filters records based on creation date falling within the range of 2 months before the start date to the start date.
            const filter: Record<string, any> = {
                createdAt: {
                    $gt: endDate, // Records created after 2 months ago.
                    $lte: startDate // Records created within the last 2 months.
                },
                manufacture_id: { $in: manufacturerIds } // Filter labels by found manufacturer_ids
            };

            // Extracts additional query parameters such as brand ID, product ID, variant, and user ID.
            // If these parameters are provided in the request, they are added to the filter criteria. 
            ["brand_id", "product_id", "variant", "user_id"].forEach((query: string) => {
                if (req.query[query]) filter[query] = req.query[query]; // Adds the specific query parameter to the filter criteria.
            });

            // Fetch labels based on the filter criteria and populate the 'user_id' field with user data.
            const labels: ILabel[] = await Label
                .find(filter).populate({
                    path: 'user_id',
                    select: 'name', // Select only the 'name' field from the user document.
                    model: 'Account'
                });

            // Group labels by month and calculate the count for each month
            const monthLabelCounts: Record<string, number> = {};
            labels.forEach(label => {
                const monthYear = label.createdAt.toISOString().slice(0, 7); // Extracts YYYY-MM format from label's creation date
                const monthName = new Date(monthYear + "-01").toLocaleString('en-us', { month: 'short' }); // Converts YYYY-MM to month abbreviation
                monthLabelCounts[monthName] = (monthLabelCounts[monthName] || 0) + 1;
            });

            const getObjectValue = (obj: any, key: string) => {
                return obj[key];
            }

            // Aggregate labels based on unique user_ids and count the labels for each user.
            const userLabelCounts: Record<string, { name: string, count: number, progress: number }> = {};
            labels.forEach(label => {
                const userName = getObjectValue(label.user_id, 'name');
                let count = (userLabelCounts[userName]?.count || 0) + 1;
                userLabelCounts[userName] = {
                    name: userName,
                    count,
                    progress: Math.round(count / labels.length * 100)
                };
            });

            // Send the response with the calculated data
            res.status(200).json({
                success: true,
                data: {
                    userLabelCounts,
                    totalLabelsCount: labels.length,
                    monthLabelCounts
                },
            });
        } catch (error) {
            next(error)
        }
    }

    public async manufacturerLabelStat(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Extract and validate parameters from the request body
            const { date, brand_ids, product_ids, variants, user_ids } = req.body;
            if (typeof date !== 'string') throw new ErrorResponse(400, 'Please provide a valid date');

            // Extracts the start date and end date based on the user-provided date, spanning two months.
            const { startDate, endDate } = getDates(date, 2);

            // Construct filter criteria based on query parameters.
            // Filters records based on creation date falling within the range of 2 months before the start date to the start date.
            const filter: Record<string, any> = {
                createdAt: {
                    $gt: endDate, // Records created after 2 months ago.
                    $lte: startDate // Records created within the last 2 months.
                }
            };

            // Add brand IDs, product IDs, variants, and user IDs from the request body to the filter criteria.
            if (Array.isArray(brand_ids)) filter.brand_id = { $in: brand_ids };
            if (Array.isArray(product_ids)) filter.product_id = { $in: product_ids };
            if (Array.isArray(variants)) filter.variant = { $in: variants };
            if (Array.isArray(user_ids)) filter.user_id = { $in: user_ids };


            // Fetch labels based on the filter criteria and populate the 'user_id' field with user data.
            const labels: ILabel[] = await Label
                .where({ manufacture_id: req.account?.associatedId })
                .find(filter).populate({
                    path: 'user_id',
                    select: 'name', // Select only the 'name' field from the user document.
                    model: 'Account'
                });

            // Group labels by month and calculate the count for each month
            const monthLabelCounts: Record<string, number> = {};
            labels.forEach(label => {
                const monthYear = label.createdAt.toISOString().slice(0, 7); // Extracts YYYY-MM format from label's creation date
                const monthName = new Date(monthYear + "-01").toLocaleString('en-us', { month: 'short' }); // Converts YYYY-MM to month abbreviation
                monthLabelCounts[monthName] = (monthLabelCounts[monthName] || 0) + 1;
            });

            const getObjectValue = (obj: any, key: string) => {
                return obj[key];
            }

            // Aggregate labels based on unique user_ids and count the labels for each user.
            const userLabelCounts: Record<string, { name: string, count: number, progress: number }> = {};
            labels.forEach(label => {
                const userName = getObjectValue(label.user_id, 'name');
                let count = (userLabelCounts[userName]?.count || 0) + 1;
                userLabelCounts[userName] = {
                    name: userName,
                    count,
                    progress: Math.round(count / labels.length * 100)
                };
            });

            // Fetch count of Admins, Product, Brands and Label associated with the manufacturer's and it's company
            const manufacturer = await Manufacturer.findById(req.account?.associatedId).select('company_id')
            const brandsCount = await Brand.find({ company_id: manufacturer?.company_id }).count();
            const productsCount = await Product.find({ company_id: manufacturer?.company_id }).count();
            const adminCount = await Account.find({ associatedId: req.account?.associatedId }).count();
            const labelCount = await Label.find({ manufacture_id: req.account?.associatedId }).count();

            // Send the response with the calculated data
            res.status(200).json({
                success: true,
                data: {
                    userLabelCounts,
                    totalLabelsCount: labels.length,
                    monthLabelCounts,
                    stats: {

                        brandsCount,
                        productsCount,
                        adminCount,
                        labelCount
                    }
                },
            });
        } catch (error) {
            // Handle errors and pass them to the error handling middleware
            next(error);
        }
    }

    public async manufacturerLabelStats(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { date, brand_ids, product_ids, variants, user_ids } = req.body;

            if (typeof date !== 'string') {
                throw new ErrorResponse(400, 'Please provide a valid date');
            }

            const { startDate, endDate } = getDates(date, 2);

            const filter: Record<string, any> = {
                createdAt: {
                    $gt: endDate,
                    $lte: startDate
                }
            };

            if (brand_ids) filter.brand_id = { $in: brand_ids };
            if (product_ids) filter.product_id = { $in: product_ids };
            if (variants) filter.variant = { $in: variants };
            if (user_ids) filter.user_id = { $in: user_ids };

            const labels: ILabel[] = await Label
                .where({ manufacture_id: req.account?.associatedId })
                .find(filter)
                .populate({
                    path: 'user_id',
                    select: 'name',
                    model: 'Account'
                });

            const userLabelCounts = new Map<string, { name: string, count: number, progress: number }>();
            const monthLabelCounts: Record<string, number> = {};

            // Initialize monthLabelCounts with all months having a count of 0
            const currentDate = new Date(endDate);

            while (currentDate <= startDate) {
                const monthName = currentDate.toLocaleString('en-us', { month: 'short' });
                monthLabelCounts[monthName] = 0;

                // Move to the next month
                currentDate.setMonth(currentDate.getMonth() + 1);
            }

            const getObjectValue = (obj: any, key: string) => {
                return obj[key];
            }

            labels.forEach(label => {
                const monthYear = label.createdAt.toISOString().slice(0, 7);
                const monthName = new Date(monthYear + "-01").toLocaleString('en-us', { month: 'short' });
                monthLabelCounts[monthName] = (monthLabelCounts[monthName] || 0) + 1;

                const userName = getObjectValue(label.user_id, 'name');
                const userLabel = userLabelCounts.get(userName) || { name: userName, count: 0, progress: 0 };
                userLabel.count += 1;
                userLabel.progress = Math.round((userLabel.count / labels.length) * 100);
                userLabelCounts.set(userName, userLabel);
            });

            const manufacturer = await Manufacturer.findById(req.account?.associatedId).select('company_id');
            const [brandsCount, productsCount, adminCount, labelCount] = await Promise.all([
                Brand.find({ company_id: manufacturer?.company_id }).count(),
                Product.find({ company_id: manufacturer?.company_id }).count(),
                Account.find({ associatedId: req.account?.associatedId }).count(),
                Label.find({ manufacture_id: req.account?.associatedId }).count()
            ]);

            res.status(200).json({
                success: true,
                data: {
                    userLabelCounts: Array.from(userLabelCounts.values()),
                    monthLabelCounts,
                    stats: {
                        brandsCount,
                        productsCount,
                        adminCount,
                        labelCount
                    }
                },
            });
        } catch (error) {
            next(error);
        }
    }

}

export default new CombineController()