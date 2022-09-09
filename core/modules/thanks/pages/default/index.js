import Content from '@core_modules/thanks/pages/default/components';
import ErrorInfo from '@core_modules/thanks/pages/default/components/ErrorInfo';
import Skeleton from '@core_modules/thanks/pages/default/components/Loader';
import CoreMultiseller from '@core_modules/thanks/pages/default/components/multiseller';
import Core from '@core_modules/thanks/pages/default/core';
import { getCheckoutDataFromRequest } from '@helper_cookies';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Router from 'next/router';

const Page = (props) => {
    const { storeConfig } = props;
    if (storeConfig.enable_oms_multiseller === '1') {
        return (
            <CoreMultiseller
                {...props}
            />
        );
    }
    return (
        <Core
            Skeleton={Skeleton}
            Content={Content}
            ErrorInfo={ErrorInfo}
            {...props}
        />
    );
};

Page.getInitialProps = async (ctx) => {
    const checkoutData = getCheckoutDataFromRequest(ctx);
    if (!checkoutData) {
        if (ctx.res) {
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', '/');
            return { props: {}, namespacesRequired: ['common', 'thanks', 'home', 'login'] };
        }
        Router.push('/');
    }
    return {
        query: ctx.query,
        checkoutData: typeof checkoutData === 'string' ? JSON.parse(checkoutData) : checkoutData,
        namespacesRequired: ['common', 'thanks', 'login'],
    };
};

export default withApollo({ ssr: false })(withTranslation()(Page));
