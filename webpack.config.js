const path = require('path');


module.exports = {
    mode: 'development',
    entry: './src/main.ts' /*{
        about: './src/scripts/about.ts'
    }*/,
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            { 
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node-modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attributes: false
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
    }
}
