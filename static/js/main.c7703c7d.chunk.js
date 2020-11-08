(this["webpackJsonpdinosaur-game-mai"]=this["webpackJsonpdinosaur-game-mai"]||[]).push([[0],[,,,,,,,,,,,,,,,function(t,e,a){},,function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){"use strict";a.r(e);var n=a(0),r=a(2),s=a.n(r),i=a(9),o=a.n(i),u=(a(15),a(1)),c=a.n(u),d=a(7),p=a(3),h=a(4),m=a(6),l=a(5),b=(a(17),function(t){Object(m.a)(a,t);var e=Object(l.a)(a);function a(){return Object(p.a)(this,a),e.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){var t=this;return Object(n.jsx)("textarea",{className:"code-textarea",onChange:function(e){t.props.changeCodeText(e)}})}}]),a}(r.Component)),g=(a(18),function(t){Object(m.a)(a,t);var e=Object(l.a)(a);function a(t){var n;return Object(p.a)(this,a),(n=e.call(this,t)).changeCodeText=function(t){n.setState({codeText:t.target.value})},n.checkCodeTextErrors=function(){var t=n.state.codeText.split("\n"),e=[];for(var a in t){var r=!0,s=t[a].trim();if(""!==s){for(var i in n.avalibleCommands)if(n.avalibleCommands[i].regExp.test(s)){r=!1;var o=s.substr(s.indexOf("(")+1,s.indexOf(")")-s.indexOf("(")-1)||1;e.push({command:n.avalibleCommands[i].command,argument:o});break}if(r)return console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u0432 \u0441\u0442\u0440\u043e\u043a\u0435 #"+a+":\n",s),n.props.setCodeData([]),!1}}return n.props.setCodeData(e),!0},n.state={codeText:"Jump(3);\nSit();\nRun(4);"},n.avalibleCommands=[{command:"jump",regExp:new RegExp("^Jump\\(\\d*\\);$")},{command:"run",regExp:new RegExp("^Run\\(\\d*\\);$")},{command:"sit",regExp:new RegExp("^Sit\\(\\d*\\);$")}],n}return Object(h.a)(a,[{key:"runCode",value:function(){this.checkCodeTextErrors()&&this.props.setGameState("runned")}},{key:"stopCode",value:function(){this.props.setGameState("stopping")}},{key:"render",value:function(){var t=this;return Object(n.jsxs)("div",{className:"code-window",children:[Object(n.jsx)(b,{changeCodeText:this.changeCodeText}),Object(n.jsx)("button",{className:"stopped"===this.props.gameState?"code-window-button code-run-button":"code-window-button code-run-button code-window-button__disabled code-run-button__disabled",onClick:function(){return t.runCode()},disabled:"stopped"!==this.props.gameState,children:"Run Code"}),Object(n.jsx)("button",{className:"runned"===this.props.gameState?"code-window-button code-stop-button":"code-window-button code-stop-button code-window-button__disabled code-stop-button__disabled",onClick:function(){return t.stopCode()},disabled:"runned"!==this.props.gameState,children:"Stop Code"})]})}}]),a}(r.Component)),f=(a(19),function(t){Object(m.a)(a,t);var e=Object(l.a)(a);function a(){return Object(p.a)(this,a),e.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return Object(n.jsx)("div",{className:this.props.isSitted?"dinosaur-block dinosaur-block-sitted":"dinosaur-block",style:this.props.isSitted?{top:50*this.props.y+"px",left:50*this.props.x+"px"}:{top:50*(this.props.y-1)+"px",left:50*this.props.x+"px"}})}}]),a}(r.Component)),x=(a(20),function(t){Object(m.a)(a,t);var e=Object(l.a)(a);function a(t){var n;return Object(p.a)(this,a),(n=e.call(this,t)).state={sleepDuration:500,codeData:[],dinosaurIsSitted:!1,dinosaurCoordinates:{x:0,y:n.props.gameWindowHeight-1}},n.createGameField(),n}return Object(h.a)(a,[{key:"createGameField",value:function(){var t=Object(d.a)(c.a.mark((function t(){var e,a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.setState({dinosaurIsSitted:!1,dinosaurCoordinates:{x:0,y:this.props.gameWindowHeight-1}});case 2:for(e=Array(this.props.gameWindowHeight),a=0;a<e.length;a++)for(e[a]=Array(this.props.gameWindowWidth),n=0;n<e[a].length;n++)e[a][n]="";this.gameField=e,this.addDinosaurOnField();case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"startGameModeling",value:function(){var t=Object(d.a)(c.a.mark((function t(){var e,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("STARTED"),console.log(this.props.codeData),t.next=4,this.createGameField();case 4:return e=this.props.codeData,t.next=7,this.sleepAnimation();case 7:if(t.sent){t.next=9;break}return t.abrupt("return",!1);case 9:a=0;case 10:if(!(a<e.length)){t.next=34;break}t.t0=e[a].command,t.next="run"===t.t0?14:"sit"===t.t0?19:"jump"===t.t0?24:29;break;case 14:return t.next=16,this.makeDinosaurRun(e[a].argument);case 16:if(t.sent){t.next=18;break}return t.abrupt("return",!1);case 18:return t.abrupt("break",31);case 19:return t.next=21,this.makeDinosaurSit(e[a].argument);case 21:if(t.sent){t.next=23;break}return t.abrupt("return",!1);case 23:return t.abrupt("break",31);case 24:return t.next=26,this.makeDinosaurJump(e[a].argument);case 26:if(t.sent){t.next=28;break}return t.abrupt("return",!1);case 28:return t.abrupt("break",31);case 29:return console.error("startGameModeling error! Command:",e[a]),t.abrupt("return",!1);case 31:a++,t.next=10;break;case 34:return this.props.setGameState("stopped"),t.abrupt("return",!0);case 36:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"addDinosaurOnField",value:function(){this.state.dinosaurIsSitted?(this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x]="dino",this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x+1]="dino"):(this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x]="dino",this.gameField[this.state.dinosaurCoordinates.y-1][this.state.dinosaurCoordinates.x]="dino")}},{key:"deleteDinosaurOnField",value:function(){this.state.dinosaurIsSitted?(this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x]="",this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x+1]=""):(this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x]="",this.gameField[this.state.dinosaurCoordinates.y-1][this.state.dinosaurCoordinates.x]="")}},{key:"makeDinosaurRun",value:function(){var t=Object(d.a)(c.a.mark((function t(e){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=0;case 1:if(!(a<e)){t.next=9;break}return t.next=4,this.changeDinosaurState({dinosaurCoordinates:{x:this.state.dinosaurCoordinates.x+1,y:this.state.dinosaurCoordinates.y}});case 4:if(t.sent){t.next=6;break}return t.abrupt("return",!1);case 6:a++,t.next=1;break;case 9:return t.abrupt("return",!0);case 10:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"makeDinosaurSit",value:function(){var t=Object(d.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.changeDinosaurState({dinosaurIsSitted:!0});case 2:if(t.sent){t.next=4;break}return t.abrupt("return",!1);case 4:return t.next=6,this.makeDinosaurRun(e);case 6:if(t.sent){t.next=8;break}return t.abrupt("return",!1);case 8:return t.next=10,this.changeDinosaurState({dinosaurIsSitted:!1});case 10:if(t.sent){t.next=12;break}return t.abrupt("return",!1);case 12:return t.abrupt("return",!0);case 13:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"makeDinosaurJump",value:function(){var t=Object(d.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.changeDinosaurState({dinosaurCoordinates:{x:this.state.dinosaurCoordinates.x+1,y:this.state.dinosaurCoordinates.y-Number(e)}});case 2:if(t.sent){t.next=4;break}return t.abrupt("return",!1);case 4:return t.next=6,this.changeDinosaurState({dinosaurCoordinates:{x:this.state.dinosaurCoordinates.x+1,y:this.state.dinosaurCoordinates.y+Number(e)}});case 6:if(t.sent){t.next=8;break}return t.abrupt("return",!1);case 8:return t.abrupt("return",!0);case 9:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"changeDinosaurState",value:function(){var t=Object(d.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.deleteDinosaurOnField(),t.next=3,this.setState(e);case 3:if(this.checkDinosaurInField()){t.next=5;break}return t.abrupt("return",!1);case 5:return this.addDinosaurOnField(),console.log(this.gameField),t.next=9,this.sleepAnimation();case 9:if(t.sent){t.next=11;break}return t.abrupt("return",!1);case 11:return t.abrupt("return",!0);case 12:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"checkDinosaurInField",value:function(){return this.state.dinosaurIsSitted?!(this.state.dinosaurCoordinates.x<0||this.state.dinosaurCoordinates.x+1>this.props.gameWindowWidth-1||this.state.dinosaurCoordinates.y>this.props.gameWindowHeight-1||this.state.dinosaurCoordinates.y<0)||(console.error("\u0414\u0438\u043d\u043e\u0437\u0430\u0432\u0440 \u0437\u0430 \u043f\u0440\u0435\u0434\u0435\u043b\u0430\u043c\u0438 \u043f\u043e\u043b\u044f!"),this.props.setGameState("stopped"),!1):!(this.state.dinosaurCoordinates.x<0||this.state.dinosaurCoordinates.x>this.props.gameWindowWidth-1||this.state.dinosaurCoordinates.y>this.props.gameWindowHeight-1||this.state.dinosaurCoordinates.y-1<0)||(console.error("\u0414\u0438\u043d\u043e\u0437\u0430\u0432\u0440 \u0437\u0430 \u043f\u0440\u0435\u0434\u0435\u043b\u0430\u043c\u0438 \u043f\u043e\u043b\u044f!"),this.props.setGameState("stopped"),!1)}},{key:"sleepAnimation",value:function(){var t=Object(d.a)(c.a.mark((function t(){var e=this;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("runned"!==this.props.gameState){t.next=6;break}return t.next=3,new Promise((function(t){return setTimeout(t,e.state.sleepDuration)}));case 3:return t.abrupt("return",!0);case 6:if("stopping"!==this.props.gameState){t.next=11;break}return this.props.setGameState("stopped"),t.abrupt("return",!1);case 11:return console.error("Error state in GameWindow.sleepAnimation()!",this.props.gameState),t.abrupt("return",!1);case 13:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(t){t.gameWindowWidth!==this.props.gameWindowWidth||t.gameWindowHeight!==this.props.gameWindowHeight?this.createGameField():"stopped"===t.gameState&&"runned"===this.props.gameState&&this.startGameModeling()}},{key:"render",value:function(){return Object(n.jsx)("div",{className:"game-window",style:{width:50*this.props.gameWindowWidth+"px",height:50*this.props.gameWindowHeight+"px"},children:Object(n.jsx)(f,{isSitted:this.state.dinosaurIsSitted,x:this.state.dinosaurCoordinates.x,y:this.state.dinosaurCoordinates.y})})}}]),a}(r.Component)),v=(a(21),function(t){Object(m.a)(a,t);var e=Object(l.a)(a);function a(){return Object(p.a)(this,a),e.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){var t=this;return Object(n.jsxs)("div",{className:"game-option-block",children:[Object(n.jsx)("p",{className:"game-option-name",children:this.props.optionName+":"}),Object(n.jsx)("input",{type:"text",size:"2",onChange:function(e){t.props.stateChangeFunction(e)}})]})}}]),a}(r.Component)),j=function(t){Object(m.a)(a,t);var e=Object(l.a)(a);function a(){var t;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(t=e.call.apply(e,[this].concat(r))).changeGameWindowWidth=function(e){isNaN(Number(e.target.value))?e.target.value=e.target.value.slice(0,-1):t.setState({gameWindowWidth:Number(e.target.value)})},t.changeGameWindowHeight=function(e){isNaN(Number(e.target.value))?e.target.value=e.target.value.slice(0,-1):t.setState({gameWindowHeight:Number(e.target.value)})},t}return Object(h.a)(a,[{key:"render",value:function(){var t=this;return Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)(v,{optionName:"\u0428\u0438\u0440\u0438\u043d\u0430 \u043f\u043e\u043b\u044f",stateChangeFunction:this.changeGameWindowWidth}),Object(n.jsx)(v,{optionName:"\u0412\u044b\u0441\u043e\u0442\u0430 \u043f\u043e\u043b\u044f",stateChangeFunction:this.changeGameWindowHeight}),Object(n.jsx)("button",{onClick:function(){return t.props.updateGameOptinons(t.state.gameWindowWidth,t.state.gameWindowHeight)},children:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c"})]})}}]),a}(r.Component),w=(a(22),function(t){Object(m.a)(a,t);var e=Object(l.a)(a);function a(t){var n;return Object(p.a)(this,a),(n=e.call(this,t)).updateGameOptinons=function(t,e){n.setState({gameWindowWidth:t,gameWindowHeight:e})},n.setCodeData=function(){var t=Object(d.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.setState({codeData:e});case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),n.setGameState=function(){var t=Object(d.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.setState({gameState:e});case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),n.state={gameWindowWidth:10,gameWindowHeight:6,gameState:"stopped",codeData:[]},n}return Object(h.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)(x,{gameWindowWidth:this.state.gameWindowWidth,gameWindowHeight:this.state.gameWindowHeight,codeData:this.state.codeData,gameState:this.state.gameState,setGameState:this.setGameState,ref:this.gameWindowRef}),Object(n.jsx)(j,{updateGameOptinons:this.updateGameOptinons}),Object(n.jsx)(g,{setCodeData:this.setCodeData,setGameState:this.setGameState,gameState:this.state.gameState})]})}}]),a}(r.Component));o.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(w,{})}),document.getElementById("root"))}],[[23,1,2]]]);
//# sourceMappingURL=main.c7703c7d.chunk.js.map