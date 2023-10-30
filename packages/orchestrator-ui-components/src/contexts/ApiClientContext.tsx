import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ApiClient, getApiClient } from '../api';
import { ORCHESTRATOR_API_BASE_URL } from 'wfo-ui/constants';

interface ApiContext {
    apiClient: ApiClient;
}

export const ApiClientContext = createContext<ApiContext>({
    apiClient: getApiClient(ORCHESTRATOR_API_BASE_URL),
});

export type ApiClientContextProviderProps = {
    basePath: string;
    children: ReactNode;
};

export const ApiClientContextProvider = ({
    basePath,
    children,
}: ApiClientContextProviderProps) => {
    const [apiPath, setApiPath] = useState<string>(basePath);
    const apiClient = getApiClient(apiPath);

    useEffect(() => {
        if (basePath) {
            setApiPath(basePath);
        }
    }, [basePath]);

    return (
        <ApiClientContext.Provider value={{ apiClient: apiClient }}>
            {children}
        </ApiClientContext.Provider>
    );
};
