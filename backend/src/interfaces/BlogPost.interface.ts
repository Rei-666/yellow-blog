import { Document, Types } from 'mongoose';

interface BlogPost extends Document {
  title: string,
  author: Types.ObjectId,
  body: any,
  date: Date
}
export default BlogPost;
