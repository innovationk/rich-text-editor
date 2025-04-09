# rich-text-editor

## How to dev in local

### Create a symlink of the futur component

```
cd rich-text-editor
npm link # rf: https://docs.npmjs.com/cli/v9/commands/npm-link
```

### Update documentation

```
npm install -g jsdoc # install

cd rich-text-editor
jsdoc -c jsdoc.json # generate
```

### Create a symlink in the project that will use the futur component

```
cd project-nots
npm link @devguild/rich-text-editor

npm run dev
```

```
cd project-ts
# if doubt: rm -rf ./node_modules/@devguild
npm link @devguild/rich-text-editor

npm run dev
```