import { Request, Response } from 'express';
import supabase from '../config/supabase';
import sanitizer from '../utils/stringSanitizer';

export default async function AddInventory(req:Request, res:Response) {
    try {
        const { name, cost_per_unit, available_quantity } = req.body;
        const ingredient_name               = sanitizer.sanitize(name);
        const ingredient_cost_per_unit      = Number(cost_per_unit);
        const ingredient_available_quantity = Number(available_quantity);

        if (!ingredient_name || !ingredient_cost_per_unit || !ingredient_available_quantity) {
            return res.status(400).json({
                message: "Invalid input"
            })
        }

        const { error } = await supabase.from('ingredients').insert([
            {
                name: ingredient_name,
                cost_per_unit: ingredient_cost_per_unit,
                available_quantity: ingredient_available_quantity
            }
        ])

        if (error) {
            return res.status(500).json({
                message: "Internal server error",
                reason: error
            })
        }

        return res.status(200).json({
            message: "Inventory added successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            reason: error
        })
    }
}