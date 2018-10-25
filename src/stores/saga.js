import { all } from "redux-saga/effects";
import app from "./states/app/saga";

export default function* sagaRoot() {
  yield all([
    app(),
    
  ]);
}
