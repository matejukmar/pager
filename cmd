#!/bin/sh

cd $1
npm init -y

npm install clean-webpack-plugin html-webpack-plugin ts-loader tslint typescript webpack webpack-cli webpack-dev-server css-loader file-loader mini-css-extract-plugin --save-dev

npm install @types/react @types/react-dom react react-dom

npx npm-add-script -k build -v "webpack --mode production"
npx npm-add-script -k start -v "webpack-dev-server --mode development --hot --open --port 3100"
