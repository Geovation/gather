System.config({
    map: {
        'systemjs-babel-build': 'https://unpkg.com/systemjs-plugin-babel@0.0.x/systemjs-babel-browser.js',
        'systemjs-plugin-babel': 'https://unpkg.com/systemjs-plugin-babel@0.0.x/plugin-babel.js',
        'page': 'https://unpkg.com/page@1.7.x/page.js',
        'react': 'https://unpkg.com/react@16.1.x/umd/react.production.min.js',
        'react-dom': 'https://unpkg.com/react-dom@16.1.x/umd/react-dom.production.min.js',
        'react-dom-factories': 'https://unpkg.com/react-dom-factories@1.0.x'
    },
    transpiler: 'systemjs-plugin-babel'
})

System.import('/components/routes.js').catch(console.error)


// Firebase

let config = {
    apiKey: "AIzaSyBSJzvEjE66uQpjKw7hRDJWxHoyJ_lID_M",
    authDomain: "gather-f7fb3.firebaseapp.com",
    projectId: "gather-f7fb3",
    storageBucket: "gather-f7fb3.appspot.com",
};
firebase.initializeApp(config);

document.addEventListener('DOMContentLoaded', function() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
        let app = firebase.app();
        let features = ['auth', 'storage'].filter(feature => typeof app[feature] === 'function');
        console.log(`Firebase SDK loaded with ${features.join(', ')}`);
    } catch (e) {
        console.error(e);
        console.log('Error loading the Firebase SDK, check the console.');
    }
});
