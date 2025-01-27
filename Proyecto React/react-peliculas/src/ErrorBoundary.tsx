import React, { ReactElement } from "react";

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
  constructor(props: ErrorBoundaryProps){
    super(props);
    this.state = {hayError: false, mensaje: ''}
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      console.log(error);
      console.log(errorInfo);
  }

  static getDerivedStateFromError (error: any){
    console.log(error);
    return {hayError: true, mensaje: error};
  }

  render(){
    if(this.state.hayError){
        if(this.props.errorUI){
            return this.props.errorUI
        }else{
            return <h3>{this.state.mensaje}</h3>
        }
    }

    return this.props.children;
  }
}

interface ErrorBoundaryState {
    hayError: boolean;
    mensaje: string;
}

interface ErrorBoundaryProps {
  errorUI?: ReactElement
  children?: ReactElement
  
}