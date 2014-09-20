#pragma strict
var toSpawn : GameObject;
var enemies : Array;
function Start () {
	enemies = new Array();
}
function Update() {
	Spawn();
}
function Spawn () {
	if (Random.Range(0, 1000) > 998 && enemies.length < 15) {
		var x = Random.Range(3, 10);
		for (var i = 0; i < x; i++) {
			enemies.Add(
			Instantiate(toSpawn, transform.position + Vector3(Random.Range(-10, 10),Random.Range(-10, 10), Random.Range(-10, 10)), transform.rotation));
		}
		yield WaitForSeconds(30);
	}

	for (var v = 0; v < enemies.length; v++) {
		if (enemies[v] == null) {
			enemies.RemoveAt(v);
		}
	}
	print (enemies.length);
}
