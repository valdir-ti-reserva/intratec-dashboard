import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { Home } from './Home'
import { List } from './List'
import { Login } from './Login'
import { New } from './New'
import { Single } from './Single'

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
              <Route path='new' element={<New />}/>
            </Route>
            <Route path="products">
              <Route index element={<List />}/>
              <Route path=':productId' element={<Single />}/>
              <Route path='new' element={<New />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
