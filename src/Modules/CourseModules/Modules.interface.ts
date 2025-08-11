import { Types } from "mongoose";

export interface IModule {
    courseId: Types.ObjectId
    title : string
    moduleNumber : number
    description :string
    totalLectures?:number
    isActive?:boolean
    isDeleted?:boolean

}