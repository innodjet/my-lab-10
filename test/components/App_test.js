import React from 'react'
import { shallow } from 'enzyme'

import App from 'components/App'

// Enzyme render test docs: https://airbnb.io/enzyme/docs/api
describe('<App />', () => {
  it('renders the component', () => {
    const app = shallow(<App />)

    expect(app.exists()).to.equal(true)
  })

  it('renders hello world text', () => {
    const app = shallow(<App />)

    expect(app.find('h1')).to.have.lengthOf(1)
    expect(app.text()).to.equal("Hello from App.jsx")
  })
})
