import ICustomer from "./customer.interface";
import { Schema, model } from "mongoose";
import Config from "../../config";
import bcrypt from "bcryptjs";

const customerSchema = new Schema<ICustomer>({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    address: String,
    branch: {
        type: Schema.Types.ObjectId,
        ref: "branches"
    },
    password: String,
    complaintSize: {
        type: Number,
        default: 0
    },
    avatarUrl: String
});

customerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(Config.saltFactor);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error: any) {
        return next(error);
    }
});

customerSchema.post("save", async function () {
    const clone = Object.create({});
    Object.assign(clone, this._doc);
    delete clone.password;
    delete clone.__v;
    return {};
});

customerSchema.methods.isCorrectPassword = async function (
    text: string
): Promise<boolean> {
    return await bcrypt.compare(text, this.password);
};

customerSchema.pre("find", { query: true }, async function (next) {
    this.select({ password: 0 });
    return next();
});
// Get a single document and hide the password
// customerSchema.pre("findOne" , {query  :true} , async function(next){
//     this.select({password : 0})
// })

// Update a single document and hide the password
customerSchema.pre("findOneAndUpdate", { query: true }, async function () {
    this.select({ password: 0 });
});

const CustomerModel = model<ICustomer>("customers", customerSchema);
export default CustomerModel;
