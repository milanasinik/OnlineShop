module.exports = {
    "globals": { 
        "angular": false, 
        "module": false, 
        "inject": false, 
        "document": false }, 
    "env": {
        "browser": true,
        "amd": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types" :0
    }
};
