# React bulk cli

Cli to generate react components bulk.

If you want to create React Component bulk, this cli is best solution for you!

## Install

```bash
npm i -g react-bulk-cli # install global
npm i react-bulk-cli # install local
```

## Usage

```bash
rcg -f Home About Profile # or
npx rcg -f Home About Profile

# generated dir created
# generated/About.jsx is generated
# generated/Profile.jsx is generated
# generated/Home.jsx is generated
```

## Options

| option      | alias | description                | required | default   |
|-------------|-------|----------------------------|----------|-----------|
| --files     | -f    | list of components         | O        | -         |
| --dir       | -d    | directory                  | X        | generated |
| --extension | -e    | extension of component     | X        | jsx       |
| --tag       | -t    | root tag of each component | X        | div       |
 
