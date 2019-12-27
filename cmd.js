#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const cp = require('child_process')

const [, scriptPath, ...args] = process.argv

const newProjectDirName = args[0]
const sourceProjectDir = path.dirname(scriptPath)
const currentDir = process.cwd()
const newProjectDir = path.join(currentDir, newProjectDirName)

fs.mkdirSync(newProjectDir)

const srcSource = path.join(sourceProjectDir, 'src')
const webpackConfigSource = path.join(sourceProjectDir, 'webpack.config.js')
const tsConfigSource = path.join(sourceProjectDir, 'tsconfig.json')

cp.execSync(`cp -r ${srcSource} ${newProjectDir}`)
cp.execSync(`cp ${webpackConfigSource} ${newProjectDir}`)
cp.execSync(`cp ${tsConfigSource} ${newProjectDir}`)

const child = cp.spawn(path.join(sourceProjectDir, 'cmd'), [newProjectDir])
child.stdout.setEncoding('utf8')
child.stdout.on('data', (chunk) => {
  console.log(chunk)
})

