
/**
 * Validate the user cart request
 * @example
 * //the object format should be like this:
 * "products": [
    {
        "checked": true,
        "quantity": 10,
        "product_id": "1"
    },
    {
        "checked": true,
        "quantity": 5,
        "product_id": "2"
    }
 */
export function ValidateUserCartRequest( request :any) :boolean {
    if (!Array.isArray(request)) {
        return false;
    }
    
    for (const product of request) {
        if (typeof product.checked !== 'boolean' || 
            typeof product.quantity !== 'number' || 
            !product.product_id) {
            return false;
        }
    }

    return true;
}