# React Search Query String Helper

Adds additional methods to handle search query.

[![NPM](https://img.shields.io/npm/v/react-search-query-string-helper.svg)](https://www.npmjs.com/package/react-search-query-string-helper) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

### npm
```bash
npm install --save react-search-query-string-helper
```
### yarn
```bash
yarn add react-search-query-string-helper
```

## Usage

```jsx
import React, { Component } from 'react';
import withSearchHelper from 'react-search-query-string-helper';

class MyComponent extends Component {
  render() {
    const search = JSON.stringify(this.parseSearch());

    return (
      <p>{search}</p>
    );
  }
}
export default withSearchHelper(MyComponent);
```

## Added Methods

* parseSearch() - Returns parsed search object
* replaceSearch(search [String]) - Call history.replace with supplied search string
* updateSearch(search [Object]) - Convert supplied search object into query string and call *replaceSearch()*
* addSearch(search [Object]) - Add supplied search object with existing search query
* removeSearch(keys [Array]) - Remove all keys from existing search query
* clearSearch() - Clear search query

MIT © [sandeshshrestha](https://github.com/sandeshshrestha)
