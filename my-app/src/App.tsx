import React from 'react';
import useToggle from './hooks/useToggle'
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

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
      <div style={{ marginTop: 30 }}>
        <Menu defaultIndex={0} mode="vertical" onSelect={(index) => { alert(index) }}>
          <MenuItem index={0}>cool link</MenuItem>
          <MenuItem index={1}>cool link2</MenuItem>
          <MenuItem index={2}>cool link3</MenuItem>
        </Menu>
      </div>
    </div>

  )
}

export default App;
