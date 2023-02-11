export default class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  add(vec3) {
    this.x += vec3.x;
    this.y += vec3.y;
    this.z += vec3.z;
    return this;
  }
  
  subtract(vec3) {
    this.x -= vec3.x;
    this.y -= vec3.y;
    this.z -= vec3.z;
    return this;
  }
  
  dot(vec3) {
    return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
  }
  
  cross(vec3) {
    // preserves original values
    let x = this.x;
    let y = this.y;
    let z = this.z;
    
    // edit vector values
    this.x = y * vec3.z - z * vec3.y;
    this.y = -(x * vec3.z - z * vec3.x);
    this.z = x * vec3.y - y * vec3.x;
    return this;
  }
  
  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }
  
  copy(vec3) {
    this.x = vec3.x;
    this.y = vec3.y;
    this.z = vec3.z;
    return this;
  }
}