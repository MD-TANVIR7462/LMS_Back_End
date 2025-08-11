import { Schema, model } from "mongoose";
import { IModule } from "./Modules.interface";

const moduleSchema = new Schema<IModule>(
  {
    courseId: { 
      type: Schema.Types.ObjectId, 
      ref: "Course", 
      required: [true, "Course ID is required"] 
    },
    title: { 
      type: String, 
      required: [true, "Module title is required"], 
      trim: true,
      minlength: [2, "Title must be at least 2 characters long"],
      maxlength: [100, "Title must not exceed 100 characters"]
    },
    moduleNumber: { 
      type: Number, 
      required: [true, "Module number is required"], 
      min: [1, "Module number must be at least 1"] 
    },
    description: { 
      type: String, 
      required: [true, "Description is required"], 
      trim: true,
      minlength: [5, "Description must be at least 5 characters long"]
    },
    totalLectures: { 
      type: Number, 
      default: 0,
      min: [0, "Total lectures cannot be negative"] 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    },
  },
  {
    timestamps: true,
  }
);

// indexing.....
// moduleSchema.index({ courseId: 1, moduleNumber: 1 }, { unique: true });

export const ModuleModel = model<IModule>("Module", moduleSchema);
