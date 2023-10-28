const BRAND_CHECK_LIST = [
    {
        checkName: 'warranty',
        isCheck: false,
        inputName: '',
        inputType: '',
        id: '',
        relationship: false
    },
    {
        checkName: 'request_help',
        isCheck: false,
        inputName: 'survey_link',
        inputType: 'text',
        id: 'survey_link_id',
        relationship: true
    },
    {
        checkName: 'promo_code',
        isCheck: false,
        inputName: '',
        inputType: '',
        id: '',
        relationship: false
    },
    {
        checkName: 'referrals',
        isCheck: false,
        inputName: '',
        id: '',
        relationship: true
    },
    {
        checkName: 'email_support',
        isCheck: false,
        inputName: 'email_id',
        inputType: 'email',
        id: 'email_id',
        relationship: true
    },
    {
        checkName: 'call_support',
        isCheck: false,
        inputName: 'call_no',
        inputType: 'tel',
        id: 'call_no',
        relationship: true
    },
    {
        checkName: 'whatsapp_support',
        isCheck: false,
        inputName: 'whatsapp_number',
        inputType: 'tel',
        id: 'whatsapp_number_id',
        relationship: true
    },
    {
        checkName: 'instagram',
        isCheck: false,
        inputName: 'insta_link',
        inputType: 'text',
        id: 'insta_link_id',
        relationship: true
    },
    {
        checkName: 'facebook',
        isCheck: false,
        inputName: 'fb_link',
        inputType: 'text',
        id: 'fb_link_id',
        relationship: true
    },
];

export default BRAND_CHECK_LIST