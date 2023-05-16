import mongoose from 'mongoose';

// children
const ImagesSchema = new mongoose.Schema({
    image: String,
    caption: String,
})

const BugCommentSchema = new mongoose.Schema({
    comment: String,
    date: String,
    author: String,
    avatar: String,
})

const ActivitySchema = new mongoose.Schema({
    action: String,
    date: String,
})


const BugSchema = new mongoose.Schema({
    title:  String,
    description: String,
    date: String,
    lastUpdate: String,
    bugKey: String,
    images: [{ type: ImagesSchema, ref: 'bugImage'}],
    status: String,
    author: String,
    priority: String,
    tag: String,
    sprint: String,
    comments: [{type: BugCommentSchema, ref: 'bugComment'}],
    activity: [{type: ActivitySchema, ref: 'bugActivity'}],
})

const CommentSchema = new mongoose.Schema({
    comment: String,
    date: String,
    author: String,
})

const SprintSchema = new mongoose.Schema({
    title: String,
    goal: String,
    color: String,
    endDate: String,
    updated: String,
    status: String,
})

// parent
const ProjectSchema = new mongoose.Schema({
    projectTitle: String,
    startDate: String,   
    lastUpdate: String,
    projectLead: String,
    projectImage: String,
    projectLink: String,
    projectType: String,
    description: String,
    projectKey: String,
    repository: String,
    activity: [{ type: ActivitySchema, ref: "activity" }],
    bugs: [{ type: BugSchema, ref: "bugs" }],
    comments: [{ type: CommentSchema, ref: "comments" }],
    sprints: [{ type: SprintSchema, ref: "sprints" }]
})

export const ProjectModel = mongoose.model("Project", ProjectSchema);
