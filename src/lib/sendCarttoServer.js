"use client"
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { getCart } from './cart';
import env from '@/env';
import { getToken } from './helper';

export const sendCartToServer = async () => {
    const cart = getCart();
    if (!cart.length) {
        toast.error('السلة فارغة!');
        return;
    }

    let loadingToast=toast.loading("جارى حفظ عربة التسوق فى حسابك")

    try {
        const response = await axios.post(env.baseUrl + '/cart/update', {
        products: cart,
        },{
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken("token_app")}`
            },
        });

        toast.success('تم إرسال السلة بنجاح!',{id:loadingToast});
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('حدث خطأ أثناء إرسال السلة!',{id:loadingToast});
    }
};
