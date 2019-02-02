/**
 * Copyright © 2019 Rifa Achrinza
 * 
 * SPDX-License-Identifier: MIT
 */

// Type definitions for lta-datamall-caller
// Project: LTA Datamall Caller
// Definitions by: Rifa Achrinza <https://www.acchrinza.com/>

export as namespace datamall;

export type APIAcceptFormat =
  | "application/atom+xml"
  | "application/json"
  | "atom+xml"
  | "json"
  | "xml";

export type APIDataset =
  | "BusArrivalv2"
  | "BusServices"
  | "BusRoutes"
  | "BusStops"
  | "PV/Bus"
  | "PV/ODBus"
  | "PV/ODTrain"
  | "PV/Train"
  | "Taxi-Availability"
  | "TrainServiceAlerts";

export type APIBusOperator = "SBST" | "SMRT" | "TTS" | "GAS";

export interface CallerOptions {
  baseURL?: string;
}

export interface RequestOptions {
  format: APIAcceptFormat;
}

export interface APIResponse {
  "odata.metadata": string;
}

export interface APIBusArrivalNextBus {
  OriginCode: string;
  DestintationCode: string;
  EstimatedArrival: string;
  Latitude: string;
  Longitude: string;
  VisitNumber: string;
  Load: "SEA" | "SDA" | "LSD";
  Feature: "WAB" | "";
  Type: "SD" | "DD" | "BD";
}

export interface APIBusArrivalv2Response extends APIResponse {
  BusStopCode: string;
  Services: {
    ServiceNo: string;
    Operator: APIBusOperator;
    NextBus: APIBusArrivalNextBus;
    NextBus2: APIBusArrivalNextBus;
    NextBus3: APIBusArrivalNextBus;
  }[];
}

export type APIBusServiceCategory =
  | "EXPRESS"
  | "FEEDER"
  | "INDUSTRIAL"
  | "TOWNLINK"
  | "TRUNK"
  | "2 TIER FLAT FEE"
  | "FLAT FEE $1.10"
  | "FLAT FEE $1.90"
  | "FLAT FEE $3.50"
  | "FLAT FEE $3.80";

export interface APIBusService {
  ServiceNo: string;
  Operator: APIBusOperator;
  Direction: 1 | 2;
  Category: APIBusServiceCategory;
  OriginCode: string;
  DestinationCode: string;
  AM_Peak_freq: string;
  AM_Offpeak_Freq: string;
  PM_Peak_Freq: string;
  PM_Offpeak_Freq: string;
  LoopDesc: string | "";
}

export interface APIBusServicesResponse extends APIResponse {
  value: APIBusService[];
}

export interface APIBusRoute {
  ServiceNo: string;
  Operator: APIBusOperator;
  Direction: 1 | 2;
  StopSequence: number;
  BusStopCode: string;
  Distance: number;
  WD_FirstBus: string;
  WD_LastBus: string;
  SAT_FirstBus: string;
  SAT_LastBus: string;
  SUN_FirstBus: string;
  SUN_LastBus: string;
}

export interface APIBusRoutesResponse extends APIResponse {
  value: APIBusRoute[];
}

export interface APIBusStop {
  BusStopCode: string;
  RoadName: string;
  Description: string;
  Latitude: number;
  Longitude: number;
}

export interface APIBusStopsResponse extends APIResponse {
  value: APIBusStop[];
}

export interface APIPVBusResponse extends APIResponse {
  Link?: string;
}

export interface APIPVODBusResponse extends APIResponse {
  Link?: string;
}

export interface APIPVODTrainResponse extends APIResponse {
  Link?: string;
}

export interface APIPVTrainResposne extends APIResponse {
  Link?: string;
}

export interface APITaxiAvailability {
  Longitude: number;
  Latitude: number;
}

export interface APITaxiAvailabilityResponse extends APIResponse {
  value: APITaxiAvailability[];
}

export interface APITrainServiceAlertsAffectedSegments {
  Line:
    | "CCL"
    | "CEL"
    | "CGL"
    | "DTL"
    | "EWL"
    | "NEL"
    | "NSL"
    | "PEL"
    | "PWL"
    | "SEL"
    | "SWL"
    | "BPL";
  Direction: "Both" | string;
  Stations: string | "";
  FreePublicBus: string | "";
  FreeMRTShuttle: string | "";
  MRTShuttleDirection: "Both" | string;
}

export interface APITrainServiceAlertsMessage {
  Content: string;
  CreatedDate: string;
}

export interface APITrainServiceAlertsResponse extends APIResponse {
  value: {
    Status: 1 | 2;
    AffectedSegments: APITrainServiceAlertsAffectedSegments[] | void[];
    Message: APITrainServiceAlertsMessage[] | void[];
  };
}

export interface APICarparkAvailability {
  CarParkID: string;
  Area: "Orchard" | "Marina" | "Harbfront" | "JurongLakeDistrict" | "";
  Development: string;
  Location: "string";
  AvailableLots: number;
  LotType: "C" | "H" | "Y";
  Agency: "HDB" | "LTA" | "URA";
}

export interface APICarparkAvailabilityv2Response extends APIResponse {
  value: APICarparkAvailability[];
}

export interface APIERPRates {
  VehicleType:
    | "Passenger Cars"
    | "Motorcycles"
    | "Light Goods Vehicles"
    | "Heavy Goods Vehicles"
    | "Very Heavy Goods Vehicles"
    | "Taxis";
  DayType: "Weekdays" | "Saturdays";
  StartTime: string;
  EndTime: string;
  ZoneID: string;
  ChargeAmount: number;
  EffectiveDate: string;
}

export interface APIERPRatesResponse extends APIResponse {
  value: APIERPRates[];
}

export interface APIEstTravelTimes {
  Name: string;
  Direction: 1 | 2;
  FarEndPoint: string;
  StartPoint: string;
  EndPoint: string;
  EstTime: number;
}

export interface APIEstTravelTimesResponse extends APIResponse {
  value: APIEstTravelTimes[];
}

export interface APIFaultyTrafficLights {
  AlarmID: string;
  NodeID: string;
  Type: 4 | 13;
  StartDate: string;
  EndDate: string | "";
  Message: string;
}

export interface APIFaultyTrafficLightsResponse extends APIResponse {
  value: APIFaultyTrafficLights[];
}

export interface APIRoadOpenings {
  EventID: string;
  StartDate: string;
  EndDate: string;
  SvcDept: string;
  RoadName: string;
  Other: string;
}

export interface APIRoadOpeningsResponse {
  value: APIRoadOpenings[];
}

export interface APIRoadWorks extends APIRoadOpenings {
  value: APIRoadOpenings[];
}

export interface APIRoadWorksResponse extends APIResponse {
  value: APIRoadWorks;
}

export interface APITrafficImages {
  CameraID: string;
  Latitude: number;
  Longitude: number;
  ImageLink: string;
}

export interface APITrafficImagesResponse extends APIResponse {
  value: APITrafficImages[];
}

export interface APITrafficIncidents {
  Type:
    | "Accident"
    | "Road Works"
    | "Vehicle Breakdown"
    | "Weather"
    | "Obstacle"
    | "RoadBlock"
    | "Heavy Traffic"
    | "Misc."
    | "Diversion"
    | "Unattended Vehicle";
  Latitude: number;
  Longitude: number;
  Message: string;
}

export interface APITrafficIncidentsResponse extends APIResponse {
  value: APITrafficIncidents[];
}

export interface APITrafficSpeedBandsv2 {
  LinkID: string;
  RoadName: string;
  RoadCategory: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  SpeedBand: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  MinimumSpeed: string;
  MaximumSpeed: string;
  Location: string;
}

export interface APITrafficSpeedBandsv2Response extends APIResponse {
  value: APITrafficSpeedBandsv2;
}

export interface APIVMS {
  EquipmentID: string;
  Latitude: number;
  Longitude: number;
  Message: string;
}

export interface APIVMSResposne extends APIResponse {
  value: APIVMS[];
}

export type APIAllResponses
  = APIPVBusResponse
  | APIPVODBusResponse
  | APIBusStopsResponse
  | APIERPRatesResponse
  | APIBusRoutesResponse
  | APIPVODTrainResponse
  | APIRoadWorksResponse
  | APIBusServicesResponse
  | APIBusArrivalv2Response
  | APIRoadOpeningsResponse
  | APITrafficImagesResponse
  | APIEstTravelTimesResponse
  | APITaxiAvailabilityResponse
  | APITrafficIncidentsResponse
  | APIFaultyTrafficLightsResponse
  | APITrafficSpeedBandsv2Response
  | APICarparkAvailabilityv2Response
  | APITrainServiceAlertsResponse;