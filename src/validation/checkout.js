import * as Yup from "yup"

export const CheckoutSchema = Yup.object().shape({
    fname: Yup.string().required('الاسم الأول مطلوب'),
    lname: Yup.string().required('اسم العائلة مطلوب'),
    email: Yup.string().email('بريد إلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, 'رقم الهاتف غير صالح')
      .required('رقم الهاتف مطلوب'),
    address: Yup.string().required('العنوان مطلوب'),
    address2: Yup.string(), // اختياري
    city: Yup.string().required('المدينة مطلوبة'),
    state: Yup.string().required('المنطقة مطلوبة'),
    country: Yup.string().required('الدولة مطلوبة'),
    zip_code: Yup.string()
      .matches(/^[0-9]{3,10}$/, 'الرمز البريدي غير صالح')
      .required('الرمز البريدي مطلوب'),
    note: Yup.string(), // اختياري
    payment: Yup.string()
      .oneOf(['cash_on_delivery'], 'طريقة الدفع غير صالحة')
      .required('طريقة الدفع مطلوبة'),
  });