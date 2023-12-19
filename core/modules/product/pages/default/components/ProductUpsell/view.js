import React from 'react';
import dynamic from 'next/dynamic';
import propTypes from 'prop-types';
import cx from 'classnames';
import Typography from '@common_typography';

const Caraousel = dynamic(() => import('@common_slick/Caraousel'), { ssr: false });
const ProductItem = dynamic(() => import('@plugin_productitem'), { ssr: false });

const ProductRelatedView = ({ data, t, storeConfig }) => (
    <div className={cx('product-related-container', 'xs:basis-full lg:basis-full', 'mt-[48px]')}>
        <Typography
            variant="h1"
            className={
                cx(
                    'desktop:mb-[24px] tablet:mb-[16px] mobile:mb-[16px]',
                    'desktop:mx-[0px] tablet:mx-[16px] mobile:mx-[16px]',
                )
            }
        >
            {t('product:upsellTitle')}
        </Typography>
        <Caraousel
            enableQuickView={false}
            data={data}
            Item={ProductItem}
            storeConfig={storeConfig}
        />
    </div>
);

ProductRelatedView.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: propTypes.array,
    t: propTypes.func.isRequired,
};

ProductRelatedView.defaultProps = {
    data: [],
};

export default ProductRelatedView;
