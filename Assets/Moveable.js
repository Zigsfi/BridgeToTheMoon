#pragma strict
var audo : AudioSource;
var value = 50;
function Start () {
	audo = GetComponent(AudioSource);
}

function Update () {

}

function Move (pull : Vector3) {
	rigidbody.AddForce(pull - transform.position);
}

function OnTriggerEnter(other : Collider) {
	if (other.gameObject.name == "Connector") {
		print ("Connection");
		audo.Play();
		other.gameObject.SendMessage("Construct", value);
		Destroy(gameObject, 0.5 );
	}

}

function die(h) {

	GameObject.Find("Player").GetComponent(DamageManager).hurt(-50);
	Destroy(gameObject);
}
