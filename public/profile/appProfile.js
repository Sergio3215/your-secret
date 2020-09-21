var socket;
class Profile extends React.Component {
    constructor() {
        super();
        this.state={
            postInfo:[]
        }
    }
    componentDidMount() {
        this.fetchMount();
    }
    fetchMount() {
        var username = window.location.pathname.split('/')[2];
        fetch('/profiles/'+username)
            .then(res => res.json())
            .then(data => {
                let postinfo = this.Posting(data[0]);
                console.log(data[0])
                this.setState({postInfo: postinfo},()=>this.forceUpdate())
            })
    }
    Posting(pic){
        var username = window.location.pathname.split('/')[2];
        return(
            <div class="pf-header">
                <div>{username}</div>
                <div>
                    {"Post: "+pic.post}
                </div>
                <div>
                    {"Anonimo: "+pic.anonymus}
                </div>
            </div>
        );
    }
    render() {
        var sizeWidth = document.documentElement.clientWidth;
        var username = window.location.pathname.split('/')[2];
        console.log(username);
        return (
            <div>
                <div class="menu-btn" style={{
                    "padding-top": "15px",
                    "padding-bottom": "15px"
                }}>
                    <nav class="Menu-principal-btn">
                        <button onClick={() => {
                            window.location.href = "/";
                        }}>Back</button>
                        <b style={{ "margin-left": (sizeWidth / 2) - 50 }}>Profile</b>
                    </nav>
                </div>
                <div class="pf-body">
                    {this.state.postInfo}
                    <ViewComment profile={true} username={username} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Profile />, document.getElementById('profile')
);