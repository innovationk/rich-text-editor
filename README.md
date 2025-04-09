# rich-text-editor

## How to dev in local

### Create a symlink of the futur component

```
cd rich-text-editor
npm link # rf: https://docs.npmjs.com/cli/v9/commands/npm-link
```

### Create a symlink in the project that will use the futur component

```
cd project-nots
npm link @devguild/rich-text-editor
npm run dev
```