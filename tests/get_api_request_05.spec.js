const{test,expect} = require('@playwright/test')
const apiRequestBody = require('../test-data/post_api_dynamic_request_body.json')
const {stringFormat} = require('../utils/common')

test('Get API request in Playwright',async({request}) => {

    const dynamicRequestBody = stringFormat(JSON.stringify(apiRequestBody),"Percy","Jackson","Reading Books")

    const postAPIResponse = await request.post(`/booking`,{
        data:JSON.parse(dynamicRequestBody)
    })

    expect(postAPIResponse.ok()).toBeTruthy;
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody= await postAPIResponse.json();
    console.log(postAPIResponseBody);

    const bid = postAPIResponseBody.bookingid;

    const getAPIResponse = await request.get(`/booking/${bid}`)

    console.log(await getAPIResponse.json())

    expect(getAPIResponse.ok()).toBeTruthy;
    expect(getAPIResponse.status()).toBe(200);

    

    





    


})