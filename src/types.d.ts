declare namespace datamall {
    export type AcceptFormat
        = 'application/atom+xml'
        | 'application/json'
        | 'atom+xml'
        | 'json'
        | 'xml';

    export type Dataset
        = 'BusArrivalv2'
        | 'BusServices'
        | 'BusRoutes'
        | 'BusStops'
        | 'PV/Bus'
        | 'PV/ODBus'
        | 'PV/ODTrain'
        | 'PV/Train'
        | 'Taxi-Availability'
        | 'TrainServiceAlerts';

    export interface CallerOptions {
        baseURL: string
    }

    export interface RequestOptions {
        format: AcceptFormat
    }
}