import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"

// Route-based code splitting

// Route-based code splitting
const analyticsDashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
)


const userList = lazy(() => import("./views/apps/user/list/List"))
const campaignList = lazy(() => import("./views/apps/campaign/list/List"))
const campaignView = lazy(() => import("./views/apps/campaign/view/View"))

const transactionList = lazy(() => import("./views/apps/transaction/list/List"))


const accountSettings = lazy(() =>
  import("./views/pages/account-settings/AccountSettings")
)
const login = lazy(() =>
  import("./views/pages/authentication/login/Login")
)

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
    <Route
      {...rest}
      render={props => {
        return (
          <ContextLayout.Consumer>
            {context => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                    ? context.horizontalLayout
                    : context.VerticalLayout
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
            }}
          </ContextLayout.Consumer>
        )
      }}
    />
  )
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>

          <AppRoute exact path="/" component={analyticsDashboard} />
       
          


          <AppRoute path="/app/user/list" component={userList} />
          <AppRoute path="/app/campaign/list" component={campaignList} />
          <AppRoute path="/app/campaign/view/:idCampaign" component={campaignView} />


          <AppRoute path="/app/transaction/list" component={transactionList} />
          
          <AppRoute
            path="/pages/account-settings"
            component={accountSettings}
          />
        
          <AppRoute
            path="/pages/login"
            component={login}
            fullLayout
          />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
