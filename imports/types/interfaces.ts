import { ReactNode } from 'react';

export interface ComponentProps {
    history?: any;
    location?: any;
    /**
     * @deprecated in newer react versions use `useParams()` instead
     */
    match?: {
        params?: any;
        path: string;
    };
    staticContext?: any;
    children?: ReactNode;
}

export interface SearchableObject {
    [index: string]: any;
}

export interface MongoDBOptions {
    sort?: Mongo.SortSpecifier | undefined;
    skip?: number | undefined;
    limit?: number | undefined;
    fields?: Mongo.FieldSpecifier | undefined;
    reactive?: boolean | undefined;
    transform?: Function | undefined;
}

export interface MongoDBSelector {
    [key: string]: any;
}

export interface MethodSearchModel {
    selector?: MongoDBSelector;
    options?: MongoDBOptions;
    /**
     * Should only one value be returned
     */
    onlyOne?: boolean;
}
