import Vec3 from './Vec3.js';

(function () {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fpsDiv = document.createElement('div');
  const entities = [];
  const numberOfEntities = 1000;
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
        angularSpeed: (Math.random() - 0.5) * 0.1
      });
    }

    let a = new Vec3(1, 0, 0);
    let b = new Vec3(0, 1, 0);

    console.log(a.directionCosine(b), a.directionSine(b));

    update();
  }

  function update() {
    for (let i = 0; i < entities.length; i++) {
      let p = entities[i].pos;
      let v = entities[i].vel;

      v.rotate(0, 0, entities[i].angularSpeed);
      p.add(placeholder.copy(v).multiply(dt));

      if (p.x > canvas.width) {
        v.reflect(normals.right);
        p.x = canvas.width;
      }
      if (p.x < 0) {
        v.reflect(normals.left);
        p.x = 0;
      }
      if (p.y > canvas.height) {
        v.reflect(normals.top);
        p.y = canvas.height;
      }
      if (p.y < 0) {
        v.reflect(normals.bottom);
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

    // draws entities
    ctx.fillStyle = color(colors.blue);
    for (let i = 0; i < entities.length; i++) {
      let p = entities[i].pos;

      ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
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

  function color(vec3) {
    return `rgb(${vec3.x}, ${vec3.y}, ${vec3.z})`;
  }
})();