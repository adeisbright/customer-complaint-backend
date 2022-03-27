process.env.NODE_ENV = "test"
import app from "../..";
import chai from "chai"; 
import chaiHttp from "chai-http" 
import {randEmail , randPassword} from "@ngneat/falso"
import Config from "../../config"

chai.use(chaiHttp)
const expect = chai.expect 

const {adminEmail , adminPassword} = Config

describe("Admin Controller Test" , async function(){
    before(() => {
        console.log("Kicking off Test")
    })

    after(() => {
        console.log("Test Ends")
    })

    describe("POST /auth/admin" , () => {
        it("Should not grant login access when credential is wrong" , async() =>{
           
            const loginData = {
                email : randEmail() , 
                password : randPassword()
            }
            const response = await chai.request(app)
                .post("/auth/admin")
                .send(loginData)
            expect(response).to.have.property("statusCode").to.be.eq(401)
        })

        it("Should generated token when user provides correct details" , async() =>{
           
            const loginData = {
                email : adminEmail , 
                password : adminPassword
            }
            const response = await chai.request(app)
                .post("/auth/admin")
                .send(loginData)
            expect(response.body).to.have.property("statusCode").to.be.eq(200)
            expect(response.body).to.have.property("body").to.have.property("data").to.be.a("string")
        })
    })

    describe("Get /v1/admin" , () => {
        it("Should not allow access to the endpoint if no authorization header is provided" , async() =>{
            const response = await chai.request(app).get("/v1/admin") 
            expect(response).to.have.property("statusCode").eq(400)
        })
    })

    describe("Get /v1/admin" , () => {
        it("Should allow admin access to the endpoint" , async() => {
            const data = await chai.request(app)
            .post("/auth/admin")
            .send({
                email : adminEmail , 
                password : adminPassword
            })

            const response = await chai.request(app)
            .get("/v1/admin")
            .set({"authorization" : `Bearer ${data.body.body.data}`})
            expect(response).to.have.property("statusCode").eq(200)
        })
    })
})