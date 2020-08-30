class App extends React.Component {
    constructor() {
        super();
        this.changeBody = this.changeBody.bind(this);
        this.state = {
            txtBody: 'Inicio'
        }
    }

    changeBody(e) {
        this.setState({ txtBody: e.target.innerHTML });
    }

    render() {
        var bodyContain;
        if(this.state.txtBody === "Inicio"){
            bodyContain = <Inicio/>;
        }
        else if(this.state.txtBody === "FAQ"){
            bodyContain = <Faq/>;
        }
        else if(this.state.txtBody === "Support"){
            bodyContain = <Support/>;
        }
        return (
            <div>
                <div class="menu-btn">
                    <Navigation
                        changeBody={this.changeBody} />
                        <LoginBar/>
                </div>
                <div class="BodyApp">
                    <Body>
                        {bodyContain}
                    </Body>
                </div>
                <div style={{"margin-left":"5px"}}>
                    <Footer />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />, document.getElementById('secret')
);