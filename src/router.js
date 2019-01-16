import React from 'react';
import {
  HashRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import Home from './routes/Home';
import IndexPage from './routes/Layout';
import SearchClass from './routes/SearchClass';
import WrappedTimeRelatedForm from './routes/Form'
import ApplyTable from './routes/Apply';
import ManagePage from './routes/Manage';

class Page1 extends React.Component {
    render() {
        return(
            <IndexPage>
                <Switch>
                    <Route path="/app/home" exact component={Home} />
                    <Route path="/app/search" component={SearchClass} />
                    <Route path="/app/form" component={WrappedTimeRelatedForm} />
                    <Route path="/app/apply" component={ApplyTable} />
                </Switch>
            </IndexPage>
        )
    }
}

function App() {
    return(
        <Router>
            <Switch>
                <Route path="/app" component={Page1} />
                <Route path="/managepage" component={ManagePage} />
                <Redirect path="/" to={{ pathname: '/app/home'}} />
            </Switch>
        </Router>
    )
}

export default App;