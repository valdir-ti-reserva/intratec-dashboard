import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { Home } from './pages/Home'
import { List } from './pages/List'
import { Login } from './pages/Login'
import { New } from './pages/New'
import { Single } from './pages/Single'

import { userInputs, productInputs } from './formSource'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />}/>
            <Route path="users">
              <Route index element={<List />}/>
              <Route path=':userId' element={<Single />}/>
              <Route path='new' element={<New title="Add new User" inputs={userInputs} />}/>
            </Route>
            <Route path="products">
              <Route index element={<List />}/>
              <Route path=':productId' element={<Single />}/>
              <Route path='new' element={<New title="Add new Product" inputs={productInputs} />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
