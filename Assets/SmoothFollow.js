#pragma strict
var target : Transform;
function Start () {

}

function LateUpdate () {
	if (target != null) {
		transform.position = target.position - transform.forward - target.forward * 5 + target.up * 2;
		transform.rotation = Quaternion.Lerp(transform.rotation, target.rotation, 0.3f);
	}
}
