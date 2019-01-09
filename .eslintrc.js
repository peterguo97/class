module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
    },
    "rules": {
        "linebreak-style": ["off", "windows"],
        "react/jsx-filename-extension": [1, {
            "extensions": [".js", ".jsx"]
        }],
        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": true
        }],
        "react/destructuring-assignment": false,
        "indent": [0, 4],
        "react/prefer-stateless-function": false,
        "react/jsx-indent": false,
        "react/no-array-index-key": false,
        "react/jsx-one-expression-per-line": false,
    },
};