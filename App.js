import React from 'react';
import { UserIdProvider } from './screens/components/UserIdContext'; 
import {User} from './AppNav';

export default function App() {
    return (
        <UserIdProvider>
            <User />
        </UserIdProvider>
    );
}
