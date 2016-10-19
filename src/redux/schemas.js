import { Schema, arrayOf } from 'normalizr';

const postSchema = new Schema('posts', {
  idAttribute: 'id'
});

const authorSchema = new Schema('authors', {
  idAttribute: 'id'
});

const categorySchema = new Schema('categories', {
  idAttribute: 'id'
});

postSchema.define({
  author: authorSchema,
  categories: arrayOf(categorySchema),
});

export {
  postSchema,
  authorSchema,
  categorySchema,
};
