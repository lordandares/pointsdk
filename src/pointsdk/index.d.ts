export type PromisedValue<T> = Promise<T> & {
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason: Error | string | undefined) => void,
};

export type ContractCallRequest = { contract: string, method: string, params?: unknown[] };

export type ContractSendRequest = { contract: string, method: string, params?: unknown[] };

export type URLSearchQuery = ConstructorParameters<typeof URLSearchParams>[0];

export type StorageGetRequest = { id: string, encoding?: string } & Record<string, string>;

export type SubscriptionOptions = Record<string, unknown>;

export type SubscriptionParams = { contract: string, event: string } & SubscriptionOptions;

export type SubscriptionRequest = { type: string, params: SubscriptionParams };

export type SubscriptionEventMetaData = { type: string, request: SubscriptionRequest, subscriptionId: string | null };

export type SubscriptionEvent<T> = SubscriptionEventMetaData & { data: T };

export type MessageQueueConfig = { type: string, params?: SubscriptionParams | Record<string, unknown> };

export type SubscriptionMessages = { [subscriptionId: string]: any[] };

export type SubscriptionErrors = { [subscriptionId: string]: Error | null };

export type ZProxyWSOptions = {
    messageQueueSizeLimit?: number,
};

export type ZProxyWS = WebSocket & {
    subscribeToContractEvent: <T>(cfg: SubscriptionParams) => Promise<() => Promise<T>>,
};

export type PointType = {
    status: {
        ping: () => Promise<'pong'>,
    },
    contract: {
        call: <T>(request: ContractCallRequest) => Promise<T>,
        send: <T>(request: ContractSendRequest) => Promise<T>,
        subscribe: <T>(request: SubscriptionParams) => Promise<() => Promise<T>>,
    },
    storage: {
        get: <T>(request: StorageGetRequest) => Promise<T>,
    },
    wallet: {
        address: () => Promise<string>,
        hash: () => Promise<string>,
    },
};
