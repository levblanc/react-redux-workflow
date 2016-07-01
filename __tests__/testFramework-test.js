// ====================================
// Karma 框架及插件的可用性测试
// ====================================
import assert from 'assert'
import React from 'react'
import { mount, render, shallow } from 'enzyme'

const TestDummyComponent = () => {
  /* eslint arrow-body-style: "off" */
  return (
    <div>
      <div className="item selected">我是div1</div>
      <div className="item">我是div2</div>
      <div className="item">我是div3</div>
    </div>
  )
}

describe('Karma 框架插件', () => {
  it('expect 暴露为全局关键字', () => {
    assert.ok(expect)
  })

  it('should 暴露为全局关键字', () => {
    assert.ok(should)
  })

  it('chai-as-promised 可以使用', () => {
    const pass = new Promise(resolve => resolve('chai-as-promised passed!'))
    const fail = new Promise((resolve, reject) => reject())

    return Promise.all([
      expect(pass).to.be.fulfilled,
      expect(fail).to.not.be.fulfilled
    ])
  })

  it('chai-enzyme 可以使用', () => {
    let wrapper = shallow(<TestDummyComponent />)
    expect(wrapper.childAt(2).text()).to.contain('我是div3')

    wrapper = mount(<TestDummyComponent />)
    expect(wrapper.find('.item')).to.have.length(3)

    wrapper = render(<TestDummyComponent />)
    expect(wrapper.find('.selected').text()).to.equal('我是div1')
  })
})
