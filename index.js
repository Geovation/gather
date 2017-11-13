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
