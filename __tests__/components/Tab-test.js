import React from 'react'
import { shallow, mount } from 'enzyme'
import Tab from '../../src/components/tab/tabView'

describe('Tab Component', () => {
  const tabType        = '0'
  const tabCallback    = sinon.spy()
  const shallowWrapper = shallow(<Tab tabType={ tabType } tabCallback={ tabCallback } />)
  const fullWrapper    = mount(<Tab tabType={ tabType } tabCallback={ tabCallback } />)

  it('应该有两个子tab', () => {
    // 写死的情况才能这样测试，如果是从props传入的应该测试与传入值一致
    expect(shallowWrapper.children().length).to.equal(2)
    expect(shallowWrapper.childAt(0).text()).to.equal('现金')
    expect(shallowWrapper.childAt(1).text()).to.equal('枫车快手')
  })

  it('子tab可以点击，点击后触发tabCallback', () => {
    shallowWrapper.childAt(0).simulate('click')
    expect(tabCallback.calledOnce).to.equal(true)
  })

  it('可以set props', () => {
    expect(fullWrapper.props().tabType).to.equal('0')
    fullWrapper.setProps({ tabType: '1' })
    expect(fullWrapper.props().tabType).to.equal('1')
  })
})
