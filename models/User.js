import mongoose from 'mongoose';

const BabySchema = new mongoose.Schema({
    name: String,
    DOB: String,
    height: String,
    weight: String,
});

// children
const FeedingSchema = new mongoose.Schema({
    time: String,
    milk: Boolean,
    formula: Boolean,
    drank: Number,
});

const ChangesSchema = new mongoose.Schema({
    time: String,
    pee: Boolean,
    poop: Boolean,
});

const NursingSchema = new mongoose.Schema({
    time: String,
    leftTime: String,
    rightTime: String,
});

const PumpingSchema = new mongoose.Schema({
    time: String,
    leftAmount: String,
    rightAmount: String,
});

const MedicationSchema = new mongoose.Schema({
    time: String,
    medication: String,
    amount: String,
});

// parent
const DataSchema = new mongoose.Schema({
    user: String,
    feedings: [{ type: FeedingSchema, ref: 'feedingsS' }],
    changes: [{ type: ChangesSchema, ref: 'changes' }],
    nursings: [{ type: NursingSchema, ref: 'nursings' }],
    pumpings: [{ type: PumpingSchema, ref: 'pumpings' }],
    medications: [{ type: MedicationSchema, ref: 'medications'}]
});

// parent
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        allowNull: false,
        unique: true,
    },
    password: {
        type: String,
        allowNull: false,
    },
    lastLogin: String,
    partners: [{ userID: String, }],
    baby: { BabySchema },
    data: { DataSchema }
})

export const UserModel = mongoose.model("User", UserSchema)