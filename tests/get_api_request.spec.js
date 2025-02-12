const{test,expect} = require('@playwright/test')
const APIRequestBody = require('../test-data/post_api_dynamic_request_body')
const {stringFormat} = require('../utils/common')

test('Get api request',async({request}) => {

    const dynamicRequestBody = stringFormat(JSON.stringify(APIRequestBody),"Percy","Jackson","Reading Books")

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





    


})