// in src/Layout.js
import * as React from 'react';
import { Layout } from 'react-admin';

import { MySidebar } from './MySidebar';
import CustomAppBar from './MyAppBar';

export const MYLayout = ({ children }) => (
    <Layout sidebar={MySidebar} appBar={CustomAppBar}>
        {children}
    </Layout>
);
