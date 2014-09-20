#pragma strict
var player : PlayerMove;
var construction : Construction;
var m : Message;
private var next = 300;
function Start () {
	construction = gameObject.GetComponent(Construction);
}

function Update () {
	if (construction.constructed > next) {
		player.bombRadius *= 2;
		next *= 2;
		m.addMessage("Upgraded Bomb - Wider Blast");
	}
}
