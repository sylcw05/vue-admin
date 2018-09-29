'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/sjgzxt"',
  CEMSYS_API:'"http://139.199.202.195/cemsys"',
  TOURL: '"http://192.168.1.246:8081"'
})
