#!/usr/bin/env node

const fs = require('fs');

const createBreakpointsPath = require.resolve(
  '@material-ui/core/styles/createBreakpoints.js',
);

const content = fs.readFileSync(createBreakpointsPath).toString();
const search = "var keys = ['xs', 'sm', 'md', 'lg', 'xl'];";
const replace = "var keys = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];";

fs.writeFileSync(createBreakpointsPath, content.replace(search, replace));
