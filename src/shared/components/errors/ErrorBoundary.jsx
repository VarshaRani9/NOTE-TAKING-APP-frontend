import React from 'react'
export class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)// props initialize
        this.state = {error : null}
    }
    static getDerivedStateFromError(error){
        return {error:error}
    }
    componentDidCatch(error,info){
        // this.setState(error)
        console.log(error);
    }
    render(){
        if(this.state.error){
            return (<p>OOPS something went wrong</p>)
        }
        else return this.props.children;
    }
}