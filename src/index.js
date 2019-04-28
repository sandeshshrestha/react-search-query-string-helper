import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import isObject from 'lodash.isobject';
import cloneDeep from 'lodash.clonedeep';

const cacheSearch = {};

const parseSearchStringToObject = search => {
  // Do the parse if not in cache
  if (!cacheSearch[search]) {
    const queryData = queryString.parse(search);

    Object.keys(queryData).forEach(key => {
      let val = decodeURIComponent(queryData[key]);

      // Try to parse in case of stringified object/array
      if (val[0] === '{' || val[0] === '[') {
        try {
          val = JSON.parse(val);
          /* eslint-disable-next-line no-empty */
        } catch (e) {
          console.warn(`Invalid JSON in search query ${key}=${val}`);
        }
      }
      queryData[key] = val;
    });

    // Save the value in cache so we don't need to re-parse the string again
    cacheSearch[search] = queryData;
  }

  return cloneDeep(cacheSearch[search]);
};

const parseSearchObjectToString = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach(key => {
    // Remove keys with falsy value
    if (obj[key]) {
      let val = obj[key];

      // Stringify the value if it is object or array
      if (isObject(val) || Array.isArray(val)) {
        val = JSON.stringify(val);
      }

      newObj[key] = val;
    }
  });

  return queryString.stringify(newObj);
};

const withSearchQueryStringHelper = wrappedComponent => {
  Object.assign(wrappedComponent.prototype, {
    parseSearch() {
      const { location: { search } } = this.props;

      return parseSearchStringToObject(search);
    },
    replaceSearch(search) {
      const { history } = this.props;

      history.replace({
        search
      });
    },
    updateSearch(obj) {
      this.replaceSearch(parseSearchObjectToString(obj));
    },
    addSearch(obj) {
      let data = this.parseSearch();

      data = Object.assign(data, obj);
      this.updateSearch(data);
    },
    removeSearch(keys = []) {
      let data = this.parseSearch();
      const newObj = {};

      // Exclude the key that are listed in keys
      Object.keys(data).forEach(key => {
        if (keys.indexOf(key) === -1) {
          newObj[key] = data[key];
        }
      });

      this.updateSearch(newObj);
    },
    clearSearch() {
      this.replaceSearch('');
    }
  });

  return withRouter(wrappedComponent);
};

export default withSearchQueryStringHelper;
