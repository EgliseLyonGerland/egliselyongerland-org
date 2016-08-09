import { Schema, arrayOf } from 'normalizr';

const postSchema = new Schema('posts', {
  idAttribute: 'ID'
});

const authorSchema = new Schema('authors', {
  idAttribute: 'ID'
});

const categorySchema = new Schema('categories', {
  idAttribute: 'ID'
});

postSchema.define({
  author: authorSchema,
  terms: {
    category: arrayOf(categorySchema),
  },
});

categorySchema.define({
  parent: categorySchema
});

export {
  postSchema,
  authorSchema,
  categorySchema,
};
