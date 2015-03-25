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
		var w = 200;
		var h = 200;
		var lastRenderTime;

		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );

		var renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize( w, h );
		renderer.setClearColor( 0x000000, 0);
		element.appendChild(renderer.domElement);
		
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var mesh = new THREE.Mesh( geometry, material );
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
			mesh.position.x = Math.cos(alpha);
			mesh.rotation.y += elapsed * 0.001;
			renderer.render( scene, camera );
			
		}

		requestAnimationFrame(render);
	}

})();
