import IObjectProps from "../common/props.interface"
/**
 * @description parses the params that are part of the search query
 * @param {Object} obj query params
 * @return {Object}
 */

const getQueryParser = function(obj : IObjectProps ) {
    const {page, limit, filter} = obj;
    const pageNumber = Math.abs(parseInt(page)) || 1;
    const docLimit = parseInt(limit) || 10;
    const skip = docLimit * (pageNumber - 1);
    let options : IObjectProps = {};

    if (filter) {
      const filters = filter.replace(" ", "").split(",");
      filters.map((e : string) => (options[e.trim()] = 1));
    }
   
    return {
      skip: skip,
      size: docLimit,
      filters: options
    };
};

export default getQueryParser
  