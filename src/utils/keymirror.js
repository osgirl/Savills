export default (obj, prefix = "") => {
    var ret = {};
    var key;
    if (!(obj instanceof Object && !Array.isArray(obj))) {
        throw new Error('keyMirror(...): Argument must be an object.');
    }
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = prefix + key;
            ret[key + "_SUCCESS"] = prefix + key + "_SUCCESS";
            ret[key + "_FAIL"] = prefix + key + "_FAIL";
        }
    }
    return ret;
};