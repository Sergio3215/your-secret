class Body extends React.Component{
    render(){
        return(
            <div style={{"margin-left":"15px"}}>
                {this.props.children}
            </div>
        );
    }
}