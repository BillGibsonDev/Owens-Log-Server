import mongoose from 'mongoose';

// children
const NoteSchema = new mongoose.Schema({
    startTime: String,
    endTime: String,
    nursed: Boolean,
    left: Number,
    right: Number,
    milk: Number,
    formula: Number,
    pee: Boolean,
    poop: Boolean,
    description: String,
})

// parent
const DaySchema = new mongoose.Schema({
    date: String, 
    notes: [{ type: NoteSchema, ref: "notes" }],
})

export const DayModel = mongoose.model("Day", DaySchema);
