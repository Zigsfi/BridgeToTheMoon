#pragma strict
var power : int = 5;
var time : int = 1000;
var target : Transform;
function Start () {
}

function Update () {
	if (target) {
		transform.LookAt(target.position);
	}
	transform.Translate(Vector3.forward);
	time --;
	if (time <= 0) {
		Destroy(gameObject);
	}


}

function OnCollisionEnter(col : Collision) {
	Destroy(gameObject);
	var dmg = col.gameObject.GetComponent(DamageManager);
	if(dmg) {
		dmg.hurt(power);
	}
}

function OnTriggerEnter(collider : Collider) {
	Destroy(gameObject);
	var dmg = collider.gameObject.GetComponent(DamageManager);
	if(dmg) {
		dmg.hurt(power);
	}
}
