(function() {
	
	window.addEventListener('load', init);
	
	function init() {
		var status = document.getElementById('status');
		var demo = document.getElementById('demoordie');
		var items = [];

		items.push(navigator.userAgent);

		status.innerHTML = '<ul>' + items.map(itemise) + '</ul>';

		initDemoEffect(demo);

	}

	function itemise(text) {
		return '<li>' + text + '</li>';
	}

	function initDemoEffect(element) {
		var w = 300;
		var h = 200;
		var lastRenderTime;

		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );

		var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize( w, h );
		renderer.setClearColor( 0x000000, 0);
		element.appendChild(renderer.domElement);
		
		// for the red and white material
		var materialRed = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
		var materialWhite = new THREE.MeshBasicMaterial( { color: 0xffffff } );
		var ballMaterials = [ materialRed, materialWhite ];
		var amigaBallMaterial = new THREE.MeshFaceMaterial(ballMaterials);
		var geometryPieces = new THREE.SphereGeometry( 2, 16, 8 );

		for ( var i = 0, l = geometryPieces.faces.length; i < l; i ++ ) {
			var face = geometryPieces.faces[ i ];
			var index = (i % 4);
			if(index === 0 || index === 3) {
				index = 0;
			} else {
				index = 1;
			}
			face.materialIndex = index;
		}

		geometryPieces.materials = ballMaterials;

		var mesh = new THREE.Mesh( geometryPieces, amigaBallMaterial );
		scene.add( mesh );

		camera.position.z = 5;

		function render(t) {

			if(lastRenderTime === undefined) {
				lastRenderTime = t;
			}

			var elapsed = t - lastRenderTime;
			lastRenderTime = t;
	

			requestAnimationFrame(render);

			var alpha = t * 0.002;
			mesh.position.y = Math.sin(alpha * 2);
			mesh.position.x = 1.5 * Math.cos(alpha);
			mesh.rotation.y += elapsed * 0.001;
			mesh.rotation.z += elapsed * 0.001;
			renderer.render( scene, camera );
			
		}

		requestAnimationFrame(render);
	}

})();
