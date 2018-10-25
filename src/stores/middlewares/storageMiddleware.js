import Storage from '@utils/storage';
import key from '@utils/keymirror';

const typeSuffix = key({
    SUCCESS: null,
    FAIL: null
});

export default storageMiddleware = store => next => action => {
    if (action.payload && action.payload.storage) {
        let info = action.payload.storage;
        next(action);
        let storage;
        switch (info.type) {
            case "getInt":
                storage = Storage.getInt(info.key);
                break;
            case "getString":
                storage = Storage.getString(info.key);
                break;
            case "getDictionary":
                storage = Storage.getDictionary(info.key);
                break;
            case "getDictionaryObject":
                storage = Storage.getDictionaryObject(info.key);
                break;
            case "getArrayInt":
                storage = Storage.getArrayInt(info.key);
                break;
            case "getArrayString":
                storage = Storage.getArrayString(info.key);
                break;
            case "getArrayObject":
                storage = Storage.getArrayObject(info.key);
                break;
            //
            case "setInt":
                storage = Storage.setInt(info.key, info.data);
                break;
            case "setString":
                storage = Storage.setString(info.key, info.data);
                break;
            case "setDictionary":
                storage = Storage.setDictionary(info.key, info.data);
                break;

            case "setDictionaryObject":
                storage = Storage.setDictionaryObject(info.key, info.data);
                break;
            case "setArrayInt":
                storage = Storage.setArrayInt(info.key, info.data);
                break;
            case "setArrayString":
                storage = Storage.setArrayString(info.key, info.data);
                break;
            case "setArrayObject":
                storage = Storage.setArrayObject(info.key, info.data);
                break;
            case "remove":
                storage = Storage.remove(info.key);
                break;
            default:
                return next(action);
        }
        return storage.then((value) => resolved({ store, next, action, value }))
    }
    return next(action);
};

function resolved(res) {
    if (res.value == undefined) {
        let payload = res.action.payload.storage.default || {
            error: "null"
        };
        return res.next({
            type: res.action.type + "_" + typeSuffix.FAIL,
            payload: payload,
        });
    }

    return res.next({
        type: res.action.type + "_" + typeSuffix.SUCCESS,
        payload: res.value,
        params: res.action.params
    });
}