import mongoose, { PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { BlogPost } from '../interfaces';

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  body: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

blogSchema.plugin(mongoosePaginate);

const blogPost: PaginateModel<BlogPost> = mongoose.model<BlogPost, PaginateModel<BlogPost>>('Posts', blogSchema);

export default blogPost;
