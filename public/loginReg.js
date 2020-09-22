class LoginBar extends React.Component {
    constructor() {
        super();
        this.handleClose = this.handleClose.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickButtonUser = this.handleClickButtonUser.bind(this);

        this.state = {
            txtModal: "Iniciar sesion",
            modalDisplay: "none",
            userName: "",
            displayMenu: "none",
            click: false
        };
    }
    componentDidMount() {
        this.queryUser();
    }
    queryUser() {
        if (document.cookie !== "") {
            fetch('/users/')
                .then(res => res.json())
                .then(data => {
                    this.setState({ userName: data.user })
                })
                .catch(err => console.log(err))
        }
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
    render() {
        var login = null;
        var SignUp = null;
        var logout = null;
        var menuLogin;
        var modal;

        if (document.cookie === "") {
            login =
                <li onClick={this.handleClickButton}>Iniciar sesion</li>;
            SignUp =
                <li onClick={this.handleClickButton}>Registrate</li>;
            modal =
                <Modal txtModal={this.state.txtModal}
                    handleClose={this.handleClose} />;
        }
        else {
            var user = this.state.userName;
            login = <label id="username" style={{ "margin-right": "70px" }} onClick={this.handleClickButtonUser}>
                {user}</label>;
            logout = <li><a href="/logout">Desconectar</a></li>;
            menuLogin =
                <ul>
                    <li><a href={"/profile/" + user}>Perfil</a></li>
                    <li><a href={"/config"}>Configuracion</a></li>
                    {logout}
                </ul>;
        }
        return (
            <div>
                <nav class="login-btn">
                    <ul>
                        {login}
                        {SignUp}
                    </ul>
                    <nav class="nav-optionLogin" style={{ display: this.state.displayMenu }}>
                        {menuLogin}
                    </nav>
                </nav>
                <div class="Modal-Container" style={{ "display": this.state.modalDisplay }}>
                    {modal}
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
            </div>
        );
    }
}
class SignUp extends React.Component {
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
        this.resetState = this.resetState.bind(this);

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
    resetState() {
        this.setState({
            errorMsg: ""
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.txtModal === "Iniciar sesion") {
            fetch('/users?user=' + this.state.user + '&&password=' + this.state.password)
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    if (data.msg === undefined) {
                        window.location.href = "/";
                    }
                    else {
                        console.log(data.msg);
                        this.setState({ errorMsg: data.msg }, () => this.forceUpdate())
                    }
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
            var confirmPass = this.state.confirmPassword;
            var users;
            users = {
                user: us,
                password: pass,
                confirmPassword: confirmPass,
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
                    //console.log(data);
                    if (data.msg === undefined) {
                        window.location.href = "/";
                    }
                    else {
                        console.log(data.msg);
                        this.setState({ errorMsg: data.msg }, () => this.forceUpdate())
                    }
                })
                .catch(err => {
                    //console.log(err)
                })
        }
    }

    render() {
        var classInterface = "";
        if (this.props.txtModal === "Iniciar sesion") {
            classInterface = "Modal-Interface";
        }
        else if (this.props.txtModal === "Registrate") {
            classInterface = "Modal-Interface2";
        }
        return (
            <form class={classInterface} onSubmit={this.handleSubmit}>
                <ModalHeader txtModal={this.props.txtModal}
                    handleClose={this.props.handleClose} 
                    resetState={this.resetState}/>
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
                    handleClose={this.props.handleClose}
                    resetState={this.resetState} />
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
                    onClick={()=>{this.props.handleClose();this.props.resetState();}} />
            </div>);
    }
}
class ModalBody extends React.Component {
    render() {
        var bodyModal;
        if (this.props.txtModal === "Iniciar sesion") {
            bodyModal = <Login
                handleChangeUser={this.props.handleChangeUser}
                handleChangePassword={this.props.handleChangePassword}
                errorMsg={this.props.errorMsg}
            />;
        }
        else if (this.props.txtModal === "Registrate") {
            bodyModal = <SignUp
                handleChangeUser={this.props.handleChangeUser}
                handleChangePassword={this.props.handleChangePassword}
                handleChangeConfirmPassword={this.props.handleChangeConfirmPassword}
                handleChangeEmail={this.props.handleChangeEmail}
                handleChangeName={this.props.handleChangeName}
                errorMsg={this.props.errorMsg}
            />;
        }
        return <div class="Modal-Body">
            {bodyModal}
            <div style={{ "color": "red", "font-size": "12px" }}>{this.props.errorMsg}</div>
        </div>;
    }
}
class ModalFooter extends React.Component {
    render() {
        return (
            <div class="Modal-Footer">
                <input type="submit" class="acept" value="Enviar" />
                <input type="button" class="cancel" value="cancel"
                    onClick={()=>{this.props.handleClose();this.props.resetState();}} />
            </div>
        );
    }
}