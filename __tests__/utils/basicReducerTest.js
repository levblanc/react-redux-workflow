const basicReducerTest = (reducer, initialState) => {
  describe('基本Reducer测试', () => {
    it('Reducer应为function', () => {
      expect(reducer).to.be.a('function')
    })

    it('默认的初始化State与期望值一致', () => {
      Object.keys(initialState).forEach(key => {
        expect(reducer(undefined, {}))
          .to.have.property(key)
          .that.deep.equals(initialState[key])
      })
    })
  })
}

export default basicReducerTest
