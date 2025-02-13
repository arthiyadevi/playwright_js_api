const{test,expect} = require('@playwright/test')
const apiRequestBody = require('../test-data/post_api_dynamic_request_body.json')
const {stringFormat} = require('../utils/common')
const tokenRequestBody = require('../test-data/token_request_body.json')

test("Put API request",async ({request}) => {

    const dynamicRequestBody = stringFormat(JSON.stringify(apiRequestBody),"Percy","Jackson","Reading Books")

    const postAPIResponse = await request.post(`/booking`,{
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

    const bid = postAPIResponseBody.bookingid;

    const getAPIResponse = await request.get(`/booking/${bid}`)

    console.log(await getAPIResponse.json())

    expect(getAPIResponse.ok()).toBeTruthy;
    expect(getAPIResponse.status()).toBe(200);

    console.log(tokenRequestBody);

    const tokenResponse = await request.post(`/auth`,{
        data:tokenRequestBody
    })
    
    const tokenResponseBody = await tokenResponse.json()
    console.log(tokenResponseBody)
    const tokenNo = await tokenResponseBody.token;
    console.log("Token no is :" + tokenNo);
})




