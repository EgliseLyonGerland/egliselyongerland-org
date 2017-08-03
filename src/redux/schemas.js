import { schema, arrayOf } from 'normalizr';

const postSchema = new schema.Entity('posts', {
  idAttribute: 'id'
});

const authorSchema = new schema.Entity('authors', {
  idAttribute: 'id'
});

const categorySchema = new schema.Entity('categories', {
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
