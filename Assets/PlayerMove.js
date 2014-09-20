#pragma strict
private var pullTarget : Moveable;
private var beamObj : LineRenderer;
private var side = 2;
private var gameOver = false;
var missileCool : int = 100;
var bombRadius : int = 450;
var plasPower : int = 13;
var Laser : GameObject;
var Plasma : GameObject;
var Bomb : GameObject;
var attack = 5;
var red : Texture;
var blue : Texture;
var green : Texture;
private var canShoot = [5, 5, 5];
var cursor : Texture;
private var curWeapon : int= 0;
private var allWeapons = [plasma, missile, bomb];
private var color = [red, blue, green];

var messenger : Message;
function Start () {
	beamObj = GetComponent(LineRenderer);
	color = [red, blue, green];
}

function OnGUI() {
	if (!gameOver) {
		var mouse = Input.mousePosition;

		GUI.DrawTexture(Rect(mouse.x - 30, Screen.height - mouse.y - 30, 60, 60), cursor, ScaleMode.ScaleToFit, true, 0.0f);
		for (var x = 0; x < canShoot.length; x++) {
			GUI.DrawTexture(Rect(Screen.width - 100, 300 + x * 40, canShoot[x], 40), color[x], ScaleMode.StretchToFill, true, 0.0f);
		}
	}
	if (curWeapon == 0) {
		GUI.Label(Rect(10, 100, 200, 100), "<color=red>Plasma Beam</color>");
	}
	if (curWeapon == 1) {
		GUI.Label(Rect(10, 100, 200, 100), "<color=blue>Homing Missile</color>");
	}
	if (curWeapon == 2) {
		GUI.Label(Rect(10, 100, 200, 100), "<color=green>Bomb</color>");
	}
	//TODO: add text for attack, beam, and power
}

function Update () {
	curWeapon += Input.GetAxis("Mouse ScrollWheel");
	curWeapon = (canShoot.length + curWeapon) % canShoot.length;
	for (var i = 0; i < canShoot.length; i++)
		canShoot[i] -=Time.deltaTime * 10;
	rigidbody.AddRelativeForce(Vector3.forward * Input.GetAxis("Vertical") * 25.0);
	rotateShip();
	if (Input.GetButton("Fire1") && canShoot[curWeapon] <= 0) {
		allWeapons[curWeapon]();
	}
	if (Input.GetButton("Fire2")) {

		beam();
	}else{
		pullTarget = null;
		beamObj.enabled = false;
	}
}
function laserbeam() {

}

function plasma() {
	canShoot[0] = 5;
	side *= -1;
	var laser : Laser = Instantiate(Plasma, transform.position + transform.forward * 9 + (transform.right *  side), transform.rotation).GetComponent("Laser");
	var mouse = Input.mousePosition;
	var ray = Camera.main.ScreenPointToRay(Vector3(mouse.x, mouse.y, 0));

	var hitInfo : RaycastHit;
	if (Physics.Raycast(ray, hitInfo, 500, ~((1<<8) | (1<<2)))) {
		if (hitInfo.collider.gameObject.name != "Player")
			laser.gameObject.transform.rotation = Quaternion.LookRotation(hitInfo.point - laser.gameObject.transform.position, Vector3.up);
	} else {

		laser.gameObject.transform.rotation = Quaternion.LookRotation(Camera.main.ScreenToWorldPoint(Vector3(mouse.x, mouse.y, 200)) - laser.gameObject.transform.position, Vector3.up);
	}
}
function missile() {
	canShoot[1] = (side > 0 ? missileCool : 5);
	side *= -1;
	var laser : Laser = Instantiate(Laser, transform.position + transform.forward * 9 + (transform.right *  side), transform.rotation).GetComponent("Laser");
	var mouse = Input.mousePosition;
	var ray = Camera.main.ScreenPointToRay(Vector3(mouse.x, mouse.y, 0));

	var hitInfo : RaycastHit;
	if (Physics.Raycast(ray, hitInfo, 500, ~((1<<8) | (1<<2)))) {
		if (hitInfo.collider.gameObject.name != "Player")
			laser.target = hitInfo.collider.gameObject.transform;
	}

}

function beam() {
	var mouse = Input.mousePosition;
	var ray = Camera.main.ScreenPointToRay(Vector3(mouse.x, mouse.y, 0));
	var hitInfo : RaycastHit;
	if (Physics.Raycast(ray, hitInfo, 100)) {
		var moveAble : Moveable = hitInfo.collider.gameObject.GetComponent("Moveable");
		if (moveAble != null && pullTarget == null) {
			pullTarget = moveAble;
		}
	}
	if (pullTarget != null) {
		beamObj.enabled = true;
		beamObj.SetPosition(0, transform.position);
		beamObj.SetPosition(1, pullTarget.gameObject.transform.position);
		if (Vector3.Distance(transform.position, pullTarget.gameObject.transform.position) > 3)
			pullTarget.Move(transform.position);
	} else {
		beamObj.enabled = false;
	}
}

function rotateShip() {

	var mousepos = Input.mousePosition;
	var screenMid = Vector2(Screen.width/2.0, Screen.height/2.0);

	var difference = mousepos - screenMid;
	difference *= Time.deltaTime;
	difference /= 5;
	/*rigidbody.AddRelativeTorque(Vector3.up * difference.x);
	  rigidbody.AddRelativeTorque(Vector3.right * -difference.y);*/
	transform.Rotate(-difference.y, difference.x, 200 * -Input.GetAxis("Horizontal") * Time.deltaTime);
	rigidbody.angularVelocity = Vector3(0, 0, 0);
}

function die(dmg) {
	//Application.LoadLevel("world");
	gameOver = true;
	messenger.addMessage("Game over");
	gameObject.renderer.enabled = false;
	yield WaitForSeconds(3);
	Application.LoadLevel("World");
}

function bomb() {
	canShoot[2] = 2500;
	var b : Bomb = Instantiate(Bomb, transform.position - transform.up, transform.rotation).GetComponent("Bomb");
	b.time = bombRadius;
}
