import { Toolbar } from './react-aria/Toolbar'
import { ToggleButton } from './react-aria/ToggleButton'
import { Bold, Italic, Underline } from 'lucide-react'
import { Button } from './react-aria/Button'
import { Separator } from './react-aria/Separator'
import { Checkbox } from './react-aria/Checkbox'
import './App.css'
import { OutputSelector } from './components/OutputSelector'
import { InputSelector } from './components/InputSelector'

function App() {

  return (
    <>
    <InputSelector/>
      <OutputSelector/>
    </>
  )
}

export default App
