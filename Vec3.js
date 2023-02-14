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

    // update vector values
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

  magnitude() {
    return (this.dot(this)) ** 0.5;
  }

  /**
   * 
   * @param {Vec3} normal surface normal to be reflected from, which must have a magnitude of 1
   * @returns 
   */
  reflect(normal) {
    // the reason for this implementation is to reduce the creation of objects to improve performance
    // credit: https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
    let d = 2 * this.dot(normal);
    this.x -= normal.x * d;
    this.y -= normal.y * d;
    this.z -= normal.z * d;
    return this;
  }

  /**
   * Uses dot product to find cos(angle)
   * @param {Vec3} from A vector defining where to find the direction from
   * @returns 
   */
  directionCosine(from) {
    return this.dot(from) / (this.magnitude() * from.magnitude());
  }

  setMagnitude(magnitude) {
    this.normalize();
    this.x *= magnitude;
    this.y *= magnitude;
    this.z *= magnitude;
    return this;
  }

  normalize() {
    let m = this.magnitude();
    this.x /= m;
    this.y /= m;
    this.z /= m;
    return this;
  }

  /**
   * Rotates the vector. Input values are expected to be in radians.
   * @param {number} rx amount of rotation about x axis
   * @param {number} ry amount of rotation about y axis
   * @param {number} rz amount of rotation about z axis
   */
  rotate(rx = 0, ry = 0, rz = 0) {
    // credit: https://en.wikipedia.org/wiki/Rotation_matrix#General_rotations
    let x = this.x;
    let y = this.y;
    let z = this.z;
    let cx = Math.cos(rx);
    let cy = Math.cos(ry);
    let cz = Math.cos(rz);
    let sx = Math.sin(rx);
    let sy = Math.sin(ry);
    let sz = Math.sin(rz);

    this.x = x * cy * cz + y * (sx * sy * cz - cx * sz) + z * (cx * sy * cz + sx * sz);
    this.y = x * cy * sz + y * (sx * sy * sz + cx * cz) + z * (cx * sy * sz - sx * cz);
    this.z = x * -sy + y * sx * cy + z * cx * cy;
    return this;
  }
}