class Configuration extends React.Component {
    constructor() {
        super();
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            displayChangePass: 'none',
            txtHeader: ''
        }
    }

    showModal(e) {
        this.setState({ displayChangePass: "block", txtHeader: e.target.innerHTML }, () => this.forceUpdate());
    }
    handleClose() {
        this.setState({ displayChangePass: "none" }, () => this.forceUpdate());
    }
    render() {
        var sizeWidth = document.documentElement.clientWidth;
        var configModal;
        if (this.state.displayChangePass === "none") {
            configModal = null;
        }
        else {
            configModal = <div class="Modal-Container">
                <ConfigModal
                    handleClose={this.handleClose}
                    txtHeader={this.state.txtHeader} />
            </div>;
        }
        return (
            <div>
                <div class="menu-btn" style={{
                    "padding-top": "15px",
                    "padding-bottom": "15px"
                }}>
                    <nav class="Menu-principal-btn">
                        <button onClick={() => {
                            window.location.href = "/";
                        }} class="btn-back">Back</button>
                        <b style={{ "margin-left": (sizeWidth / 2) - 50 }}>Configuracion</b>
                    </nav>
                </div>
                <div class="cf-body">
                    <div>
                        <button onClick={this.showModal}>Cambiar la contraseña</button>
                    </div>
                    <div>
                        <button onClick={this.showModal}>
                            Borrar la cuenta
                    </button>
                    </div>
                    <div>
                        {configModal}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Configuration />, document.getElementById('config')
);