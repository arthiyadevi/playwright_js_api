const{test,expect} = require('@playwright/test')
const PostAPIRequestBody = require('../test-data/post_api_request_body.json')


test("Post Api request with static Json body",async({request})=>{

    const postAPIResponse= await request.post('/booking',{
        data:PostAPIRequestBody
    })

    expect(await postAPIResponse.status()).toBe(200)
    expect((await postAPIResponse).ok()).toBeTruthy()

    const postAPIResponseBody = await postAPIResponse.json()
    console.log(postAPIResponseBody)

    expect(await postAPIResponseBody.booking).toHaveProperty("firstname","Arjun")
    expect(await postAPIResponseBody.booking).toHaveProperty("lastname","Reddy")



})