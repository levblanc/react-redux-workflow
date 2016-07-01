const basicActionTest = (action, params, typesArr) => {
  describe('基本Action测试', () => {
    it('Action应为function', () => {
      expect(action).to.be.a('function')
    })

    it("返回的object应该包含'types', 'reqApiKey', 'mockupApi', 'reqParams'", () => {
      expect(action(params))
        .to.have.all.keys('types', 'reqApiKey', 'mockupApi', 'reqParams')
    })

    it('返回的object中types应有三种情况', () => {
      expect(action(params).types)
        .to.have.length(3)

      expect(action(params).types)
        .to.have.members(typesArr)
    })
  })
}

export default basicActionTest
