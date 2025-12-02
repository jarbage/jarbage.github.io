
export default class Tile {
    constructor(value, x, y, scene, height) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.scene = scene;
        this.color = 0x00ff00;

        this.height = height;
        this.radiusSize = 1;
        this.radialSegments = 6;

        this.metaTile = this.createTile();
    }

    createTile() {
        let metaTile = this.tileBuilder();
        return metaTile;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }


    tileBuilder(){
        let metaMaterial =  new THREE.MeshToonMaterial({color: this.color});
        let metaGeometry = new THREE.CylinderBufferGeometry(this.radiusSize, this.radiusSize, this.height, this.radialSegments);
        let metaTile = new THREE.Mesh(metaGeometry, metaMaterial);
        return metaTile;
    }

 
    loadScene() {
        this.scene.add(this.metaTile);
    }


}
