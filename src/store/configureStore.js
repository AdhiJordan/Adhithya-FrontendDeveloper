import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import reducers from './reducers';
import storageSession from 'redux-persist/lib/storage/session';
import CryptoJS from 'crypto-js';

const encryptor = createTransform(
    (inboundState, key) => {
        if (!inboundState) return inboundState;
        const cryptedText = CryptoJS.AES.encrypt(
            JSON.stringify(inboundState),
            'secret key 123'
        );
        return cryptedText.toString();
    },
    (outboundState, key) => {
        if (!outboundState) return outboundState;
        const bytes = CryptoJS.AES.decrypt(outboundState, 'secret key 123');
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        return JSON.parse(decrypted);
    }
);

const persistConfig = {
    key: 'root',
    storage: storageSession,
    transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export function configureStore() {
    const enhancer = compose(
        applyMiddleware(thunk, logger),
        composeWithDevTools(applyMiddleware(thunk, logger))
    );

    const store = createStore(persistedReducer, enhancer);

    const persistor = persistStore(store);
    return { store, persistor };
}

export default configureStore;
