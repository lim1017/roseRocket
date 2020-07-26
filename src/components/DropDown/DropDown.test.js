import React from 'react'
import { render, cleanup, fireEvent, getByText } from '@testing-library/react'
import DropDown from './DropDown'

afterEach(cleanup)

test("Drop down component", ()=>{
  const arr=["Tom","Bob","Joe"]
  const {debug, getByTestId, getByText} = render(<DropDown options={arr} active={arr[0]} testID="driverDropdown" />);
  
  debug()


  const dropDown=getByTestId('driverDropdown')

  expect(dropDown).toBeTruthy();
})