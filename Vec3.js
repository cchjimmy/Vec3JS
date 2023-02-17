export default class Vec3 {
  /**
   * 
   * @param {number} x Magnitude in x
   * @param {number} y Magnitude in y
   * @param {number} z Magnitude in z
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Adds the input vector to this vector
   * @param {Vec3} vec3 The other addend
   * @returns 
   */
  add(vec3) {
    this.x += vec3.x;
    this.y += vec3.y;
    this.z += vec3.z;
    return this;
  }

  /**
   * Subtracts input vector from this vector
   * @param {Vec3} vec3 The subtrahend
   * @returns 
   */
  subtract(vec3) {
    this.x -= vec3.x;
    this.y -= vec3.y;
    this.z -= vec3.z;
    return this;
  }

  /**
   * Dot product between this vector and the input vector
   * @param {Vec3} vec3 This is the b vector in a ⋅ b
   * @returns 
   */
  dot(vec3) {
    return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
  }

  /**
   * Cross product between this vector and the input vector
   * @param {Vec3} vec3 This is the b vector in a x b
   * @returns 
   */
  cross(vec3) {
    return new Vec3(this.y * vec3.z - this.z * vec3.y, -(this.x * vec3.z - this.z * vec3.x), this.x * vec3.y - this.y * vec3.x);
  }

  /**
   * Multiplies each term in this vector with the input value
   * @param {number} scalar The multiplicand
   * @returns 
   */
  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  /**
   * 
   * @param {Vec3} vec3 Source vector to copy from
   * @returns This vector with values from the source vector
   */
  copy(vec3) {
    this.x = vec3.x;
    this.y = vec3.y;
    this.z = vec3.z;
    return this;
  }

  /**
   * 
   * @returns Magnitude of this vector
   */
  magnitude() {
    return (this.dot(this)) ** 0.5;
  }

  /**
   * Reflects this vector using the input vector
   * @param {Vec3} normal Surface normal, magnitude must be 1
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
   * Uses dot product to find cos(angle) between this vector and the input vector
   * @param {Vec3} from A vector defining where to find cos(angle) from
   * @returns cos(angle)
   */
  directionCosine(from) {
    return this.dot(from) / (this.magnitude() * from.magnitude());
  }

  /**
   * Uses cross product to find sin(angle) between this vector and the input vector
   * @param {Vec3} from A vector defining where to find sin(angle) from
   * @returns sin(angle)
   */
  directionSine(from) {
    // credit: https://www.cuemath.com/geometry/angle-between-vectors/
    return this.cross(from).magnitude() / (this.magnitude() * from.magnitude());
  }

  /**
   * Modifies the magnitude of this vector to the input value
   * @param {number} magnitude Target magnitude
   * @returns 
   */
  setMagnitude(magnitude) {
    this.normalize();
    this.x *= magnitude;
    this.y *= magnitude;
    this.z *= magnitude;
    return this;
  }

  /**
   * Modifies the magnitude of this vector to 1
   * @returns 
   */
  normalize() {
    let m = this.magnitude();
    this.x /= m;
    this.y /= m;
    this.z /= m;
    return this;
  }

  /**
   * Rotates the vector from the origin reference frame with unit vectors x, y, z. Input values are expected to be in radians.
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