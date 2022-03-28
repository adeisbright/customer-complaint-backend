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
import ManagerModel from "./manager.model";
import BranchModel from "../branch/branch.model";
import Config from "../../config"

chai.use(chaiHttp) 
const expect = chai.expect 
const {adminEmail , adminPassword} = Config

describe("Manager Controllers" , () => {
    let branchID = ""
    let adminToken = "" 

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
        
    })
    
    after(async () => {
        await ManagerModel.deleteMany({})
        await BranchModel.deleteMany({})
    })

    describe("GET /v1/managers" , () => {
        
        it("Should return 0 as the total number  of managers" , async () => {
            const response = await chai.request(app)
                .get("/v1/managers") 
            expect(response.body.body).to.have.property("data").length(0)
        })
    })

    describe("POST /v1/managers" , () => {
        it("Should add a manager" , async () => {
           
            const managerData = {
                firstName : randFirstName() , 
                lastName : randLastName(),
                email : randEmail(), 
                phoneNumber : "09099885544" , 
                branch : branchID
            }

            const response = await chai.request(app)
                .post("/v1/managers")
                .set({"authorization" :  "Bearer " + adminToken})
                .send(managerData)
            
            expect(response.body).to.have.property("statusCode").eq(201)
            

           
        })

        it("Should not add a manager with duplicated data" , async () => {
           
            const managerData = {
                firstName : randFirstName() , 
                lastName : randLastName(),
                email : randEmail(), 
                phoneNumber : "09099885544" , 
                branch : branchID
            }

            const response = await chai.request(app)
                .post("/v1/managers")
                .set({"authorization" : "Bearer " + adminToken})
                .send(managerData)
            
            expect(response.body).to.have.property("statusCode").eq(400)
        })
        
    })

    describe("GET /v1/managers/{id}" , () => {
        it("Should return a 404 error for a manager with non-existent id" , async () => {
           
            const response = await chai.request(app)
                .get("/v1/managers/623d318595e0ff1175c1f181") 
                
            expect(response.body).to.have.property("statusCode").eq(404)
        })

        it("Should retrieve an existing manager " , async () => {
            const managerData = {
                firstName : randFirstName() , 
                lastName : randLastName(),
                email : randEmail(), 
                phoneNumber : "09099885547" , 
                branch : branchID
            }

            const manager = await chai.request(app)
                .post("/v1/managers")
                .set({"authorization" : "Bearer " + adminToken})
                .send(managerData)
            

            const response = await chai.request(app)
                .get(`/v1/managers/${manager.body.body.clone._id}`)
        
            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    describe("DELETE /v1/managers/{id}" , () => {

        it("Should remove an existing manager"  , async () => {
            const managerData = {
                firstName : randFirstName() , 
                lastName : randLastName(),
                email : randEmail(), 
                phoneNumber : "09099885554" , 
                branch : branchID
            }

            const manager = await chai.request(app)
                .post("/v1/managers")
                .set({"authorization" : "Bearer " + adminToken})
                .send(managerData)
            

            const response = await chai.request(app)
                .delete(`/v1/managers/${manager.body.body.clone._id}`)
                .set({"authorization" : "Bearer " + adminToken})

            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    describe("PATCH /v1/managers/{id}" , () => {

        it("Should update some part of an existing manager " , async () => {
            const managerData = {
                firstName : randFirstName() , 
                lastName : randLastName(),
                email : randEmail(), 
                phoneNumber : "09099885554" , 
                branch : branchID
            }

            const manager = await chai.request(app)
                .post("/v1/managers")
                .set({"authorization" : "Bearer " + adminToken})
                .send(managerData)
            

           
            const updateFields = {
                email : randEmail() ,
                phoneNumber : "+2348140009054"
            }
           
            
            const response = await chai.request(app) 
                .patch(`/v1/managers/${manager.body.body.clone._id}`)
                .set({"authorization" : "Bearer " + adminToken})
                .send(updateFields)

            expect(response.body).to.have.property("statusCode").eq(200)
        })
    })

    

})