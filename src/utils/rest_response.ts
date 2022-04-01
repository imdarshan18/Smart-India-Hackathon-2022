
export interface IRestResponse {
  type: string;
  data: any;
  status: number;
  success: boolean;
  message?: string;
  moreInfo?: any;
}

interface INewResponseParams {
  type?: string;
  data?: any;
  message?: string;
  status?: number;
  moreInfo?: any;
}

export default class RestResponse {
  public static newResponse({ type, data, message, status, moreInfo }: INewResponseParams): IRestResponse {
    const r: IRestResponse = {
      type: type || "ok_response",     // String
      data: data,             // Mixed/Object | not present if undefined
      status: status || 200, // Int
      success: true
    }

    if (message) {
      r.message = message;
    }

    if (moreInfo) {
      r.moreInfo = moreInfo;
    }

    return r;
  }
}
