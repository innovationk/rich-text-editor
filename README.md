# rich-text-editor

## How to dev in local

### Create a symlink

```
cd rich-text-editor
npm link # rf: https://docs.npmjs.com/cli/v9/commands/npm-link
```

### Symlink with a project

```
cd project-nots
# if doubt: rm -rf ./node_modules/@devguild
npm link @devguild/rich-text-editor

npm run dev
```

```
cd project-ts
# if doubt: rm -rf ./node_modules/@devguild
npm link @devguild/rich-text-editor

npm run dev
```