const fs = require('fs');
const recast = require('recast');
const babel = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const recastOptions = {
  lineTerminator: '\n',
  tabWidth: 2,
  useTabs: false
};

const source = fs.readFileSync('./code.js', 'utf-8');

const ast = recast.parse(source, {
  ...recastOptions,
  parser: {
    parse: (code) => babel.parse(code, {
      allowImportExportEverywhere: true,
      sourceType: 'module',
      plugins: [
        'jsx',
        'objectRestSpread',
        'classProperties',
        'functionBind',
        'dynamicImport'
      ]
    })
  }
});

const findExpressionStatement = (ast) => {
  let found = null;
  traverse(ast, {
    ObjectExpression(path) {
      found = path.node;
      path.stop();
    }
  });
  return found;
};

const expressionStatement = findExpressionStatement(ast);
const reprintedCode = recast.print(expressionStatement, recastOptions).code;
const originalCode = source.substring(expressionStatement.start, expressionStatement.end);

console.log(originalCode);
console.log(reprintedCode);
console.log(originalCode === reprintedCode);
