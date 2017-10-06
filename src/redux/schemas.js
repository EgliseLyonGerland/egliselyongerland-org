import { schema } from "normalizr";
import { some } from "lodash";

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
      return {
        ...entity,
        partial: key === "data",
        predication: some(entity.categories, ["slug", "predications"])
      };
    }
  }
);

export { postSchema, authorSchema, categorySchema };
