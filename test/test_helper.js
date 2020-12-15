require('@babel/polyfill')
require('raf/polyfill')
require('jsdom-global')()

const chai = require('chai')
const Enzyme = require('enzyme')
const modulePath = require('app-module-path')
const ReactAdapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new ReactAdapter() })

modulePath.addPath(__dirname + '/../app')

global.expect = chai.expect
