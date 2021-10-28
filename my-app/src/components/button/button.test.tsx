import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './button';

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: ButtonType.Default,
  size: ButtonSize.Large,
  className: 'btnLink'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>nice</Button>)
    const element = wrapper.getByText('nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();
    // fireEvent 测试事件
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled(); // 点击事件被调用到
  })
  it('should render the correct component base on different props', () => {
    const wrapper = render(<Button {...testProps}>nice</Button>)
    const element = wrapper.getByText('nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-default btn-lg btnLink');
  })
  it('should render a link when btnType equals link  and href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">Link</Button>)
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Link</Button>)
    const element = wrapper.getByText('Link') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})