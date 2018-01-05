var Teapot = function (mesh) {
	  this.mesh = mesh;
		pickables2.push (mesh);
		this.mesh.name = 't'+ num; 
    num++;
    teapotNum++;
    this.angle = 0;
    this.turnSpeed = 0.3;
    this.turn = true;
    this.life = 100;
    this.alpha = 1.0;
    
    this.meshSil = mesh.clone();
    this.meshSil.material = material_shh_normal.clone();
    scene0.add(this.meshSil);
};

function findTeapot(mesh) {
	for (var i = 0; i < teapots.length; i++) {
  	if (teapots[i].mesh === mesh)
    	return teapots[i];
  }
}

// method of Person
Teapot.prototype.update = function () {
  if (this.turn) {
    this.angle += this.turnSpeed;
  }
  this.mesh.rotation.y = this.angle;
  this.meshSil.rotation.y = this.angle;
  
  this.life -= 0.3;
  if(this.life < 0)
    this.expire();
  this.turnSpeed /= 1.01;
  
  this.alpha -= 0.0025;
  this.mesh.material.uniforms.opacity.value = this.alpha;
  this.mesh.material.uniforms.lightpos.value.copy(pointLight.position);  
  this.meshSil.material.uniforms.opacity.value = this.alpha;
};

Teapot.prototype.expire = function () {
	scene.remove(this.mesh);
  teapotNum--;
  teapots.shift();   // delete the first object in teapots[], like pop_front()
  pickables2.shift();
  scene0.remove(this.meshSil);
}
