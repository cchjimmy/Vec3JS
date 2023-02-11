import Vec3 from './Vec3.js';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const fpsDiv = document.createElement('div');
const entities = [];
const numberOfEntities = 500;
const placeholder = new Vec3;
var last = performance.now();
var dt = 0;
const normals = {
  top: new Vec3(0, -1),
  left: new Vec3(1, 0),
  right: new Vec3(-1, 0),
  bottom: new Vec3(0, 1)
}
const colors = {
  black: new Vec3,
  white: new Vec3(255, 255, 255),
  blue: new Vec3(0, 0, 255),
  red: new Vec3(255)
}

init();
update();

function init() {
  canvas.width = 400;
  canvas.height = 400;
  
  canvas.style.width = '600px';
  canvas.style.height = '600px';
  
  document.body.appendChild(canvas);
  document.body.appendChild(fpsDiv);
  
  for (let i = 0; i < numberOfEntities; i++) {
    entities.push({
      pos: new Vec3(canvas.width * 0.5, canvas.height * 0.5),
      vel: new Vec3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100),
    });
  }
  
  let a = new Vec3(3, 4, 0);
  console.log(a, a.magnitude())
}

function update() {
  for (let i = 0; i < entities.length; i++) {
    let p = entities[i].pos;
    let v = entities[i].vel;
  
    p.add(placeholder.copy(v).multiply(dt));
  
    if (p.x > canvas.width) {
      reflect(v, normals.right);
      p.x = canvas.width;
    }
    if (p.x < 0) {
      reflect(v, normals.left);
      p.x = 0;
    }
    if (p.y > canvas.height) {
      reflect(v, normals.top);
      p.y = canvas.height;
    }
    if (p.y < 0) {
      reflect(v, normals.bottom);
      p.y = 0;
    }
  }
  
  // draws background
  ctx.fillStyle = color(colors.black);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // draws position vectors
  ctx.strokeStyle = color(colors.white);
  for (let i = 0; i < entities.length; i++) {
    let p = entities[i].pos;
  
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }
  
  // draws circles
  ctx.fillStyle = color(colors.blue);
  for (let i = 0; i < entities.length; i++) {
    let p = entities[i].pos;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // draws velocity vectors
  ctx.strokeStyle = color(colors.red);
  for (let i = 0; i < entities.length; i++) {
    let p = entities[i].pos;
    let v = entities[i].vel;
    
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + v.x, p.y + v.y);
    ctx.stroke();
  }
  
  let now = performance.now();
  dt = (now - last) * 0.001;
  last = now;
  
  fpsDiv.innerText = (1 / dt).toFixed(0);
  
  requestAnimationFrame(update);
}

// credit: https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
function reflect(vec3, normal) {
  placeholder.copy(normal);
  vec3.subtract(placeholder.multiply(2 * vec3.dot(placeholder)));
}

function color(vec3) {
  return `rgb(${vec3.x}, ${vec3.y}, ${vec3.z})`;
}