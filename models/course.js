
import mongoose from "mongoose";
import Joi from "joi";

const SpeakerSchema = mongoose.Schema({
    name: String,
    phone: String,
    tz: String,
    startDate: { type: Date, default: Date.now() }
})


const courseSchema = mongoose.Schema({
    name: String,
    price: Number,
    numLessons: Number,
    speaker: SpeakerSchema,
    tags: [String],
    startDate: { type: Date, default: Date.now() },
    ownerId: String
})

export const validateCourse = (_course) => {
    let courseSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        numLessons: Joi.number(),
        tags: Joi.array(),
        ownerId: Joi.string(),
        speaker: Joi.object({
            name: Joi.string(),
            tz: Joi.string(),
            phone: Joi.string(),
            startDate: Joi.string()
        })


    })
    return courseSchema.validate(_course);
}
export const Course = mongoose.model("courses", courseSchema);