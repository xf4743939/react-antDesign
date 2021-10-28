import React from 'react';
import useToggle from './hooks/useToggle'
import Button from './components/button/button'

function App() {
  const [isToggle, setToggle] = useToggle();

  return (
    <div>
      <Button autoFocus className='btn' size="lg" btnType='danger'><span>danger</span></Button>
      <Button className='btn'>bgn</Button>
      <Button className='btn' size="lg" btnType='link'>link</Button>
      <Button className='btn' size="small" disabled btnType='link'>disabled</Button>
      <h1>dfdfdf</h1>
      <button className='primary' onClick={setToggle}>{isToggle ? 'Login' : 'Login out'}</button>
    </div>

  )
}

export default App;
