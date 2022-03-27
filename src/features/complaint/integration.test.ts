import app from "../..";
import chai from "chai"; 
import chaiHttp from "chai-http" 
import {
    randEmail , 
    randFullAddress , 
    randCompanyName,
    randCity , 
    randCounty , 
    randWord , 
    randSentence , 
    randLastName

} from "@ngneat/falso"

import BranchModel from "../branch/branch.model";
import CustomerModel from "../customer/customer.model";
import ComplaintModel from "./complaint.model";
import Config from "../../config"
import path from "path"

chai.use(chaiHttp) 
const expect = chai.expect 
const {adminEmail , adminPassword} = Config

const file = path.join(__dirname , "../../../storage/img.JPEG")


describe("Complaint Controllers" , () => {
    let branchID = ""
    let adminToken = "" 
    let customerID = ""
    let customerToken = ""
    let complaintID = ""

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
        
        //Add a customer 
        const customer = await chai.request(app)
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
            
            customerID = customer.body.body.data._id 

            //Login as a customer 
            
            const customerCredentials = {
                email : customer.body.body.data.email , 
                password  : "+2348140876521"
            }
            const result  = await chai.request(app)
            .post("/auth/customer")
            .send(customerCredentials)

            customerToken = result.body.body.data

    })
    
    after(async () => {
        await BranchModel.deleteMany({})
        await CustomerModel.deleteMany({})
        await ComplaintModel.deleteMany({})
    })

    describe("GET /v1/complaints" , () => {
        
        it("Should return 0 as the total number  of customers" , async () => {
            const response = await chai.request(app)
                .get("/v1/complaints") 
            expect(response.body.body).to.have.property("data").length(0)
        })
    })

    describe("POST /v1/complaints" , () => {
        it("Should add a complaint" , async () => {

            const reqBody = {
                title : randWord() , 
                message : randSentence() 
            }
            const response = await chai.request(app)
                .post("/v1/complaints")
                .set({"authorization" : "Bearer " + customerToken})
                .send(reqBody)
            
            complaintID = response.body.body.data._id 
           
            expect(response.body).to.have.property("statusCode").eq(201) 
        })

    })

    describe("GET /v1/complaints/{id}" , () => {

        it("Should retrieve an existing complaint " , async () => {

            const response = await chai.request(app)
                .get(`/v1/complaints/${complaintID}`)
        
            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    describe("PATCH /v1/customers/{id}" , () => {

        it("Should set the reviewed field of a complaint to true " , async () => {
            
            const updateFields = {
                reviewed : true ,
            }
            
            const response = await chai.request(app) 
                .patch(`/v1/complaints/${complaintID}`)
                .set({"authorization" : "Bearer " + adminToken})
                .send(updateFields)
            console.log(response.body)
            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    describe("DELETE /v1/custmers/{id}" , () => {

        it("Should remove an existing complaint"  , async () => {
            const response = await chai.request(app)
                .delete(`/v1/complaints/${complaintID}`)
                .set({"authorization" : "Bearer " + customerToken})

            expect(response.body).to.have.property("statusCode").eq(200)
        })
    }) 

})