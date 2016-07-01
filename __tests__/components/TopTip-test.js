import React from 'react'
import { mount } from 'enzyme'
import TopTip from '../../src/components/topTip/tip'

describe('TopTip Component', () => {
  const tips = 'default tips'
  const fullWrapper = mount(<TopTip tips={ tips } />)

  it('正确展示tips', () => {
    expect(fullWrapper.text()).to.equal(tips)
  })

  it('可以set props', () => {
    expect(fullWrapper.props().tips).to.equal(tips)
    fullWrapper.setProps({ tips: 'new tips' })
    expect(fullWrapper.props().tips).to.equal('new tips')
  })
})
