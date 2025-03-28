const {test,expect} = require('@playwright/test')
const apiRequestBody = require('../test-data/post_api_dynamic_request_body.json')
const {stringFormat} = require('../utils/common')

test('post api request with dynamic json file',async({request}) => {

    const dynamicRequestBody = stringFormat(JSON.stringify(apiRequestBody),"Percy","Jackson","Reading Books")

    const postAPIResponse = await request.post('/booking',{
        data:JSON.parse(dynamicRequestBody)
    })

    expect(postAPIResponse.ok()).toBeTruthy;
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody= await postAPIResponse.json();
    console.log(postAPIResponseBody);

    //Validate Json response
    expect(postAPIResponseBody.booking).toHaveProperty("firstname","Percy");
    expect(postAPIResponseBody.booking).toHaveProperty("lastname","Jackson");

    //Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");


})

