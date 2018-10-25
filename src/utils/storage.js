'use strict'

import {
    AsyncStorage
} from 'react-native';


export default class Storage {
    static STORAGE_KEY = "_StorageKey_";

    static async getString(key: string): string {
        return _get(key);
    }

    static async getInt(key: string): number {
        return _get(key).then((value) => parseInt(value));
    }

    static async getArrayInt(key: string): Array<number> {
        return _get(key).then((value) => {
            if (value == null) {
                return null;
            } else {
                return JSON.parse("[" + value + "]");
            }
        });
    }

    static async getArrayString(key: string): Array<string> {
        return _get(key).then((value) => {
            if (value == null) {
                return null;
            } else {
                return value.split(",");
            }

        });
    }

    static async getDictionary(key: string) {
        return _getMulti(key).then((value) => {

            if (!value) return null;
            return Object.keys(value).length == 0 ? null : value;
        });
    }

    static async getArrayObject(key: string) {
        const data = await _get(key);
        return JSON.parse(data);
        // let length = await _get(key).then((value) => parseInt(value));

        // let res = [];
        // for (let i = 0; i < length; i++) {
        //     let value = await _getMulti(key + i);
        //     res.push(value);
        // }
        // return res;
    }

    static async getDictionaryObject(key: string) {
        let listKeys = await _get(key).then((value) => {
            if (value == null) {
                return null;
            } else {
                return value.split(",");
            }
        });
        let dictionary = {};
        for (let pairKey in listKeys) {
            dictionary[listKeys[pairKey]] = await _getMulti(key + listKeys[pairKey]);
        }
        return Object.keys(dictionary).length == 0 ? null : dictionary;
    }

    static async setInt(key: string, value: number) {
        return _set(key, value.toString()).then(() => value.toString());
    }

    static async setString(key: string, value: string) {
        return _set(key, value).then(() => value);
    }

    static async setArrayInt(key: string, value: Array<number>) {
        return _set(key, value.toString()).then(() => value);
    }

    static async setArrayString(key: string, value: Array<string>) {
        return _set(key, value.toString()).then(() => value);
    }


    /**
     * [{},{}]
     */
    static async setArrayObject(key: string, dictionary: Array<object>) {    
        await _set(key, JSON.stringify(dictionary));
        
        // await _set(key, dictionary.length.toString());

        // for (let index in dictionary) {
        //     await _setMulti(key + index, dictionary[index]);
        // }
        return dictionary;
    }

    /*
    {
        "" : "",
        "" : "",
    }
    Dictionary<string,string>
    */
    static async setDictionary(key: string, dictionary: object) {
        return _setMulti(key, dictionary).then(() => dictionary);
    }

    /*
    {
        "" : {
            
        },
        
        "" : {
            
        }
    }
    Dictionary<string,Dictionary<string,string>>
    */
    static async setDictionaryObject(key: string, dictionary: object) {
        try {
            let keys = [];
            for (var pairKey in dictionary) {
                await _setMulti(key + pairKey, dictionary[pairKey]);
                keys.push(pairKey);
            }
            await _set(key, keys.toString());
            return dictionary;
        } catch (error) {
            console.log("Storage error _setMultiObject : ", error);
            return null;
        }

        // return _setMultiObject(key, dictionary).then(() => dictionary);
    }

    static async remove(key: string) {
        return _remove(key);
    }

    static async removeDictionary(key: string) {
        return _removeMulti(key);
    }

    static async clear() {
        try {
            return await AsyncStorage.clear();
        } catch (error) {
            console.log("Storage error clear : " + error.message);
            return null;
        }
    }

    static async getKeys() {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (error) {
            console.log("Storage error getKeys : " + error.message);
            return null;
        }
    }
}
async function _get(key: string) {
    try {
        // console.log("Get : " + Storage.STORAGE_KEY + key);
        return await AsyncStorage.getItem(Storage.STORAGE_KEY + key);
    } catch (error) {
        console.log("Storage error _get : " + error.message);
        return null;
    }
}

async function _set(key: string, value) {
    try {
        if (!value) {
            return await AsyncStorage.removeItem(Storage.STORAGE_KEY + key);
        } else {
            return await AsyncStorage.setItem(Storage.STORAGE_KEY + key, value);
        }
    } catch (error) {
        console.log("Storage error _set : " + error.message);
        return null;
    }
}
/*
    Dictionary<stirng,string> a = new Dictionary<string,string>
    a.Add("k1","v1");
    a.Add("k2","v2");

    multiSet([['k1', 'val1'], ['k2', 'val2']], cb);

    _setMulti("key",{ k1 : "v1", k2 : "v2"})
    Dictionary<string,string>
*/

/**
 *
 * TODO : Dictionary<string,<string,string>>
    userAccounts = {
        fbid : {
            id : ,
            name : ,b 
        }
    }
    _setMulti2 ("userAccounts" , dictionary<string,<string,string>>)
 */
async function _setMulti(key: string, dictionary: object) {
    try {
        var values = [];
        var keys = [];
        for (let pairKey in dictionary) {
            let value = (dictionary[pairKey] === undefined) ? "" : dictionary[pairKey].toString();
            values.push([Storage.STORAGE_KEY + key + pairKey, value]);
            keys.push(pairKey);
        }
        var mainKey = await AsyncStorage.setItem(Storage.STORAGE_KEY + key, keys.toString());

        return await AsyncStorage.multiSet(values);

        //Storage error _setMulti : Cannot read property 'toString' of null
        // TODO : remove old key - value
    } catch (error) {
        console.log("Storage error _setMulti : " + error.message);
        return null;
    }
}
/*
    multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])

    _getMulti("key") => { k1 : "v1", k2 : "v2"}
*/
async function _getMulti(key: string) {
    try {
        var mainKey = await AsyncStorage.getItem(Storage.STORAGE_KEY + key);
        if (!mainKey) {
            throw new Error("Key is empty : " + key);
        }
        var keys = mainKey.split(",");
        var ks = []
        for (var k in keys) {
            ks.push(Storage.STORAGE_KEY + key + keys[k]);
        }
        var values = await AsyncStorage.multiGet(ks);
        var dictionary = {}
        for (var pair in values) {
            if (values[pair][1]) {
                dictionary[values[pair][0].replace(Storage.STORAGE_KEY + key, "")] = values[pair][1].toString();
            }
        }
        return dictionary;
    } catch (error) {

        console.log("Storage error : " + error.message);
        return null;
    }
}

async function _remove(key: string) {
    // remove one or multi
    try {
        return await AsyncStorage.removeItem(Storage.STORAGE_KEY + key);
        // check main key have child key or not
    } catch (error) {
        console.log("Storage error _remove : " + error.message);
        return null;
    }
}

//
// multiRemove(keys: Array<string>, callback?: ?(errors: ?Array<Error>) => void)
//
async function _removeMulti(key: string) {
    try {
        var mainKey = await AsyncStorage.getItem(Storage.STORAGE_KEY + key);
        if (!mainKey) {
            throw new Error("Key is empty");
        }
        var keys = mainKey.split(",");
        var ks = []
        for (var k in keys) {
            ks.push(Storage.STORAGE_KEY + key + keys[k]);
        }
        await AsyncStorage.multiRemove(ks);
        return await AsyncStorage.removeItem(Storage.STORAGE_KEY + key);
    } catch (error) {
        console.log("Storage error : " + error.message);
        return null;
    }
}
