/* eslint-disable no-plusplus */
/**
 * function to generate config product
 * @param Object query
 * @param Object configuration
 * @returns object
 */
const generateConfig = (query, config, elastic, availableFilter = []) => {
    const filter = {};
    for (let index = 0; index < availableFilter.length; index++) {
        const element = availableFilter[index];
        filter[element.attribute_code] = element.attribute_code;
    }
    const resolveConfig = config;
    // eslint-disable-next-line no-restricted-syntax
    for (const q in query) {
        if (q.includes('seller') && !q.includes('filter')
        && q !== 'seller_id' && q !== 'seller_name') {
            const trueQuery = q.split('?');
            if (trueQuery && trueQuery[1]) {
                resolveConfig.filter.push({
                    type: trueQuery[1],
                    value: query[q],
                });
            }
        } else if ((q === 'sort' || q.includes('sort')) && query[q] !== '') {
            resolveConfig.sort = JSON.parse(decodeURIComponent(query[q]));
        } else if (q === 'seller_id' || q === 'seller_name') {
            resolveConfig.filter.push({
                type: q,
                value: query[q],
            });
        } else if (q === 'q' && q.includes('q')) {
            let search = query[q];
            search = search.replace(/[^a-zA-Z0-9 ]/g, '');
            resolveConfig.search = search;
        } else if (q === 'priceRange') {
            const price = query[q].split(',');
            // eslint-disable-next-line radix
            if (parseInt(price[1]) !== 0) {
                resolveConfig.filter.push({
                    type: 'price',
                    from: price[0],
                    to: price[1],
                });
            }
        } else if (q !== 'cat' && query[q]) {
            if (filter[q]) {
                resolveConfig.filter.push({
                    type: q,
                    value: elastic ? query[q].split(',') : query[q],
                });
            }
        }
    }
    return resolveConfig;
};

export default generateConfig;
