/**
 * Copyright © 2019 Rifa Achrinza
 *
 * SPDX-License-Identifier: MIT
 */

import rp from "request-promise-native";

export default class Caller {
  private _apiKey: string;
  private _baseURL = "http://datamall2.mytransport.sg/ltaodataservice";

  public constructor(apiKey: string, options?: datamall.CallerOptions) {
    this._apiKey = apiKey;

    if (options) {
      if (options.baseURL) {
        this._baseURL = options.baseURL;
      }
    }
  }

  public async request(
    dataset: datamall.APIDataset,
    options: datamall.RequestOptions
  ): Promise<datamall.APIAllResponses> {
    const apiAcceptFormat = options.format;

    try {
      const rpOptions = {
        url: this._baseURL + dataset,
        headers: {
          AccountKey: this._apiKey,
          accept: apiAcceptFormat
        }
      };

      const apiResult = await rp(rpOptions);
      return apiResult;
    } catch (err) {
      throw new Error(err);
    }
  }
}
