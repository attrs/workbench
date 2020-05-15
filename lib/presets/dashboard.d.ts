export declare const dashboard: {
    target: string;
    view: {
        flexbox: string;
        flex: number;
        items: ({
            id: string;
            cls: string;
            style: {
                '-webkit-app-region': string;
            };
            flexbox: string;
            items: ({
                id: string;
                cls: string;
                width: number;
                flex?: undefined;
                flexbox?: undefined;
                items?: undefined;
            } | {
                id: string;
                flex: number;
                flexbox: string;
                items: ({
                    id: string;
                    type: string;
                    flex?: undefined;
                    style?: undefined;
                } | {
                    id: string;
                    type: string;
                    flex: number;
                    style: {
                        'text-align': string;
                    };
                })[];
                cls?: undefined;
                width?: undefined;
            })[];
            flex?: undefined;
        } | {
            id: string;
            flexbox: string;
            flex: number;
            items: ({
                id: string;
                flexbox: string;
                cls: string;
                width: number;
                items: {
                    id: string;
                    type: string;
                }[];
                flex?: undefined;
            } | {
                id: string;
                cls: string;
                flex: number;
                flexbox?: undefined;
                width?: undefined;
                items?: undefined;
            })[];
            cls?: undefined;
            style?: undefined;
        })[];
    };
};
