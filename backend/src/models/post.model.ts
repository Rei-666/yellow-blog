import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { BlogPost } from '../interfaces';

const { Schema } = mongoose;

const blogSchema = new Schema<BlogPost>({
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

blogSchema.plugin((mongoosePaginate as any));

const blogPost = mongoose.model<BlogPost>('Posts', blogSchema);

export default blogPost;
