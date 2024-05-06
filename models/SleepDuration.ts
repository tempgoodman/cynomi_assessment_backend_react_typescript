import mongoose from 'mongoose'

export interface ISleepDuration {
    name: string
    gender: string
    sleepDuration: number
    createDate: Date
  }
  
interface sleepDurationModelInterface extends mongoose.Model<SleepDurationDoc> {
  build(attr: ISleepDuration): SleepDurationDoc
}

interface SleepDurationDoc extends mongoose.Document {
  name: string
  gender: string
  sleepDuration: number
  createDate: Date
}

const sleepDurationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  sleepDuration: {
    type: Number, 
    required: true
  },
  createDate: {
    type: Date, 
    required: true
  } 
})

sleepDurationSchema.statics.build = (attr: ISleepDuration) => {
  return new SleepDuration(attr)
}

const SleepDuration = mongoose.model<SleepDurationDoc, sleepDurationModelInterface>('SleepDuration', sleepDurationSchema)



export { SleepDuration }