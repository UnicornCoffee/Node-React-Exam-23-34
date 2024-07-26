import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CategoryProducts from './CategoryProducts';
import OrderStatus from './OrderStatus';
import CustomerDetails from './CustomerDetails';
import OrderDetails from './OrderDetails';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/categories">View Products by Category</Link>
                        </li>
                        <li>
                            <Link to="/orders">View Orders by Status</Link>
                        </li>
                        <li>
                            <Link to="/customers">View Customer Details</Link>
                        </li>
                        <li>
                            <Link to="/order-details">View Order Details</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/categories" component={CategoryProducts} />
                    <Route path="/orders" component={OrderStatus} />
                    <Route path="/customers" component={CustomerDetails} />
                    <Route path="/order-details" component={OrderDetails} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
