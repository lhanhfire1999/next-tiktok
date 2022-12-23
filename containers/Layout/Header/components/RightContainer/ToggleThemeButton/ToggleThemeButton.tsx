import React from 'react'
import { ToggleButton } from '~/components'
import { useTheme } from '~/contexts/ThemeContext'

const ToggleThemeButton = () => {
  const { isDarkTheme, handleChangeTheme } = useTheme()

  return <ToggleButton onChange={handleChangeTheme} isChecked={isDarkTheme} />
}

export default ToggleThemeButton
