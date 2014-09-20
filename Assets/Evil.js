#pragma strict
var player : GameObject;
var bridge : GameObject;
var corpse : GameObject;
var Laser : GameObject;
var Explosion : GameObject;
private var canShoot : float = 50;
function Start () {
	if (player == null) {
		player = GameObject.Find("Player");
		
	}
	if (bridge == null) {
		bridge = GameObject.Find("Connector");
	}
}

function Update () {
	transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(player.transform.position - transform.position, transform.up), 0.1);
	rigidbody.AddRelativeForce(Vector3.forward * 2);
	rigidbody.angularVelocity = Vector3(0, 0, 0);
	canShoot-= Time.deltaTime * 10;
	if (canShoot < 0) {
		Instantiate(Laser, transform.position + (transform.forward * 9), transform.rotation);
		canShoot = 20;
	}

}

function die() {
	Instantiate(corpse, transform.position, transform.rotation);
	Destroy(Instantiate(Explosion, transform.position, transform.rotation), 3);
	Destroy(gameObject);
}
