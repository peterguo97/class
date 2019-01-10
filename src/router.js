import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Home from './routes/Home';
import IndexPage from './routes/Layout';
import SearchClass from './routes/SearchClass';
import WrappedTimeRelatedForm from './routes/Form'
import ApplyTable from './routes/Apply';

function App() {
    return(
        <Router>
            <IndexPage>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/search" component={SearchClass} />
                    <Route path="/form" component={WrappedTimeRelatedForm} />
                    <Route path="/apply" component={ApplyTable} />
                </Switch>
            </IndexPage>
        </Router>
    )
}

export default App;