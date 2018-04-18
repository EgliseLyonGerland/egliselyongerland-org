export const clearfix = () => ({
  "&:before, &:after": {
    content: `" "`,
    display: "table"
  },
  "&:after": {
    clear: "both"
  }
});
