import React, { Component } from 'react'
import FormInput from '../parts/input/input';
import { connect } from 'react-redux';
import { setCurrentPermissions, setCurrentRoles, setCurrentUser, setCurrentUserData } from '../../redux/user/user.action';
import Loader1 from '../template/loaders/Loader1';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            loader: false
        }
    }
    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const setCurrentUser = this.props.setCurrentUser;
        const setCurrentUserData = this.props.setCurrentUserData;
        this.setState({ loader: true });
        self = this;
        axios.post('api/login', this.state).then(async function (res) {
            self.props.setCurrentRoles(await res.data.user.roles);
            self.props.setCurrentUserData(await res.data.user);
            self.props.setCurrentPermissions(await res.data.user.permissions);
            self.props.setCurrentUser(await res.data.token);

        }).catch(async (error) => {
            await self.setState({ loader: false });
        });
    }
    render() {
        const { loader } = this.state;
        return (
            loader ? <Loader1 /> :
                <div className="container sign-up p-4" style={{ display: 'block', alignItems: 'center', justifyContent: 'center', maxWidth: '40%', border: '1px solid grey', borderRadius: '1px', marginTop: '7rem', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                    <h1 className='text-center' style={{ color: '#2E4053' }}>LOGIN</h1><hr />
                    <form onSubmit={this.handleSubmit}>
                        <FormInput handleChange={this.handleChange} name='username' type='text' label="Enter Username" required />
                        <FormInput handleChange={this.handleChange} name='password' type='password' label="Enter Password" required />
                        <div className='text-right mt-2'>
                            <button className="btn btn" style={{ width: '100%', background: '#33A687' }} type="submit">LOGIN</button>
                        </div>
                    </form>
                </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setCurrentUserData: (user) => dispatch(setCurrentUserData(user)),
    setCurrentRoles: (role) => dispatch(setCurrentRoles(role)),
    setCurrentPermissions: (permission) => dispatch(setCurrentPermissions(permission))
});

export default connect(null, mapDispatchToProps)(Login);
