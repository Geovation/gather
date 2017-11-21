System.config({
    map: {
        'systemjs-babel-build': 'https://unpkg.com/systemjs-plugin-babel@0.0.x/systemjs-babel-browser.js',
        'systemjs-plugin-babel': 'https://unpkg.com/systemjs-plugin-babel@0.0.x/plugin-babel.js',
        'page': 'https://unpkg.com/page@1.7.x/page.js',
        'react': 'https://unpkg.com/react@16.1.x/umd/react.development.js',
        'react-dom': 'https://unpkg.com/react-dom@16.1.x/umd/react-dom.development.js',
        'react-dom-factories': 'https://unpkg.com/react-dom-factories@1.0.x',
        'mapbox-gl': 'https://unpkg.com/mapbox-gl@0.42.x',
        'firebase': 'https://unpkg.com/firebase@4.6.x/firebase.js'
    },
    transpiler: 'systemjs-plugin-babel'
})

System.import('/common/init.js').catch(console.error)
