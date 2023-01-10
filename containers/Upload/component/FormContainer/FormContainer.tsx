'use client'
import React from 'react'
import CompoundFormContainer from './CompoundFormContainer'

const FormContainer = () => {
  return (
    <CompoundFormContainer>
      <CompoundFormContainer.EditorEntrance />
      <CompoundFormContainer.Caption />
      <CompoundFormContainer.SettingVideo />
      <CompoundFormContainer.AllowUser />
      <CompoundFormContainer.Copyright />
      <CompoundFormContainer.ActionButtons />
    </CompoundFormContainer>
  )
}

export default FormContainer
