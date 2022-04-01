import { IRestError } from "../utils/rest_errors";

export interface IResultAndError {
  result: any;
  error: null | IRestError
}
