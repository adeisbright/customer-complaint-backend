import Sinon from "sinon"; 
import chai from "chai" 
//import branchServices from "./branch.services";
import IBranch from "./branch.interface";
import branchDAO  from "./branch.dao";

const {expect} = chai 

interface LoginService {
    add: (resource: IBranch) => Promise<any>;
}

describe("Branch Services" , () => {
    let branchServices : LoginService;

    afterEach(() => {
        Sinon.restore() 
    })
    
    before(() => {
        Sinon.stub(branchDAO, 'create')
        branchServices = require("./branch.services")
    })

    it('should proxy functions to each service', () => {
        let resource : IBranch = {
            name : "Example",
            email : "example@branch.com" , 
            phoneNumber : "+2348144562321" , 
            address : {
                address : "Example Address" , 
                state  :"Lagos" , 
                city : "Lagos"
            }
            
        }

        branchServices.add(resource)

        expect(branchDAO.create).to.be.true
    })
    
})