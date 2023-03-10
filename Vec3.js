export default class Vec3 {
  /**
   * 
   * @param {number} x Magnitude in x.
   * @param {number} y Magnitude in y.
   * @param {number} z Magnitude in z.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Adds the input vector to this vector.
   * @param {Vec3} vec3 The other addend.
   * @returns {Vec3} This vector.
   */
  add(vec3) {
    this.x += vec3.x;
    this.y += vec3.y;
    this.z += vec3.z;
    return this;
  }

  /**
   * Subtracts input vector from this vector.
   * @param {Vec3} vec3 The subtrahend.
   * @returns {Vec3} this vector.
   */
  subtract(vec3) {
    this.x -= vec3.x;
    this.y -= vec3.y;
    this.z -= vec3.z;
    return this;
  }

  /**
   * Dot product between this vector and the input vector
   * @param {Vec3} vec3 This is the b vector in a ⋅ b.
   * @returns {number} The product scalar.
   */
  dot(vec3) {
    return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
  }

  /**
   * Cross product between this vector and the input vector.
   * @param {Vec3} vec3 This is the b vector in a x b.
   * @returns {Vec3} The product vector.
   */
  cross(vec3) {
    return new Vec3(this.y * vec3.z - this.z * vec3.y, -1 * (this.x * vec3.z - this.z * vec3.x), this.x * vec3.y - this.y * vec3.x);
  }

  /**
   * Multiplies each term in this vector with the input value.
   * @param {number} scalar The multiplicand.
   * @returns {Vec3} This vector.
   */
  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  /**
   * Sets the values in this vector to the values of the input vector.
   * @param {Vec3} vec3 Source vector to copy from
   * @returns {Vec3} This vector.
   */
  copy(vec3) {
    this.x = vec3.x;
    this.y = vec3.y;
    this.z = vec3.z;
    return this;
  }

  /**
   * Calculates the magnitude of this vector.
   * @returns {number} The magnitude.
   */
  magnitude() {
    return this.dot(this) ** 0.5;
  }

  /**
   * Reflects this vector using the input vector.
   * @param {Vec3} normal Surface normal, magnitude must be 1.
   * @returns {Vec3} This vector.
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
   * Uses dot product to find cosine of the angle between this vector and the input vector.
   * @param {Vec3} from A vector defining where to find the angle from.
   * @returns {number} Cosine of the angle.
   */
  cosine(from) {
    return this.dot(from) / (this.magnitude() * from.magnitude());
  }

  /**
   * Uses cross product to find sin of the angle between this vector and the input vector.
   * @param {Vec3} from A vector defining where to find the angle from.
   * @returns {number} Sine of the angle.
   */
  sine(from) {
    // credit: https://www.cuemath.com/geometry/angle-between-vectors/
    return this.cross(from).magnitude() / (this.magnitude() * from.magnitude());
  }

  /**
   * Modifies the magnitude of this vector to match the input value.
   * @param {number} magnitude Target magnitude.
   * @returns {Vec3} This vector.
   */
  setMagnitude(magnitude) {
    this.normalize();
    return this.multiply(magnitude);
  }

  /**
   * Modifies the magnitude of this vector to 1.
   * @returns {Vec3} This vector.
   */
  normalize() {
    let m = this.magnitude();
    this.x /= m;
    this.y /= m;
    this.z /= m;
    return this;
  }

  /**
   * Rotates this vector relative to its current orientation. Input values are expected to be in radians.
   * @param {number} rx amount of rotation about x axis.
   * @param {number} ry amount of rotation about y axis.
   * @param {number} rz amount of rotation about z axis.
   * @return {Vec3} This vector.
   */
  rotate(rx = 0, ry = 0, rz = 0) {
    // credit: https://en.wikipedia.org/wiki/Rotation_matrix#General_rotations
    let _x = this.x;
    let _y = this.y;
    let _z = this.z;
    let cx = Math.cos(rx);
    let cy = Math.cos(ry);
    let cz = Math.cos(rz);
    let sx = Math.sin(rx);
    let sy = Math.sin(ry);
    let sz = Math.sin(rz);

    this.x = _x * cy * cz + _y * (sx * sy * cz - cx * sz) + _z * (cx * sy * cz + sx * sz);
    this.y = _x * cy * sz + _y * (sx * sy * sz + cx * cz) + _z * (cx * sy * sz - sx * cz);
    this.z = _x * -sy + _y * sx * cy + _z * cx * cy;
    return this;
  }
}