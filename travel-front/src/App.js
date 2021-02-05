import React from 'react'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Search from './pages/Search'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './misc/PrivateRoute'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'
import SingleTour from './pages/SingleMissio'

/**
 * App.js provides router to the application using react-router-dom.
 * Adming page requires authentication.
 */

function App({ store }) {

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Router>
        <Switch>
          <Route exact path="/" store={store} component={Home} />
          <Route exact path="/search" store={store} component={Search} />
          <Route exact path="/tours/:id" store={store} component={SingleTour} />
          <PrivateRoute path="/login" store={store} component={Admin} />
          <PrivateRoute path="/admin" store={store}  component={Admin} />
          <Route component={Home} />
        </Switch>
      </Router>
    </ReactKeycloakProvider>
  )
}

export default App;
