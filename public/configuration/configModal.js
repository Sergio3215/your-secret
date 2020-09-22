class ConfigModal extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.oldPassHandle = this.oldPassHandle.bind(this);
        this.newPassHandle = this.newPassHandle.bind(this);
        this.reptPassHandle = this.reptPassHandle.bind(this);
        this.state = {
            oldPass:'',
            newPass:'',
            reptPass:'',
            errMsg:''
        }
    }
    oldPassHandle(e){
        this.setState({oldPass:e.target.value},()=>this.forceUpdate());
    }
    newPassHandle(e){
        this.setState({newPass:e.target.value},()=>this.forceUpdate());
    }
    reptPassHandle(e){
        this.setState({reptPass:e.target.value},()=>this.forceUpdate());
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.txtHeader !== "Cambiar la contraseña") {
            this.deleteAccount();
        }
        else {
            this.changePassword();
        }
    }
    deleteAccount() {
        fetch('users/' + document.cookie.split("=")[1], {
            method: 'DELETE'
        })
            .then(res => {
                window.location.href = "/";
                return res;
            })
    }
    changePassword() {
        fetch('users/' + document.cookie.split("=")[1], {
            method: "PUT",
            body: JSON.stringify({ 
                oldPass: this.state.oldPass, 
                newPass: this.state.newPass, 
                reptPass: this.state.reptPass }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json =>{
                console.log(json);
                if(json.msg !== undefined){
                    this.setState({errMsg:json.msg},()=>this.forceUpdate())
                }
                else{
                    
                }
            })
    }
    render() {
        var interfaceClass = "";
        var txtHeader = "";
        var body;
        var affirmative;
        var negative;
        if (this.props.txtHeader === "Cambiar la contraseña") {
            interfaceClass = "Modal-InterfaceConfigP";
            txtHeader = this.props.txtHeader;
            affirmative = "Cambiar";
            negative = "Cancelar";
            body = <div class="Modal-Body">
                <div>
                    <label>Antigua contraseña</label>
                    <input type="password" value={this.state.oldPass} onChange={this.oldPassHandle}/>
                </div>
                <div>
                    <label>Nueva contraseña</label>
                    <input type="password" value={this.state.newPass} onChange={this.newPassHandle}/>
                </div>
                <div>
                    <label>Repite la contraseña</label>
                    <input type="password" value={this.state.reptPass} onChange={this.reptPassHandle}/>
                </div>
                <div class="msgError">{this.state.errMsg}</div>
            </div>;
        }
        else {
            interfaceClass = "Modal-InterfaceConfigB";
            txtHeader = "Alerta!";
            body = <div class="Modal-Body">
                Aviso: Si aceptas borrar tu cuenta,
                todas tus publicaciones, multimedia, y demas, se perderan<br />
                ¿Quieres realmente borrar tu cuenta?
            </div>;
            affirmative = "Si";
            negative = "No";
        }
        return (
            <form class={interfaceClass} onSubmit={this.handleSubmit}>
                <div class="Modal-Header">
                    <b>{txtHeader}</b>
                    <input class="Modal-Close"
                        type="button"
                        value="X"
                        onClick={this.props.handleClose} />
                </div>
                {body}
                <div class="Modal-Footer">
                    <input type="submit" class="aceptar" value={affirmative} />
                    <input type="button" class="cancelar" value={negative}
                        onClick={this.props.handleClose} />
                </div>
            </form>
        );
    }
}