import rp from 'request-promise-native';

export class Caller {
    private _apiKey: string;
    private _baseURL = 'http://datamall2.mytransport.sg/ltaodataservice';

    constructor(apiKey: string, options: datamall.CallerOptions) {
        this._apiKey = apiKey;

        if (!!options.baseURL) {
            this._baseURL = options.baseURL;
        }
    }

    async request(dataset: datamall.Dataset, options: datamall.RequestOptions): Promise<{}> {
        const apiAcceptFormat = options.format;

        try {
            const rpOptions = {
                url: this._baseURL + dataset,
                headers: {
                    AccountKey: this._apiKey,
                    accept: apiAcceptFormat
                }
            }

            const apiResult = await rp(rpOptions);
            return apiResult
        } catch (err) {
            throw new Error (err);
        }
    } 
}