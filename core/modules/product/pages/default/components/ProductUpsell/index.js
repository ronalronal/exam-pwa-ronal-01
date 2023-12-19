/* eslint-disable array-callback-return */
import React from 'react';
import propTypes from 'prop-types';
import dynamic from 'next/dynamic';
import TagManager from 'react-gtm-module';
import { getUpsellProduct } from '@core_modules/product/services/graphql';

const View = dynamic(() => import('@core_modules/product/pages/default/components/ProductUpsell/view'), { ssr: false });
const Loader = dynamic(() => import('@common_slick/Caraousel/Skeleton'));

const ProductUpsell = ({
    dataProduct, isLogin, storeConfig, ...other
}) => {
    const context = (isLogin && isLogin === 1) ? { request: 'internal' } : {};

    const { loading, data, error } = getUpsellProduct(storeConfig, { context, variables: { url: dataProduct.url_key } });

    React.useEffect(() => {
        if (!loading && !error && data && data.products && data.products.items.length > 0
            && data.products.items[0].related_products && data.products.items[0].related_products.length > 0) {
            let index = 0;
            let categoryProduct = '';
            // eslint-disable-next-line no-unused-expressions
            dataProduct.categories.length > 0 && dataProduct.categories.map(({ name }, indx) => {
                if (indx > 0) categoryProduct += `/${name}`;
                else categoryProduct += name;
            });
            const tagManagerArgs = {
                dataLayer: {
                    pageName: dataProduct.name,
                    pageType: 'product',
                    ecommerce: {
                        impressions: [
                            ...data.products.items[0].related_products.map((val) => {
                                index += 1;
                                return ({
                                    name: val.name,
                                    id: val.sku,
                                    category: categoryProduct,
                                    price: val.price_range.minimum_price.regular_price.value,
                                    list: `Related Products From ${dataProduct.name}`,
                                    position: index,
                                });
                            }),
                        ],
                    },
                    event: 'impression',
                    eventCategory: 'Ecommerce',
                    eventAction: 'Impression',
                    eventLabel: dataProduct.name,
                },
            };
            TagManager.dataLayer(tagManagerArgs);
        }
    }, [data]);

    if (loading) return <Loader />;

    if (!loading && !error && data && data.products && data.products.items.length > 0
        && data.products.items[0].upsell_products && data.products.items[0].upsell_products.length > 0) {
        return (
            <View
                {...other}
                storeConfig={storeConfig}
                data={data.products.items[0].upsell_products}
            />
        );
    }

    return null;
};

ProductUpsell.propTypes = {
    t: propTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    dataProduct: propTypes.object.isRequired,
};

export default ProductUpsell;
