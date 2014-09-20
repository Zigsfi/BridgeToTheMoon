#pragma strict
var con  : Construction;
var font : Font;
var style : GUIStyle;
function Start () {
	con = GetComponent(Construction);
	style = GUIStyle();
	style.alignment = TextAnchor.UpperCenter;
	style.font = font;
	style.fontSize = 80;
}
function OnGUI() {
	GUI.Label(Rect(Screen.width - 150, 20, 100, 100), "<color=white>"+con.score+"</color>", style);
}
function Update () {
	
}
