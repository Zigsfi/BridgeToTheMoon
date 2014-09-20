#pragma strict
var con  : Construction;
var font : Font;
var style : GUIStyle;
var message = "";
var messages : Array;
var messageTime : float = 55;
function Start () {
	messages = new Array();
	addMessage("Connect the white moon to Earth");
	addMessage("Bring the grey cubes to the bridge to earn points");
	addMessage("WASD to move, mouse to aim");
	addMessage("Left Click for weapons, Right for tractor beam");
	addMessage("Scroll wheel to change weapons");
	addMessage("Bring cubes to the colored moons to upgrade your weapons");
	addMessage("Or destroy them to regain health");

	style = GUIStyle();
	style.font = font;
	style.fontSize = 16;
	style.alignment = TextAnchor.UpperCenter;
}

function OnGUI () {
	GUI.Label(Rect(Screen.width /2 - 300, Screen.height - 400, 600, 100), message, style);	
	
}

function addMessage(msg : String) {
	messages.Push(msg.ToLower());
}

function Update () {
	messageTime -= Time.deltaTime * 10;
	if (messageTime <= 0) {
		try {
			message ="<color=grey>"+ messages[0]+"</color>";
			messages.RemoveAt(0);
			messageTime = 55; 
		}catch(e) { message = "";}
	}
}
