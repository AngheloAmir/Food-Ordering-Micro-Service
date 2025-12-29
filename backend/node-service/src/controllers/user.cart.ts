import { Request, Response } from 'express';
import { createSupabase } from '../config/supabase';
import { ErrorCodes, ErrorMessages } from '../utils/errorCodes';
import { ValidateUserCartRequest } from '../utils/objectValidation';

interface CartUserData {
    product_id: string;
    quantity:   number;
    checked:    boolean;
}

export default async function userCarts (req: Request, res: Response) {
    try {
        const supabase = createSupabase( req.token );

    //return the user cart=====================================================================
    if( !req.body.update && !req.body.product_id && !req.body.quantity ) {
        const userCartInfo = await supabase.from('usercart').select('*').single();
        if (userCartInfo.error) {
            res.status(500).json({
                error: ErrorMessages.SERVER_ERROR,
                code:  ErrorCodes.SERVER_ERROR,
            })
        }

        //populate the user cart
        const productInUserCart = [];
        for(let i = 0; i < userCartInfo.data.products.length; i++) {
            const { error, data } = await supabase
                .from('products')
                .select('*')
                .eq('product_id', userCartInfo.data.products[i].product_id)
                .single();

            //skip invalid item
            if (error || !data) 
                continue;

            productInUserCart.push({
                product_id: userCartInfo.data.products[i].product_id,
                quantity:   userCartInfo.data.products[i].quantity,
                checked:    userCartInfo.data.products[i].checked,
                info: {
                    name:           data.name,
                    price:          data.price,
                    discount:       data.discount,
                    description:    data.description,
                    image:          data.image,
                    price_per_unit: data.price_per_unit,
                    est_cook_time:  data.est_cook_time,
                    category:       data.category,
                    prefix:         data.prefix,
                    special:        data.special,
                },
                totalprice: userCartInfo.data.products[i].quantity * data.price_per_unit,
                newprice:   userCartInfo.data.products[i].quantity * data.price_per_unit * (1 - data.discount / 100),
                discount:   userCartInfo.data.products[i].quantity * data.price_per_unit * (data.discount / 100),
            })
        }

        res.json({
            message: 'User cart information',
            data: productInUserCart,
            auth: req.newToken && req.newRefreshToken ?
            {
                token:        req.newToken,
                refreshToken: req.newRefreshToken
            }
            :
            null
        });
    }

    //=========================================================================================
    if(req.body.update) {
        const products = req.body.products;
        if (! ValidateUserCartRequest(products) || !products) {
            return res.status(400).json({
                error: ErrorMessages.INVALID_INPUT,
                code:  ErrorCodes.INVALID_INPUT,
            })
        }

        const updateResult = await supabase
            .from('usercart')
            .update({
                products: req.body.products
            })
            .eq('usercart_id', req.user.id);

        if (updateResult.error) {
            console.log(updateResult.error);
            return res.status(500).json({
                error: ErrorMessages.SERVER_ERROR,
                code:  ErrorCodes.SERVER_ERROR,
            })
        }

        return res.json({
            message: 'User cart updated successfully',
            data: updateResult.data,
            auth: req.newToken && req.newRefreshToken ?
            {
                token:        req.newToken,
                refreshToken: req.newRefreshToken
            }
            :
            null
        });
    }

    //=========================================================================================
    if( !req.body.product_id || !req.body.quantity ) {
        return res.status(400).json({
            error: ErrorMessages.INVALID_INPUT,
            code:  ErrorCodes.INVALID_INPUT,
        })
    }
    
    //check if the user exists in the table usercart========================================
        const userExistsInCartTable =
            await supabase.from('usercart').select('*').eq('usercart_id', req.user.id);

        if (userExistsInCartTable.error) {
            res.status(500).json({
                error: ErrorMessages.SERVER_ERROR,
                code:  ErrorCodes.SERVER_ERROR,
            })
        }

    //if user not exist, then create a new user in the table usercart===================
        if (userExistsInCartTable.data?.length === 0) {
            await supabase.from('usercart').insert({
                usercart_id: req.user.id,
                products: [
                    {
                        product_id: req.body.product_id,
                        quantity:   req.body.quantity,
                        checked:    false
                    } as CartUserData
                ]
            });

            res.json({
                message: 'Product added to cart successfully',
                auth: req.newToken && req.newRefreshToken ?
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }

    //if user exist, then update the user in the table usercart========================
        else if(userExistsInCartTable && userExistsInCartTable.data &&
                userExistsInCartTable.data?.length > 0){

        //first check if the products that the user is adding already exist
            const userCurrentCart = userExistsInCartTable.data[0];
            for (let i = 0; i < userCurrentCart.products.length; i++) {
                if (userCurrentCart.products[i].product_id === req.body.product_id) {
                    userCurrentCart.products[i].quantity += req.body.quantity;
                    
                    await supabase.from('usercart').update({
                        products: userCurrentCart.products
                    }).eq('usercart_id', req.user.id);
                    
                    return res.json({
                        message: 'Product added to cart successfully',
                        auth: req.newToken && req.newRefreshToken ?
                        {
                            token:        req.newToken,
                            refreshToken: req.newRefreshToken
                        }
                        :
                        null
                    });
                }
            }

        //so the product does not exist in the cart, add it 
            const currentUserCart = userExistsInCartTable.data[0];
            const updatedCart = [
                ...currentUserCart.products,
                {
                    product_id: req.body.product_id,
                    quantity:   req.body.quantity,
                    checked:    false
                } as CartUserData
            ];

            await supabase.from('usercart').update({
                products: updatedCart
            }).eq('usercart_id', req.user.id);

            res.json({
                message: 'Product added to cart successfully',
                auth: req.newToken && req.newRefreshToken ?
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: ErrorMessages.SERVER_ERROR,
            code:  ErrorCodes.SERVER_ERROR,
        })
    }
}