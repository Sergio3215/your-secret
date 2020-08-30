class LoginBar extends React.Component {
    constructor() {
        super();
        this.handleClose = this.handleClose.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickButtonUser = this.handleClickButtonUser.bind(this);

        this.state = {
            txtModal: "Login",
            modalDisplay: "none",
            userName: "",
            displayMenu: "none",
            click: false
        };
    }
    handleClose() {
        document.querySelector("body").style.overflowY = "scroll";
        this.setState({
            modalDisplay: "none"
        })
    }
    handleClickButton(e) {
        document.querySelector("body").style.overflowY = "hidden";
        this.setState({
            txtModal: e.target.innerHTML,
            modalDisplay: "block"
        });
    }

    handleClickButtonUser(e) {
        if (!this.state.click) {
            this.setState({
                displayMenu: "block",
                click: true
            });
        }
        else {
            this.setState({
                displayMenu: "none",
                click: false
            });
        }
    }

    queryUser(id) {
        fetch('/users/' + id)
            .then(res => res.json())
            .then(data => {
                this.setState({ userName: data.user })
            })
            .catch(err => console.log(err))
    }
    render() {
        var login = null;
        var SigIn = null;
        var logout = null;
        var menuLogin;
        var subscription;

        if (document.cookie === "") {
            login =
                <li onClick={this.handleClickButton}>Login</li>;
            SigIn =
                <li onClick={this.handleClickButton}>SigIn</li>;
        }
        else {
            var id = document.cookie;
            id = id.split('=');
            this.queryUser(id[1]);

            login = <label style={{ "margin-right": "70px" }} onClick={this.handleClickButtonUser}>
                {this.state.userName}</label>;
            logout = <li><a href="/logout">Logout</a></li>;
            if (this.props.subs === "Administrator") {
                subscription = <li>Subscripcion</li>
            }
            menuLogin =
                <ul>
                    <li>Perfil</li>
                    {subscription}
                    <li>Configuracion</li>
                    {logout}
                </ul>;
        }
        return (
            <div>
                <nav class="login-btn">
                    <ul>
                        {login}
                        {SigIn}
                    </ul>
                    <nav class="nav-optionLogin" style={{ display: this.state.displayMenu }}>
                        {menuLogin}
                    </nav>
                </nav>
                <div class="Modal-Container" style={{ "display": this.state.modalDisplay }}>
                    <Modal txtModal={this.state.txtModal}
                        handleClose={this.handleClose} />
                </div>
            </div>
        );
    }
}
class RegiLogin extends React.Component {
    constructor() {
        super();
        this.handleClose = this.handleClose.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickButtonUser = this.handleClickButtonUser.bind(this);

        this.state = {
            txtModal: "Login",
            modalDisplay: "none",
            userName: "",
            displayMenu: "none",
            click: false
        };
    }
    handleClose() {
        document.querySelector("body").style.overflowY = "scroll";
        this.setState({
            modalDisplay: "none"
        })
    }
    handleClickButton(e) {
        document.querySelector("body").style.overflowY = "hidden";
        this.setState({
            txtModal: e.target.value,
            modalDisplay: "block"
        });
    }

    handleClickButtonUser(e) {
        if (!this.state.click) {
            this.setState({
                displayMenu: "block",
                click: true
            });
        }
        else {
            this.setState({
                displayMenu: "none",
                click: false
            });
        }
    }
    render() {
        var login = null;
        var SigIn = null;
        var logout = null;
        var menuLogin;
        var subscription;

        if (document.cookie === "") {
            login =
                <input type="button" value="Login"
                    onClick={this.handleClickButton} />;
            SigIn =
                <input type="button" value="SigIn"
                    onClick={this.handleClickButton} />;
        }
        else {
            login = <label id="username" style={{ "margin-right": "70px" }} onClick={this.handleClickButtonUser}>
                {this.state.userName}</label>;
            logout = <li><a href="/logout">Logout</a></li>;
            menuLogin =
                <ul>
                    <li>Perfil</li>
                    {subscription}
                    <li>Configuracion</li>
                    {logout}
                </ul>;
        }
        return (
            <div>
                <div class="RegistLogin">
                    {login}
                    {SigIn}
                    <nav class="nav-optionLogin" style={{ display: this.state.displayMenu }}>
                        {menuLogin}
                    </nav>
                </div>
                <div class="Modal-Container" style={{ "display": this.state.modalDisplay }}>
                    <Modal txtModal={this.state.txtModal}
                        handleClose={this.handleClose} />
                </div>
            </div>
        );
    }
}
class Login extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <label>Usuario</label><br />
                    <input type="text"
                        onChange={this.props.handleChangeUser}
                    />
                </div>
                <div>
                    <label>Contraseña</label><br />
                    <input type="password"
                        onChange={this.props.handleChangePassword}
                    />
                </div>
                <div style={{ "color": "red" }}>{this.props.errorMsg}</div>
            </div>
        );
    }
}
class SigIn extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <label>Nombre</label><br />
                    <input type="text"
                        onChange={this.props.handleChangeName}
                    />
                </div>
                <div>
                    <label>Usuario</label><br />
                    <input type="text"
                        onChange={this.props.handleChangeUser}
                    />
                </div>
                <div>
                    <label>Contraseña</label><br />
                    <input type="password"
                        onChange={this.props.handleChangePassword}
                    />
                </div>
                <div>
                    <label>Repetir Contraseña</label><br />
                    <input type="password"
                        onChange={this.props.handleChangeConfirmPassword}
                    />
                </div>
                <div>
                    <label>Email</label><br />
                    <input type="text"
                        onChange={this.props.handleChangeEmail}
                    />
                </div>
                <div style={{ "color": "red" }}>{this.props.errorMsg}</div>
            </div>
        );
    }
}

class Modal extends React.Component {
    constructor() {
        super();

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            user: "",
            password: "",
            confirmPassword: "",
            email: "",
            name: "",
            errorMsg: ""
        };
    }
    handleClickButton(e) {
        this.setState({
            txtModal: e.target.value,
            modalDisplay: "block"
        })
    }

    handleChangeUser(e) {
        this.setState({ user: e.target.value });
    }
    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }
    handleChangeConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    }
    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleChangeName(e) {
        this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.txtModal === "Login") {
            fetch('/users?user=' + this.state.user + '&&password=' + this.state.password)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.location.href = "/";
                })
                .catch(err => {
                    //console.log(err)
                })
        }
        else {
            var us = this.state.user;
            var pass = this.state.password;
            var emai = this.state.email;
            var nam = this.state.name;
            var users;
            users = {
                user: us,
                password: pass,
                name: nam,
                email: emai
            };
            fetch('/users', {
                method: "POST",
                body: JSON.stringify(users),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.length > 0) {
                        window.location.href = "/";
                    }
                })
                .catch(err => {
                    //console.log(err)
                })
        }
    }

    render() {
        return (
            <form class="Modal-Interface" onSubmit={this.handleSubmit}>
                <ModalHeader txtModal={this.props.txtModal}
                    handleClose={this.props.handleClose} />
                <ModalBody
                    txtModal={this.props.txtModal}
                    handleChangeUser={this.handleChangeUser}
                    handleChangePassword={this.handleChangePassword}
                    handleChangeConfirmPassword={this.handleChangeConfirmPassword}
                    handleChangeEmail={this.handleChangeEmail}
                    handleChangeName={this.handleChangeName}
                    errorMsg={this.state.errorMsg}
                />
                <ModalFooter
                    handleClose={this.props.handleClose} />
            </form>
        );
    }
}
class ModalHeader extends React.Component {
    render() {
        return (
            <div class="Modal-Header">
                {this.props.txtModal}
                <input class="Modal-Close"
                    type="button"
                    value="X"
                    onClick={this.props.handleClose} />
            </div>);
    }
}
class ModalBody extends React.Component {
    render() {
        var bodyModal;
        if (this.props.txtModal === "Login") {
            bodyModal = <Login
                handleChangeUser={this.props.handleChangeUser}
                handleChangePassword={this.props.handleChangePassword}
                errorMsg={this.props.errorMsg}
            />;
        }
        else if (this.props.txtModal === "SigIn") {
            bodyModal = <SigIn
                handleChangeUser={this.props.handleChangeUser}
                handleChangePassword={this.props.handleChangePassword}
                handleChangeConfirmPassword={this.props.handleChangeConfirmPassword}
                handleChangeEmail={this.props.handleChangeEmail}
                handleChangeName={this.props.handleChangeName}
                errorMsg={this.props.errorMsg}
            />;
        }
        return <div class="Modal-Body">{bodyModal}</div>;
    }
}
class ModalFooter extends React.Component {
    render() {
        return (
            <div class="Modal-Footer">
                <input type="submit" class="acept" value="Enviar" />
                <input type="button" class="cancel" value="cancel"
                    onClick={this.props.handleClose} />
            </div>
        );
    }
}