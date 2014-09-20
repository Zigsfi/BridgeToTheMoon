#pragma strict
var health : int = 100;
var sound : AudioSource;
var soundS : boolean = false;
var txtr : Texture;
function Start () {
	sound = GetComponent("AudioSource");
}

function Update () {
	
	if (health <= 0) {
		gameObject.SendMessage("die", health);
	}
	if (health > 100) {
		health = 100;
	}
}

function hurt(dmg : int) {
	health -= dmg;
	if(sound && soundS)
		sound.Play();
}

function OnGUI() {
	if (gameObject.name == "Player") {
		for (var x = 0; x < health/5; x++) {
			GUI.DrawTexture(Rect(x * 15, 50, 10, 20), txtr, ScaleMode.ScaleToFit, true, 0.0f);
		}
	}
}

