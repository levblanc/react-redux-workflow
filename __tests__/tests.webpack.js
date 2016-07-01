// ====================================
// 测试环境配置
// ====================================
import sinon          from 'sinon'
import chai           from 'chai'
import sinonChai      from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import chaiEnzyme     from 'chai-enzyme'

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

global.chai   = chai
global.sinon  = sinon
global.expect = chai.expect
global.should = chai.should()

// ====================================
// 筛选测试文件
// ====================================
const testsFilter   = new Array() /* eslint no-array-constructor: "off" */
const testsContext  = require.context('./', true, /-test\.js$/)
const fullTestsList = testsContext.keys()

const filteredTests = fullTestsList.filter((path) => {
  /* eslint arrow-body-style: "off" */
  return ~testsFilter.indexOf(path)
})

const testsToRun = filteredTests.length ? filteredTests : fullTestsList

testsToRun.forEach(testsContext)
