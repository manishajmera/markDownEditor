import React from "react";



export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
        //setInterval(() => {
        //    todos.push({
        //        task: "Make tea: " + Math.random(),
        //        isCompleted: true
        //    });
        //    this.setState({ todos });
        //}, 1000);
    }
    render () {
        return (
            <div>
                <h1>TODOs</h1>
                 <form onSubmit={this.onSubmit.bind(this)} className="create-todo-form">
                    <textarea  placeholder="Task" ref="taskMessage" autoFocus/>
                     <button>Add</button>
                </form>
                {this.state.string && <div dangerouslySetInnerHTML={{__html:this.state.string}}/>}
            </div>
        );
    }
    onSubmit (e) {
        this.createTask(this.refs.taskMessage.value);
        this.refs.taskMessage.value = "";
        e.preventDefault();
    }

    createTask (str) {
	var bold = -1;
	var underline = -1;
	var increaseFontSize =-1;
	var leftSideBracket = -1;
    var incresedCharacterCount=0;
	var tempStr  = str;
        for(var i=0 ;i< str.length;i++){
            if(str[i]=="*"){
		if(bold!=-1){
			tempStr = tempStr.substring(0,i+incresedCharacterCount) + "</b>" + tempStr.substring(i+1+incresedCharacterCount,tempStr.length)
			incresedCharacterCount+=3
			bold = -1;
		}else{
			tempStr = tempStr.substring(0,i+incresedCharacterCount) + "<b>" + tempStr.substring(i+1+incresedCharacterCount,tempStr.length)
			incresedCharacterCount+=2
			bold = i;
		}

            }else if(str[i]=="_"){
		if(underline!=-1){
			console.log("")
			tempStr = tempStr.substring(0,i+incresedCharacterCount) + "</u>" + tempStr.substring(i+1+incresedCharacterCount,tempStr.length)
			incresedCharacterCount+=3
			underline = -1;
		}else{
			tempStr = tempStr.substring(0,i+incresedCharacterCount) + "<u>" + tempStr.substring(i+1+incresedCharacterCount,tempStr.length)
			incresedCharacterCount+=2
			underline = i;
		}
            }else if(str[i]=="^"){
		if(increaseFontSize!=-1){
			tempStr = tempStr.substring(0,i+incresedCharacterCount) + "</h3>" + tempStr.substring(i+1+incresedCharacterCount,tempStr.length)
			incresedCharacterCount+=4
			increaseFontSize = -1;
		}else{
			tempStr = tempStr.substring(0,i+incresedCharacterCount) + "<h3>" + tempStr.substring(i+1+incresedCharacterCount,tempStr.length)
			incresedCharacterCount+=3
			increaseFontSize = i;
		}
            }else if(str[i] == "[" && leftSideBracket==-1){
			tempStr = tempStr.substring(0,i+incresedCharacterCount) + "<a href='#'>" + tempStr.substring(i+1+incresedCharacterCount,tempStr.length)
			incresedCharacterCount+=11
			leftSideBracket = i;
		}else if(str[i] == "]" && leftSideBracket!=-1){
			tempStr = tempStr.substring(0,i+incresedCharacterCount) + "</a>" + tempStr.substring(i+1+incresedCharacterCount,tempStr.length)
			incresedCharacterCount+=3
			leftSideBracket = -1;
		}	
        }
	//negative scenrios
	if(bold!=-1){
		let last_index = tempStr.lastIndexOf("<b>");
		tempStr = tempStr.substring(0,last_index) + "*" + tempStr.substring(last_index+3,tempStr.length)
	}
	if(underline!=-1){
		let last_index = tempStr.lastIndexOf("<u>");
		tempStr = tempStr.substring(0,last_index) + "_" + tempStr.substring(last_index+3,tempStr.length)
	}
	if(increaseFontSize!=-1){
		let last_index = tempStr.lastIndexOf("<h3>");
		tempStr = tempStr.substring(0,last_index) + "^" + tempStr.substring(last_index+4,tempStr.length)
	}
	if(leftSideBracket!=-1){
		let last_index = tempStr.lastIndexOf("<a>");
		tempStr = tempStr.substring(0,last_index) + "[" + tempStr.substring(last_index+11,tempStr.length)
	}
        this.setState({ string: tempStr });
    }
}
