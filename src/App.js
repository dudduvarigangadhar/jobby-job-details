import {Switch, Redirect, Route} from 'react-router-dom'
import Home from './Components/Home'
import JobItemDetails from './Components/JobItemDetails'
import Jobs from './Components/Jobs'
import Login from './Components/Login'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="random-path" component={NotFound} />
    <Redirect to="/NotFound" />
  </Switch>
)

export default App
