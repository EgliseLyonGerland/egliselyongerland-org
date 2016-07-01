import { Schema } from 'normalizr';

const postSchema = new Schema('posts', {
  idAttribute: 'ID'
});

const authorSchema = new Schema('authors', {
  idAttribute: 'ID'
});

postSchema.define({
  author: authorSchema
});

export {
  postSchema,
  authorSchema,
};
