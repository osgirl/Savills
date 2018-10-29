import { all } from "redux-saga/effects";
import app from "./states/app/saga";
import account from "./states/account/saga";

export default function* sagaRoot() {
  yield all([
    app(),
    account(),
  ]);
}
