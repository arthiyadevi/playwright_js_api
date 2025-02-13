//Import playwright modules
const{test,expect} = require('@playwright/test')

//writing playwright Tests
test('Create Post API request with static response body',async({request})=> {

    // Create Post request
    const postAPIResponse= await request.post('/booking',{
        data:{
            
                "firstname": "Sanjay",
                "lastname": "Ramasamy",
                "totalprice": 1000,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "super bowls"
            
            }
    })

    //Validate Json status code
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponsebody = await postAPIResponse.json();
    console.log(postAPIResponsebody);

    //Validate Json response
    expect(postAPIResponsebody.booking).toHaveProperty("firstname","Sanjay");
    expect(postAPIResponsebody.booking).toHaveProperty("lastname","Ramasamy");

    //Validate nested JSON objects
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");


})

