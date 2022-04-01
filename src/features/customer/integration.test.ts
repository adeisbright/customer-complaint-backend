import app from "../..";
import chai from "chai"; 
import chaiHttp from "chai-http" 
import {
    randEmail , 
    randFullAddress , 
    randCompanyName,
    randCity , 
    randCounty , 
    randFirstName , 
    randLastName

} from "@ngneat/falso"

import BranchModel from "../branch/branch.model";
import CustomerModel from "./customer.model";
import Config from "../../config"
import path from "path"

chai.use(chaiHttp) 
const expect = chai.expect 
const {adminEmail , adminPassword} = Config

const file = path.join(__dirname , "../../../storage/img.JPEG")


describe.skip("Manager Controllers" , () => {
    let branchID = ""
    let adminToken = "" 
    let customerID = ""

    before(async () => {
        
        const adminCredential = {
            email : adminEmail , 
            password  :adminPassword
        }

        const branchData = {
            name : randCompanyName() , 
            email : randEmail(), 
            phoneNumber : "09099009988" , 
            address :randFullAddress({
                includeCountry : false
            }) , 
            city : randCity() , 
            state : randCounty()

        }

        //Login as an admin to get credentials
        const {body : {body : {data}}} = await chai.request(app)
        .post("/auth/admin")
        .send(adminCredential)

        adminToken = data
        
        // Create a branch 

        const branch = await chai.request(app)
            .post("/v1/branches") 
            .set({"authorization" : `Bearer ${data}`})
            .send(branchData)
        
        branchID = branch.body.body.data._id
        
        await CustomerModel.deleteMany({})
    })
    
    after(async () => {
        await BranchModel.deleteMany({})
        await CustomerModel.deleteMany({})
    })

    describe("GET /v1/customers" , () => {
        
        it("Should return 0 as the total number  of customers" , async () => {
            const response = await chai.request(app)
                .get("/v1/customers") 
            expect(response.body.body).to.have.property("data").length(0)
        })
    })

    describe("POST /v1/customers" , () => {
        it("Should add a customer" , async () => {
            const response = await chai.request(app)
                .post("/v1/customers")
                .attach("attachment" , file)
                .set('Content-Type', 'multipart/form-data')
                .set({"authorization" : "Bearer " + adminToken})
                .field("lastName" , randLastName())
                .field("firstName" , randLastName())
                .field("email" , randEmail())
                .field("phoneNumber" , "+2348140876521")
                .field("address" , randFullAddress())
                .field("city" , randCity())
                .field("state" , randCounty())
                .field("branch" , branchID)
            
            customerID = response.body.body.data._id 
            expect(response.body).to.have.property("statusCode").eq(201)
           
        })

    })

    describe("GET /v1/customers/{id}" , () => {

        it("Should retrieve an existing customer " , async () => {

            const response = await chai.request(app)
                .get(`/v1/customers/${customerID}`)
        
            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    describe("PATCH /v1/customers/{id}" , () => {

        it("Should update some fields of an existing customer " , async () => {
            
            

           
            const updateFields = {
                email : randEmail() ,
                phoneNumber : "+2348140009052"
            }
           
            
            const response = await chai.request(app) 
                .patch(`/v1/customers/${customerID}`)
                .set({"authorization" : "Bearer " + adminToken})
                .send(updateFields)

            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    describe("DELETE /v1/custmers/{id}" , () => {

        it("Should remove an existing customer"  , async () => {
            const response = await chai.request(app)
                .delete(`/v1/customers/${customerID}`)
                .set({"authorization" : "Bearer " + adminToken})

            expect(response.body).to.have.property("statusCode").eq(200)
        })
    }) 

})