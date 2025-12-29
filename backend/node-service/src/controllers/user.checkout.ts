import { Request, Response } from 'express';
import { createSupabase } from '../config/supabase';
import { ErrorCodes, ErrorMessages } from '../utils/errorCodes';
import sanitizer from '../utils/stringSanitizer';

export default async function checkoutOrder (req: Request, res: Response) {
    const { checkout, name, contact, email, address, delivery_notes, notes } = req.body;

    try {
        const supabase = createSupabase( req.token );

    //checking out=======================================================================
        if(checkout) {
            if (!name || !contact || !email || !address || !delivery_notes || !notes || !sanitizer.validate.isEmail(email)) {
                res.status(400).json({
                    error: ErrorMessages.INVALID_INPUT,
                    code: ErrorCodes.INVALID_INPUT,
                });
                return;
            }
            const sanitizedName          = sanitizer.sanitize.keepSpace(name);
            const sanitizedContact       = sanitizer.sanitize.keepSpace(contact);
            const sanitizedEmail         = sanitizer.validate.isEmail(email);
            const sanitizedAddress       = sanitizer.sanitize.keepSpace(address);
            const sanitizedDeliveryNotes = sanitizer.sanitize.keepSpace(delivery_notes);
            const sanitizedNotes         = sanitizer.sanitize.keepSpace(notes);


        //first lets get all of the user checkout items
            const userCartItems = await
                supabase
                    .from('usercart')
                    .select('*')
                    .eq('usercart_id', req.user.id)
                    .single();

            if(userCartItems.error || userCartItems.data.length === 0) 
                return res.status(500).json({
                    error:  ErrorMessages.USER_CHECKOUT_NOT_FOUND,
                    code:   ErrorCodes.USER_CHECKOUT_NOT_FOUND,
                    reason: userCartItems.error
                });

        //then get only those are checked
            const checkedProducts = userCartItems.data.products.filter((product: any) => product.checked);
            if( checkedProducts.length === 0 )    
                return res.status(500).json({
                    error:  ErrorMessages.USER_CHECKOUT_NOT_FOUND,
                    code:   ErrorCodes.USER_CHECKOUT_NOT_FOUND,
                });

        //then get the products data
            let amount            = 0; //total amount without discount
            let discount          = 0; //total discount
            let discountAmount    = 0; //total discount amount
            let grandTotal        = 0; //total amount with discount
            for(let i = 0; i < checkedProducts.length; i++) {
                const currentProduct = await supabase
                    .from('products')
                    .select('*')
                    .eq('product_id', checkedProducts[i].product_id)
                    .single();
                amount         += checkedProducts[i].quantity * currentProduct.data.price_per_unit;
                discount       += checkedProducts[i].quantity * currentProduct.data.price_per_unit * (currentProduct.data.discount / 100);
                discountAmount += checkedProducts[i].quantity * currentProduct.data.price_per_unit * (currentProduct.data.discount / 100);
                grandTotal     += checkedProducts[i].quantity * currentProduct.data.price_per_unit * (1 - currentProduct.data.discount / 100);
            }   

        //then add the checkout to the table (so as of now the user order is pending for payment)
            const checkout = await supabase
                .from('checkout')
                .insert([
                    {
                        user_id:        req.user.id,
                        status:         'pending',
                        products:       checkedProducts,
                        total_amount:   amount,
                        discount:       discount,
                        discount_amount:discountAmount,
                        grand_total:    grandTotal,
                        name:           sanitizedName,
                        email:          sanitizedEmail,
                        contact:        sanitizedContact,
                        address:        sanitizedAddress,
                        delivery_note:  sanitizedDeliveryNotes,
                        notes:          sanitizedNotes,
                    }
                ])
                .single();

            if(checkout.error)
                return res.status(500).json({
                    error:  ErrorMessages.USER_CHECKOUT_ERROR,
                    code:   ErrorCodes.USER_CHECKOUT_ERROR,
                    reason: checkout.error
                });
        
        //now it is time to remove the usercart items
            const newCart = userCartItems.data.products.filter((item: any) => item.checked === false);
            await supabase
                .from('usercart')
                .update({ products: newCart })
                .eq('usercart_id', req.user.id)
                .single();

            return res.json({
                message: 'User check',
                data: {
                    amount,
                    discount,
                    discountAmount,
                    grandTotal,
                    orderitem: checkedProducts.length
                },
                auth: req.newToken && req.newRefreshToken ?
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }
  
//==================================================================================================
//==================================================================================================
//user order========================================================================================
        const GetUserCheckout = await supabase.from('checkout').select('*').eq('user_id', req.user.id);
        if(GetUserCheckout.error || GetUserCheckout.data.length === 0) 
            return res.status(500).json({
                error:  ErrorMessages.USER_CHECKOUT_NOT_FOUND,
                code:   ErrorCodes.USER_CHECKOUT_NOT_FOUND,
            });

        return res.json({
            message: 'User checkout/pending orders',
            data:     GetUserCheckout.data,
            auth: req.newToken && req.newRefreshToken ?
            {
                token:        req.newToken,
                refreshToken: req.newRefreshToken
            }
            :
            null
        });
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error:  ErrorMessages.SERVER_ERROR,
            code:   ErrorCodes.SERVER_ERROR,
            reason: error
        })
    }
}