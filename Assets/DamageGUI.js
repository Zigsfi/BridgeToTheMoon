#pragma strict
class DamageGUI extends DamageManager {
	function Start () {

	}
	function OnGUI() {
		for (var x = 0; x < health; x++) {
			GUI.DrawTexture(Rect(x * 15, 50, 10, 20), txtr, ScaleMode.ScaleToFit, true, 0.0f);
		}
	}

	function Update() {
		super.Update();
	}
}
