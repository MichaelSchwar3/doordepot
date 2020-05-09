import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fname: "",
            lname: ""
        };
        this.props.errors.session = [];
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        return this.props.processForm(user);
    }

    update(field) {
        return e => (
            this.setState({
                [field]: e.currentTarget.value
            })
        );
    }
    renderErrors() {
        if (this.props.errors.session) {
            return (
                <ul>
                    {this.props.errors.session.map((error, idx) => {
                        return <li key={`error-${idx}`}>
                            {error}
                        </li>;
                    })}
                </ul>
            );
        }
    }

    renderName() {
        if (this.props.signUpForm) {
            return (
                <>
                    <label>First Name<br />
                        <input type="text"
                            value={this.state.fname}
                            onChange={this.update('fname')}
                            className="login-input"
                            placeholder="First Name"
                        />
                    </label>
                    <br />
                    <label>Last Name<br />
                        <input type="text"
                            value={this.state.lname}
                            onChange={this.update('lname')}
                            className="login-input"
                            placeholder="Last Name"
                        />
                    </label>
                    <br />
                </>
            )
        }
    }
    render() {
        return (
            <div className="login-form-container">
                <span id="login">Log In</span>
                <section className="login-form-subcontainer">
                    <form onSubmit={this.handleSubmit} className="login-form-box">
                        <div className="login-form">
                            <br />
                            <label>E-mail Address<br />
                                <input type="email"
                                    value={this.state.email}
                                    onChange={this.update('email')}
                                    className="login-input"
                                    placeholder="name@company.com"
                                />
                            </label>
                            <br />
                            <label>Password<br />
                                <input type="password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="login-input"
                                    placeholder="Password"
                                />
                            </label>
                            <br />
                            {this.renderName()}
                            <input className="session-submit" type="submit" value={this.props.formType} />
                        </div>
                    </form>
                </section>
                <section className="login-form-bottom-section">
                    <div id="other-form">
                        <span id="login-form-bottom-text">Don't have an account?</span>
                        <span id="login-form-bottom-signup">&nbsp;{this.props.otherForm}</span>
                    </div>
                    <span id="login-form-errors">{this.renderErrors()}</span>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    formType: "Log In",
});

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);