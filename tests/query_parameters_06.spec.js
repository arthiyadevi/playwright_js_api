const{test,expect} = require('@playwright/test')
const apiRequestBody = require('../test-data/post_api_dynamic_request_body')
const {stringFormat} = require('../utils/common')

test('Query parameters in Playwright',async({request}) => {

    const dynamicRequestBody = stringFormat(JSON.stringify(apiRequestBody),"Percy","Jackson","Reading Books")

    const postAPIResponse = await request.post(`/booking`,{
        data:JSON.parse(dynamicRequestBody)
    })

    expect(postAPIResponse.ok()).toBeTruthy;
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody= await postAPIResponse.json();
    console.log(postAPIResponseBody);

    const bid = postAPIResponseBody.bookingid;

    const getAPIResponse = await request.get(`/booking`,{
        params:{
            "firstname": "Percy",
            "lastname":"Jackson"
        }
    })

    console.log(await getAPIResponse.json())





    


})