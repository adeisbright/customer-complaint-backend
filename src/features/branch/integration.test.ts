import app from "../..";
import chai from "chai"; 
import chaiHttp from "chai-http" 
import {
    randEmail , 
    randFullAddress , 
    randCompanyName,
    randCity , 
    randCounty

} from "@ngneat/falso"
import BranchModel from "./branch.model"; 
import Config from "../../config"

chai.use(chaiHttp) 
const expect = chai.expect 
const {adminEmail , adminPassword} = Config

describe("Branch Controllers" , () => {
    
    //Remove every branch instance in the branch collection before the test 
    before(async () => {
        await BranchModel.deleteMany({})
    })
     //Remove every branch instance in the branch collection after the test 
    after(async () => {
        await BranchModel.deleteMany({})
    })

    describe("GET /v1/branches" , () => {
        it("Should an empty array of branches" , async () => {
            const response = await chai.request(app)
                .get("/v1/branches") 
            expect(response.body.body).to.have.property("data").length(0)
        })
    })

    describe("POST /v1/branches" , () => {
        it("Should not allow a branch to be created if user is not admin" , async () => {
           
            const reqBody = {
                name : randCompanyName() , 
                email : randEmail(), 
                phoneNumber : "09099009988" , 
                address :randFullAddress({
                    includeCountry : false
                }) , 
                city : randCity() , 
                state : randCounty()

            }
            const response = await chai.request(app)
                .post("/v1/branches") 
                .send(reqBody)
            expect(response.body).to.have.property("statusCode").eq(400)
        })

        it("Should allow a branch to be created if user is admin" , async () => {
           
            const reqBody = {
                name : randCompanyName() , 
                email : randEmail(), 
                phoneNumber : "09099009988" , 
                address :randFullAddress({
                    includeCountry : false
                }) , 
                city : randCity() , 
                state : randCounty()

            }

            const adminCredential = {
                email : adminEmail , 
                password  :adminPassword
            }

            const {body : {body : {data}}} = await chai.request(app)
            .post("/auth/admin")
            .send(adminCredential)

            const response = await chai.request(app)
                .post("/v1/branches") 
                .set({"authorization" : `Bearer ${data}`})
                .send(reqBody)
            
            expect(response.body).to.have.property("statusCode").eq(201)
        })
    })

    describe("GET /v1/branches/{id}" , () => {
        it("Should return a 404 error for a branch with non-existent id" , async () => {
           
            const response = await chai.request(app)
                .get("/v1/branches/623d318595e0ff1175c1f181") 
                
            expect(response.body).to.have.property("statusCode").eq(404)
        })

        it("Should retrieve an existing branch " , async () => {
           
            const reqBody = {
                name : randCompanyName() , 
                email : randEmail(), 
                phoneNumber : "09099009989" , 
                address :randFullAddress({
                    includeCountry : false
                }) , 
                city : randCity() , 
                state : randCounty()

            }

            const adminCredential = {
                email : adminEmail , 
                password  :adminPassword
            }

            const {body : {body : {data}}} = await chai.request(app)
            .post("/auth/admin")
            .send(adminCredential)

            const branch = await chai.request(app)
                .post("/v1/branches") 
                .set({"authorization" : `Bearer ${data}`})
                .send(reqBody)
            const response = await chai.request(app) 
                .get(`/v1/branches/${branch.body.body.data._id}`)
            
            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    describe("DELETE /v1/branches/{id}" , () => {

        it("Should remove an existing branch from the list of branches" , async () => {
           
            const reqBody = {
                name : randCompanyName()  +randCompanyName() , 
                email : "example" + randEmail(), 
                phoneNumber : "09099009985" , 
                address :randFullAddress({
                    includeCountry : false
                }) , 
                city : randCity() , 
                state : randCounty()

            }

            const adminCredential = {
                email : adminEmail , 
                password  :adminPassword
            }
           
            const {body : {body : {data}}} = await chai.request(app)
            .post("/auth/admin")
            .send(adminCredential)

          
            const branch = await chai.request(app)
                .post("/v1/branches") 
                .set({"authorization" : `Bearer ${data}`})
                .send(reqBody)

            
            const response = await chai.request(app) 
                .delete(`/v1/branches/${branch.body.body.data._id}`)
                .set({"authorization" : `Bearer ${data}`})
               
           
            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    describe("PATCH /v1/branches/{id}" , () => {

        it("Should update some part of an existing branch " , async () => {
           
            const reqBody = {
                name : randCompanyName()  +randCompanyName() , 
                email : "example" + randEmail(), 
                phoneNumber : "09099009981" , 
                address :randFullAddress({
                    includeCountry : false
                }) , 
                city : randCity() , 
                state : randCounty()

            }

            const adminCredential = {
                email : adminEmail , 
                password  :adminPassword
            }
            //Login as an admin to retrieve token 
            const {body : {body : {data}}} = await chai.request(app)
            .post("/auth/admin")
            .send(adminCredential)

            //Use the token as part of the create branch request 
            const branch = await chai.request(app)
                .post("/v1/branches") 
                .set({"authorization" : `Bearer ${data}`})
                .send(reqBody)

            // Attributes of the created branch to update 
            const updateFields = {
                email : randEmail() ,
                phoneNumber : "+2348140009098"
            }
           
            // Update the email and phone number of the branch 
            const response = await chai.request(app) 
                .patch(`/v1/branches/${branch.body.body.data._id}`)
                .set({"authorization" : `Bearer ${data}`})
                .send(updateFields)

            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    

})