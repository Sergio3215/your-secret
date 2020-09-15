class Profile extends React.Component {
    constructor() {
        super();
    }

    render() {
        var sizeWidth =  document.documentElement.clientWidth;
        return (
            <div>
                <div class="menu-btn" style={{
                    "padding-top":"15px",
                    "padding-bottom":"15px"
                    }}>
                    <nav class="Menu-principal-btn">
                        <button onClick={() => {
                            window.location.href = "/";
                        }}>Back</button>
                        <b style={{"margin-left":(sizeWidth/2)-50}}>Profile</b>
                    </nav>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Profile />, document.getElementById('profile')
);