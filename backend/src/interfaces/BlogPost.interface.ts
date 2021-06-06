import { Document, Types } from 'mongoose';

interface BlogPost extends Document {
  title: string,
  author: Types.ObjectId,
  body: string,
  date: Date
}
export default BlogPost;
