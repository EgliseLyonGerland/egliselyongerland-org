import { schema } from "normalizr";

const { Entity } = schema;

const authorSchema = new Entity("authors", {
  idAttribute: "id"
});

const categorySchema = new Entity("categories", {
  idAttribute: "id"
});

const postSchema = new Entity(
  "posts",
  {
    author: authorSchema,
    categories: [categorySchema]
  },
  {
    idAttribute: "id",
    processStrategy: (entity, parent, key) => {
      return { ...entity, partial: key === "data" };
    }
  }
);

export { postSchema, authorSchema, categorySchema };
