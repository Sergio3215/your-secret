class Inicio extends React.Component{
    render(){
        return(
            <div>
                <div>{
                    (document.cookie !== "")?
                    <PostCommet setRender={this.props.setRender}/> :
                    null
                    }
                </div>
                <div style={{"margin-top":"20px"}}>
                    <ViewComment />
                </div>
            </div>
        );
    }
}