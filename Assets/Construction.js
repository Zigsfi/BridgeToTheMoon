#pragma strict
var constructed = 0;
var score : int = 0;
private var intermediate = 0;
var physical : GameObject;
function Start () {

}

function Update () {
	if (intermediate < constructed) {
		physical.transform.localScale.y += 0.01 * Time.deltaTime;
		physical.transform.position.y += 0.01 * Time.deltaTime;
		intermediate ++;
	}
}

function Construct(val : int) {
	score++;
	constructed+= val;
	if (constructed > 590) {
	}
}
