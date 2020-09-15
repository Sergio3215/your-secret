var socket;
class App extends React.Component {
    constructor() {
        super();
        this.setRender = this.setRender.bind(this);
        this.changeBody = this.changeBody.bind(this);
        this.state = {
            txtBody: 'Inicio',
            render: false,
            file: [],
            like:false,
            liked:[], 
            id:''
        }
    }
    componentDidMount() {
        socket = io.connect(window.location.toString(),
            {
                'forceNew': true
            });
        this.setRender();
    }
    setRender() {
        socket.emit('posted', this.state.render)
        socket.on('fileUpdate', (files) => {
            //console.log(key)
            var key = !this.state.render;
            this.setState({
                render: key,
                file: files
            });
        });
        socket.on('likeUpdate', (like, liked, id) => {
            //console.log(key)
            console.log(like)
            console.log(liked)
            console.log(id)
            this.setState({
                like: like,
                liked:liked,
                id:id
            });
        });
    }
    changeBody(e) {
        this.setState({ txtBody: e.target.innerHTML });
    }

    render() {
        var bodyContain;
        if (this.state.txtBody === "Inicio") {
            bodyContain = <Inicio
                setRender={this.setRender}
                render={this.state.render}
                socket={socket}
                file={this.state.file}
                like={this.state.like}
                liked={this.state.liked}
                id={this.state.id}
            />;
        }
        else if (this.state.txtBody === "FAQ") {
            bodyContain = <Faq />;
        }
        else if (this.state.txtBody === "Support") {
            bodyContain = <Support />;
        }
        return (
            <div>
                <div class="BodyApp">
                    <Body>
                        {bodyContain}
                    </Body>
                </div>
                <div class="menu-btn">
                    <Navigation
                        changeBody={this.changeBody} />
                    <LoginBar />
                </div>
                {/*<div style={{ "margin-left": "5px" }}>
                    <Footer />
                </div>*/}
            </div>
        );
    }
}

ReactDOM.render(
    <App />, document.getElementById('secret')
);